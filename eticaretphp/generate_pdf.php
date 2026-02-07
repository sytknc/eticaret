<?php
require __DIR__ . '/lib/fpdf.php';

define('DATA_DIR', __DIR__ . '/data');
define('LABELS_FILE', DATA_DIR . '/labels.json');
define('CONFIG_FILE', DATA_DIR . '/config.json');

function load_labels(): array {
    if (!file_exists(LABELS_FILE)) {
        return [];
    }
    $data = json_decode(file_get_contents(LABELS_FILE), true);
    return is_array($data) ? $data : [];
}

function load_config(): array {
    if (!file_exists(CONFIG_FILE)) {
        return ['show_local' => false, 'image_path' => null];
    }
    $data = json_decode(file_get_contents(CONFIG_FILE), true);
    return is_array($data) ? $data : ['show_local' => false, 'image_path' => null];
}

function pdf_text(string $text): string {
    return iconv('UTF-8', 'ISO-8859-9//TRANSLIT', $text);
}

function resolve_image_path(?string $imagePath): ?string {
    if ($imagePath === null || $imagePath === '') {
        return null;
    }

    $isAbsolute = $imagePath[0] === '/' || preg_match('/^[A-Za-z]:\\\\/', $imagePath) === 1;
    $path = $isAbsolute ? $imagePath : __DIR__ . '/' . ltrim($imagePath, '/');

    return file_exists($path) ? $path : null;
}

function prepare_pdf_image(string $path): ?array {
    $extension = strtolower(pathinfo($path, PATHINFO_EXTENSION));
    if ($extension !== 'webp') {
        return [$path, null];
    }

    if (!function_exists('imagecreatefromwebp')) {
        return null;
    }

    $image = imagecreatefromwebp($path);
    if ($image === false) {
        return null;
    }

    $width = imagesx($image);
    $height = imagesy($image);
    $canvas = imagecreatetruecolor($width, $height);
    if ($canvas === false) {
        imagedestroy($image);
        return null;
    }
    $white = imagecolorallocate($canvas, 255, 255, 255);
    imagefilledrectangle($canvas, 0, 0, $width, $height, $white);
    imagecopy($canvas, $image, 0, 0, 0, 0, $width, $height);

    $tempFile = tempnam(sys_get_temp_dir(), 'fpdf_');
    if ($tempFile === false) {
        imagedestroy($canvas);
        imagedestroy($image);
        return null;
    }

    $pngFile = $tempFile . '.png';
    rename($tempFile, $pngFile);
    imagepng($canvas, $pngFile);
    imagedestroy($canvas);
    imagedestroy($image);

    return [$pngFile, $pngFile];
}

$labels = load_labels();
$config = load_config();

if (!$labels) {
    header('Location: index.php');
    exit;
}

$pdf = new FPDF('P', 'mm', 'A4');
$pdf->SetAutoPageBreak(false);

$labelWidth = 97.0;
$labelHeight = 32.0;
$cols = 2;
$rows = 9;
$perPage = $cols * $rows;
$marginX = (210 - ($cols * $labelWidth)) / 2;
$marginY = (297 - ($rows * $labelHeight)) / 2;

foreach ($labels as $index => $label) {
    $pos = $index % $perPage;
    if ($pos === 0) {
        $pdf->AddPage();
    }

    $row = intdiv($pos, $cols);
    $col = $pos % $cols;
    $x = $marginX + ($col * $labelWidth);
    $y = $marginY + ($row * $labelHeight);

    $pdf->SetDrawColor(20, 20, 20);
    $pdf->Rect($x, $y, $labelWidth, $labelHeight);

    $pdf->SetFillColor(215, 24, 24);
    $pdf->Rect($x, $y, $labelWidth, 8, 'F');

    $pdf->SetFont('Helvetica', 'B', 12);
    $pdf->SetTextColor(255, 255, 255);
    $pdf->SetXY($x, $y + 1.2);
    $pdf->Cell($labelWidth, 6, pdf_text(mb_strtoupper($label['name'] ?? '', 'UTF-8')), 0, 0, 'C');

    $pdf->SetTextColor(0, 0, 0);
    $pdf->SetFont('Helvetica', 'B', 18);
    $pdf->SetXY($x, $y + 10.5);
    $price = trim($label['price'] ?? '');
    $priceText = $price !== '' ? $price . ' TL' : 'TL';
    $pdf->Cell($labelWidth, 8, pdf_text($priceText), 0, 0, 'C');

    $pdf->SetFont('Helvetica', '', 8);
    $pdf->SetXY($x + 10, $y + 24);

    if (!empty($config['show_local'])) {
        $imagePath = resolve_image_path($config['image_path'] ?? null);
        $preparedImage = $imagePath ? prepare_pdf_image($imagePath) : null;
        if ($preparedImage) {
            [$resolvedPath, $tempPath] = $preparedImage;
            $pdf->Image($resolvedPath, $x + 6, $y + 22, 10, 10);
            if ($tempPath) {
                unlink($tempPath);
            }
        } else {
            $pdf->SetDrawColor(215, 24, 24);
            $pdf->SetTextColor(215, 24, 24);
            $pdf->Rect($x + 6, $y + 22, 10, 10);
            $pdf->SetXY($x + 6, $y + 25.5);
            $pdf->Cell(10, 3, pdf_text('YERLI'), 0, 2, 'C');
            $pdf->Cell(10, 3, pdf_text('URETIM'), 0, 0, 'C');
            $pdf->SetTextColor(0, 0, 0);
        }
    }

    $pdf->SetFont('Helvetica', 'B', 8);
    $pdf->SetXY($x + 22, $y + 25);
    $pdf->Cell($labelWidth - 28, 4, pdf_text($label['barcode'] ?? ''), 0, 0, 'R');
}

$pdf->Output('etiketler.pdf', 'I');
