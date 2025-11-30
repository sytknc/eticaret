<?php
require_once __DIR__ . '/includes/bootstrap.php';

$message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['product_id'])) {
    $productId = (string)($_POST['product_id'] ?? '');
    $qty = isset($_POST['quantity']) ? max(1, (int)$_POST['quantity']) : 1;
    if (findProduct($productId)) {
        addToCart($productId, $qty);
        $message = 'Ürün sepetinize eklendi.';
    }
}

$query = trim((string)($_GET['q'] ?? ''));
$filtered = array_filter($products, function ($product) use ($query) {
    if ($query === '') {
        return true;
    }
    $haystack = mb_strtolower($product['name'] . ' ' . $product['description']);
    return str_contains($haystack, mb_strtolower($query));
});
?>
<?php include __DIR__ . '/includes/header.php'; ?>
<section class="section">
    <div class="container section-header">
        <div>
            <p class="eyebrow">Tatlı & Börek</p>
            <h1>Menümüz</h1>
        </div>
        <form class="search" method="get" action="/eticaretphp/products.php">
            <input type="text" name="q" placeholder="Ürün ara" value="<?php echo htmlspecialchars($query); ?>">
            <button type="submit">Ara</button>
        </form>
    </div>

    <?php if ($message): ?>
        <div class="notification"><?php echo htmlspecialchars($message); ?></div>
    <?php endif; ?>

    <div class="container grid">
        <?php foreach ($filtered as $product): ?>
            <article class="card">
                <div class="card-media">
                    <img src="<?php echo '/public' . $product['image']; ?>" alt="<?php echo htmlspecialchars($product['name']); ?>">
                    <a class="pill" href="/eticaretphp/product.php?id=<?php echo urlencode($product['id']); ?>">Detay</a>
                </div>
                <div class="card-body">
                    <h3><?php echo htmlspecialchars($product['name']); ?></h3>
                    <p><?php echo htmlspecialchars($product['description']); ?></p>
                    <div class="card-footer">
                        <span class="price"><?php echo number_format($product['price'], 2); ?> TL</span>
                        <form method="post" action="/eticaretphp/products.php?q=<?php echo urlencode($query); ?>">
                            <input type="hidden" name="product_id" value="<?php echo htmlspecialchars($product['id']); ?>">
                            <button type="submit" class="button small">Sepete Ekle</button>
                        </form>
                    </div>
                </div>
            </article>
        <?php endforeach; ?>
    </div>
</section>
<?php include __DIR__ . '/includes/footer.php'; ?>
