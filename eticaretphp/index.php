<?php
session_start();

define('DATA_DIR', __DIR__ . '/data');
define('UPLOAD_DIR', __DIR__ . '/uploads');

define('LABELS_FILE', DATA_DIR . '/labels.json');
define('CONFIG_FILE', DATA_DIR . '/config.json');

function load_labels(): array {
    if (!file_exists(LABELS_FILE)) {
        return [];
    }
    $data = json_decode(file_get_contents(LABELS_FILE), true);
    return is_array($data) ? $data : [];
}

function save_labels(array $labels): void {
    file_put_contents(LABELS_FILE, json_encode(array_values($labels), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
}

function load_config(): array {
    if (!file_exists(CONFIG_FILE)) {
        return [
            'show_local' => false,
            'image_path' => null,
        ];
    }
    $data = json_decode(file_get_contents(CONFIG_FILE), true);
    if (!is_array($data)) {
        $data = [];
    }
    return array_merge([
        'show_local' => false,
        'image_path' => null,
    ], $data);
}

function save_config(array $config): void {
    file_put_contents(CONFIG_FILE, json_encode($config, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
}

function normalize_price(string $price): string {
    $clean = str_replace([',', '₺', 'TL'], ['', '', ''], $price);
    $clean = trim($clean);
    if ($clean === '' || !is_numeric($clean)) {
        return trim($price);
    }
    return number_format((float) $clean, 2, ',', '.');
}

function parse_csv(string $path): array {
    $handle = fopen($path, 'r');
    if ($handle === false) {
        return [];
    }
    $rows = [];
    while (($data = fgetcsv($handle, 0, ',')) !== false) {
        $rows[] = $data;
    }
    fclose($handle);
    return $rows;
}

function column_index(string $cellRef): int {
    $letters = preg_replace('/[^A-Z]/', '', strtoupper($cellRef));
    $index = 0;
    for ($i = 0; $i < strlen($letters); $i++) {
        $index = $index * 26 + (ord($letters[$i]) - 64);
    }
    return $index - 1;
}

function parse_xlsx(string $path): array {
    $zip = new ZipArchive();
    if ($zip->open($path) !== true) {
        return [];
    }
    $sharedStrings = [];
    $sharedXml = $zip->getFromName('xl/sharedStrings.xml');
    if ($sharedXml !== false) {
        $sharedDoc = new SimpleXMLElement($sharedXml);
        foreach ($sharedDoc->si as $entry) {
            $text = '';
            foreach ($entry->t as $t) {
                $text .= (string) $t;
            }
            $sharedStrings[] = $text;
        }
    }

    $sheetXml = $zip->getFromName('xl/worksheets/sheet1.xml');
    if ($sheetXml === false) {
        $zip->close();
        return [];
    }
    $sheetDoc = new SimpleXMLElement($sheetXml);
    $rows = [];
    foreach ($sheetDoc->sheetData->row as $row) {
        $rowValues = [];
        foreach ($row->c as $cell) {
            $cellRef = (string) $cell['r'];
            $index = column_index($cellRef);
            $value = '';
            if (isset($cell->v)) {
                $value = (string) $cell->v;
                if ((string) $cell['t'] === 's') {
                    $value = $sharedStrings[(int) $value] ?? '';
                }
            }
            $rowValues[$index] = $value;
        }
        if ($rowValues) {
            ksort($rowValues);
            $rows[] = array_values($rowValues);
        }
    }
    $zip->close();
    return $rows;
}

function rows_to_labels(array $rows): array {
    $labels = [];
    foreach ($rows as $i => $row) {
        $barcode = trim((string) ($row[0] ?? ''));
        $name = trim((string) ($row[1] ?? ''));
        $price = trim((string) ($row[2] ?? ''));

        if ($i === 0) {
            $header = mb_strtolower($barcode . ' ' . $name . ' ' . $price);
            if (str_contains($header, 'barkod') || str_contains($header, 'ürün') || str_contains($header, 'urun')) {
                continue;
            }
        }

        if ($barcode === '' && $name === '' && $price === '') {
            continue;
        }
        $labels[] = [
            'barcode' => $barcode,
            'name' => $name,
            'price' => normalize_price($price),
        ];
    }
    return $labels;
}

$labels = load_labels();
$config = load_config();
$alert = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    if ($action === 'add_label') {
        $barcode = trim($_POST['barcode'] ?? '');
        $name = trim($_POST['name'] ?? '');
        $price = trim($_POST['price'] ?? '');

        if ($barcode !== '' || $name !== '' || $price !== '') {
            $labels[] = [
                'barcode' => $barcode,
                'name' => $name,
                'price' => normalize_price($price),
            ];
            save_labels($labels);
            $alert = 'Etiket eklendi.';
        }
    }

    if ($action === 'upload_excel' && isset($_FILES['excel_file']) && $_FILES['excel_file']['error'] === UPLOAD_ERR_OK) {
        $tmpPath = $_FILES['excel_file']['tmp_name'];
        $extension = strtolower(pathinfo($_FILES['excel_file']['name'], PATHINFO_EXTENSION));

        if ($extension === 'csv') {
            $rows = parse_csv($tmpPath);
        } else {
            $rows = parse_xlsx($tmpPath);
        }
        $newLabels = rows_to_labels($rows);
        if ($newLabels) {
            $labels = array_merge($labels, $newLabels);
            save_labels($labels);
            $alert = count($newLabels) . ' adet etiket yüklendi.';
        } else {
            $alert = 'Excel/CSV içeriği okunamadı.';
        }
    }

    if ($action === 'clear_labels') {
        $labels = [];
        save_labels($labels);
        $alert = 'Tüm etiketler temizlendi.';
    }

    if ($action === 'save_config') {
        $config['show_local'] = isset($_POST['show_local']);
        if (isset($_FILES['local_image']) && $_FILES['local_image']['error'] === UPLOAD_ERR_OK) {
            $ext = strtolower(pathinfo($_FILES['local_image']['name'], PATHINFO_EXTENSION));
            $filename = 'yerli-uretim-' . time() . '.' . $ext;
            $target = UPLOAD_DIR . '/' . $filename;
            move_uploaded_file($_FILES['local_image']['tmp_name'], $target);
            $config['image_path'] = 'uploads/' . $filename;
        }
        save_config($config);
        $alert = 'Görsel ayarları güncellendi.';
    }
}

$previewLabel = $labels[0] ?? ['barcode' => '8699999999999', 'name' => 'Örnek Ürün', 'price' => '3,00'];
?>
<!doctype html>
<html lang="tr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Etiket Oluşturma</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background: #f5f5f7;
        }
        .label-preview {
            width: 9.7cm;
            height: 3.2cm;
            border: 2px solid #1b1b1b;
            border-radius: 6px;
            overflow: hidden;
            background: #fff;
            position: relative;
        }
        .label-header {
            background: #d71818;
            color: #fff;
            text-transform: uppercase;
            font-weight: 700;
            text-align: center;
            padding: 4px 6px;
            font-size: 0.95rem;
        }
        .label-price {
            font-size: 1.6rem;
            font-weight: 800;
            text-align: center;
            padding-top: 4px;
        }
        .label-footer {
            position: absolute;
            bottom: 6px;
            left: 10px;
            right: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.75rem;
        }
        .label-barcode {
            font-weight: 700;
            letter-spacing: 1px;
        }
        .local-badge {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            border: 2px solid #d71818;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.55rem;
            color: #d71818;
            text-align: center;
            font-weight: 700;
        }
        .local-image {
            width: 42px;
            height: 42px;
            object-fit: cover;
            border-radius: 50%;
            border: 2px solid #d71818;
        }
    </style>
</head>
<body>
<div class="container py-4">
    <div class="row g-4">
        <div class="col-lg-7">
            <div class="card shadow-sm mb-4">
                <div class="card-body">
                    <h1 class="h4 mb-3">Etiket Programı</h1>
                    <p class="text-muted">9,7cm x 3,2cm ölçülerinde etiket üretimi için barkod, ürün adı ve fiyat bilgilerini girin.</p>

                    <?php if ($alert): ?>
                        <div class="alert alert-info"><?= htmlspecialchars($alert) ?></div>
                    <?php endif; ?>

                    <form method="post" class="row g-3">
                        <input type="hidden" name="action" value="add_label">
                        <div class="col-md-4">
                            <label class="form-label">Ürün Barkod</label>
                            <input type="text" name="barcode" class="form-control" placeholder="869...">
                        </div>
                        <div class="col-md-5">
                            <label class="form-label">Ürün Adı</label>
                            <input type="text" name="name" class="form-control" placeholder="Coca Cola 1LT">
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">Fiyat</label>
                            <input type="text" name="price" class="form-control" placeholder="3,00">
                        </div>
                        <div class="col-12">
                            <button class="btn btn-primary" type="submit">Etiketi Ekle</button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="card shadow-sm mb-4">
                <div class="card-body">
                    <h2 class="h5">Excel / CSV ile Yükle</h2>
                    <p class="text-muted">Kolon sırası: Barkod, Ürün Adı, Fiyat (ilk satır başlık olabilir).</p>
                    <form method="post" enctype="multipart/form-data" class="row g-3">
                        <input type="hidden" name="action" value="upload_excel">
                        <div class="col-md-8">
                            <input type="file" name="excel_file" class="form-control" accept=".xlsx,.csv" required>
                        </div>
                        <div class="col-md-4">
                            <button class="btn btn-outline-primary w-100" type="submit">Yükle</button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="card shadow-sm">
                <div class="card-body">
                    <h2 class="h5">Yerli Ürün Görseli</h2>
                    <form method="post" enctype="multipart/form-data" class="row g-3">
                        <input type="hidden" name="action" value="save_config">
                        <div class="col-12">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="show_local" id="showLocal" <?= $config['show_local'] ? 'checked' : '' ?>>
                                <label class="form-check-label" for="showLocal">Etiketlerde yerli üretim görseli kullan</label>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <input type="file" name="local_image" class="form-control" accept="image/*">
                        </div>
                        <div class="col-md-4">
                            <button class="btn btn-outline-secondary w-100" type="submit">Kaydet</button>
                        </div>
                    </form>
                    <?php if ($config['image_path']): ?>
                        <div class="mt-3">
                            <img src="<?= htmlspecialchars($config['image_path']) ?>" alt="Yerli Üretim" class="img-thumbnail" style="max-width: 140px;">
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>

        <div class="col-lg-5">
            <div class="card shadow-sm mb-4">
                <div class="card-body">
                    <h2 class="h5">Ön İzleme</h2>
                    <div class="label-preview">
                        <div class="label-header"><?= htmlspecialchars($previewLabel['name']) ?></div>
                        <div class="label-price"><?= htmlspecialchars($previewLabel['price']) ?> ₺</div>
                        <div class="label-footer">
                            <?php if ($config['show_local']): ?>
                                <?php if ($config['image_path']): ?>
                                    <img src="<?= htmlspecialchars($config['image_path']) ?>" class="local-image" alt="Yerli Üretim">
                                <?php else: ?>
                                    <div class="local-badge">YERLİ<br>ÜRETİM</div>
                                <?php endif; ?>
                            <?php endif; ?>
                            <div class="label-barcode"><?= htmlspecialchars($previewLabel['barcode']) ?></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card shadow-sm mb-4">
                <div class="card-body">
                    <h2 class="h5">Yüklenen Etiketler (<?= count($labels) ?>)</h2>
                    <div class="table-responsive" style="max-height: 280px;">
                        <table class="table table-sm align-middle">
                            <thead>
                            <tr>
                                <th>Barkod</th>
                                <th>Ürün</th>
                                <th>Fiyat</th>
                            </tr>
                            </thead>
                            <tbody>
                            <?php foreach ($labels as $label): ?>
                                <tr>
                                    <td><?= htmlspecialchars($label['barcode']) ?></td>
                                    <td><?= htmlspecialchars($label['name']) ?></td>
                                    <td><?= htmlspecialchars($label['price']) ?> ₺</td>
                                </tr>
                            <?php endforeach; ?>
                            <?php if (!$labels): ?>
                                <tr><td colspan="3" class="text-muted">Henüz etiket yüklenmedi.</td></tr>
                            <?php endif; ?>
                            </tbody>
                        </table>
                    </div>

                    <div class="d-flex gap-2 mt-3">
                        <a href="generate_pdf.php" class="btn btn-success flex-grow-1">Etiket Oluştur (PDF)</a>
                        <form method="post">
                            <input type="hidden" name="action" value="clear_labels">
                            <button class="btn btn-outline-danger" type="submit">Temizle</button>
                        </form>
                    </div>
                </div>
            </div>

            <div class="alert alert-light border">
                <strong>Not:</strong> "Etiket Oluştur" butonu A4 sayfaya sığabildiği kadar etiketi (2x9) yerleştirir ve PDF olarak indirir.
            </div>
        </div>
    </div>
</div>
</body>
</html>
