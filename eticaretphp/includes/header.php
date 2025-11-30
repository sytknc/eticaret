<?php
require_once __DIR__ . '/bootstrap.php';
?>
<!doctype html>
<html lang="tr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo htmlspecialchars($settings['site_name']); ?></title>
    <link rel="stylesheet" href="/eticaretphp/assets/css/style.css">
    <style>
        :root {
            --primary: <?php echo htmlspecialchars($settings['primary_color']); ?>;
            --secondary: <?php echo htmlspecialchars($settings['secondary_color']); ?>;
        }
    </style>
</head>
<body>
<header class="site-header">
    <div class="container header-inner">
        <a class="brand" href="/eticaretphp/index.php">
            <span class="brand-mark">🍰</span>
            <div>
                <strong><?php echo htmlspecialchars($settings['site_name']); ?></strong>
                <small><?php echo htmlspecialchars($settings['subheadline']); ?></small>
            </div>
        </a>
        <nav class="main-nav">
            <a href="/eticaretphp/index.php">Ana Sayfa</a>
            <a href="/eticaretphp/products.php">Ürünler</a>
            <a href="/eticaretphp/cart.php">Sepet (<?php echo cartCount(); ?>)</a>
        </nav>
        <div class="contact">
            <?php if (!empty($settings['phone'])): ?>
                <span>📞 <?php echo htmlspecialchars($settings['phone']); ?></span>
            <?php endif; ?>
            <?php if (!empty($settings['email'])): ?>
                <span>✉️ <?php echo htmlspecialchars($settings['email']); ?></span>
            <?php endif; ?>
        </div>
    </div>
</header>
<main class="page">
