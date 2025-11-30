<?php
require_once __DIR__ . '/../includes/auth.php';
require_login();
require_once __DIR__ . '/../config.php';
?>
<!doctype html>
<html lang="tr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Yönetim Paneli</title>
    <link rel="stylesheet" href="/eticaretphp/assets/css/style.css">
</head>
<body class="container" style="padding:2rem 0;">
    <nav class="admin-nav">
        <a href="/eticaretphp/admin/dashboard.php">Genel Bakış</a>
        <a href="/eticaretphp/admin/products.php">Ürünler</a>
        <a href="/eticaretphp/admin/settings.php">Site Ayarları</a>
        <a href="/eticaretphp/admin/logout.php">Çıkış</a>
    </nav>
    <h1>Merhaba, <?php echo htmlspecialchars($_SESSION['admin']); ?>!</h1>
    <p>Sol menüden ürün, renk, logo, iletişim ve site içeriğini yönetebilirsiniz. CSV (Excel) formatında toplu ürün yükleme desteklenir.</p>
</body>
</html>
