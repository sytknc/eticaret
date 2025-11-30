<?php
require_once __DIR__ . '/../includes/auth.php';
require_login();
require_once __DIR__ . '/../config.php';
$message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['name'])) {
        $stmt = $pdo->prepare('INSERT INTO products (name, description, price, image_url) VALUES (?,?,?,?)');
        $stmt->execute([
            $_POST['name'],
            $_POST['description'],
            (float)$_POST['price'],
            $_POST['image_url'] ?: '/eticaretphp/assets/demo-product.jpg'
        ]);
        $message = 'Ürün eklendi';
    }
    if (!empty($_FILES['csv']['tmp_name'])) {
        $handle = fopen($_FILES['csv']['tmp_name'], 'r');
        if ($handle) {
            $pdo->beginTransaction();
            while (($row = fgetcsv($handle, 1000, ',')) !== false) {
                if (count($row) < 4) continue;
                [$name, $description, $price, $image] = $row;
                $stmt = $pdo->prepare('INSERT INTO products (name, description, price, image_url) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE description=VALUES(description), price=VALUES(price), image_url=VALUES(image_url)');
                $stmt->execute([$name, $description, (float)$price, $image]);
            }
            $pdo->commit();
            fclose($handle);
            $message = 'CSV içeriği aktarıldı';
        }
    }
}
$products = $pdo->query('SELECT * FROM products ORDER BY created_at DESC')->fetchAll();
?>
<!doctype html>
<html lang="tr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Ürün Yönetimi</title>
    <link rel="stylesheet" href="/eticaretphp/assets/css/style.css">
</head>
<body class="container" style="padding:2rem 0;">
<nav class="admin-nav">
    <a href="/eticaretphp/admin/dashboard.php">Genel Bakış</a>
    <a href="/eticaretphp/admin/products.php">Ürünler</a>
    <a href="/eticaretphp/admin/settings.php">Site Ayarları</a>
    <a href="/eticaretphp/admin/logout.php">Çıkış</a>
</nav>
<h1>Ürünler</h1>
<?php if ($message): ?><div class="alert"><?php echo htmlspecialchars($message); ?></div><?php endif; ?>
<section class="card">
    <h2>Yeni Ürün</h2>
    <form method="post">
        <input name="name" placeholder="Ürün adı" required>
        <textarea name="description" placeholder="Açıklama" required></textarea>
        <input type="number" step="0.01" name="price" placeholder="Fiyat" required>
        <input name="image_url" placeholder="Görsel URL (opsiyonel)">
        <button class="button" type="submit">Kaydet</button>
    </form>
</section>
<section class="card" style="margin-top:1rem;">
    <h2>CSV ile toplu yükleme</h2>
    <form method="post" enctype="multipart/form-data">
        <input type="file" name="csv" accept=".csv" required>
        <p>Kolon sırası: ad, açıklama, fiyat, görsel_url. UTF-8 CSV kullanın.</p>
        <button class="button" type="submit">Aktar</button>
    </form>
</section>
<table>
    <thead><tr><th>Ad</th><th>Fiyat</th><th>Oluşturma</th></tr></thead>
    <tbody>
        <?php foreach ($products as $item): ?>
            <tr>
                <td><?php echo htmlspecialchars($item['name']); ?></td>
                <td><?php echo number_format($item['price'], 2); ?> TL</td>
                <td><?php echo htmlspecialchars($item['created_at']); ?></td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>
</body>
</html>
