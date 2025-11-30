<?php
require_once __DIR__ . '/includes/bootstrap.php';

$productId = (string)($_GET['id'] ?? '');
$product = $productId ? findProduct($productId) : null;
if (!$product) {
    http_response_code(404);
    echo 'Ürün bulunamadı.';
    exit;
}

$message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['product_id'])) {
    $qty = isset($_POST['quantity']) ? max(1, (int)$_POST['quantity']) : 1;
    addToCart($productId, $qty);
    $message = 'Ürün sepetinize eklendi.';
}
?>
<?php include __DIR__ . '/includes/header.php'; ?>
<section class="section">
    <div class="container product-detail">
        <div class="gallery">
            <?php foreach ($product['images'] as $image): ?>
                <img src="<?php echo '/public' . $image; ?>" alt="<?php echo htmlspecialchars($product['name']); ?>">
            <?php endforeach; ?>
        </div>
        <div class="product-copy">
            <p class="eyebrow">Özel Seçim</p>
            <h1><?php echo htmlspecialchars($product['name']); ?></h1>
            <p class="lede"><?php echo htmlspecialchars($product['description']); ?></p>
            <p class="price large"><?php echo number_format($product['price'], 2); ?> TL</p>

            <?php if ($message): ?>
                <div class="notification"><?php echo htmlspecialchars($message); ?></div>
            <?php endif; ?>

            <form method="post" class="add-to-cart">
                <input type="hidden" name="product_id" value="<?php echo htmlspecialchars($product['id']); ?>">
                <label>Adet
                    <input type="number" name="quantity" value="1" min="1">
                </label>
                <button type="submit" class="button">Sepete Ekle</button>
            </form>

            <ul class="list">
                <li>🧈 Gerçek tereyağı ve taze ceviz</li>
                <li>📦 Özel korumalı paketleme</li>
                <li>🚚 Türkiye geneli hızlı kargo</li>
            </ul>
        </div>
    </div>
</section>
<?php include __DIR__ . '/includes/footer.php'; ?>
