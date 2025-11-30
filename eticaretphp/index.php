<?php include __DIR__ . '/includes/header.php'; ?>
<section class="hero">
    <div class="card">
        <h1><?php echo htmlspecialchars($settings['site_name']); ?></h1>
        <p>Hoş geldiniz! Demo ürünlerimizi inceleyin veya admin panelinden güncelleyin.</p>
        <a class="button" href="/eticaretphp/admin/login.php">Yönetim Paneli</a>
    </div>
</section>
<section class="products">
<?php
$stmt = $pdo->query('SELECT * FROM products ORDER BY created_at DESC LIMIT 12');
foreach ($stmt as $product): ?>
    <article class="card">
        <img src="<?php echo htmlspecialchars($product['image_url']); ?>" alt="<?php echo htmlspecialchars($product['name']); ?>">
        <h3><?php echo htmlspecialchars($product['name']); ?></h3>
        <p><?php echo htmlspecialchars($product['description']); ?></p>
        <p><strong><?php echo number_format($product['price'], 2); ?> TL</strong></p>
    </article>
<?php endforeach; ?>
</section>
<?php include __DIR__ . '/includes/footer.php'; ?>
