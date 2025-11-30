<?php
require_once __DIR__ . '/includes/bootstrap.php';

$message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    $productId = (string)($_POST['product_id'] ?? '');
    $qty = isset($_POST['quantity']) ? (int)$_POST['quantity'] : 1;

    if ($action === 'update') {
        updateCart($productId, max(0, $qty));
        $message = 'Sepet güncellendi.';
    } elseif ($action === 'remove') {
        clearCartItem($productId);
        $message = 'Ürün sepetten çıkarıldı.';
    }
}

$cartItems = [];
$total = 0;
foreach (getCart() as $item) {
    $product = findProduct($item['product_id']);
    if ($product) {
        $lineTotal = $product['price'] * $item['quantity'];
        $cartItems[] = [
            'product' => $product,
            'quantity' => $item['quantity'],
            'line_total' => $lineTotal,
        ];
        $total += $lineTotal;
    }
}
?>
<?php include __DIR__ . '/includes/header.php'; ?>
<section class="section">
    <div class="container section-header">
        <div>
            <p class="eyebrow">Sipariş Özeti</p>
            <h1>Sepetiniz</h1>
        </div>
        <a class="link" href="/eticaretphp/products.php">Alışverişe devam et</a>
    </div>

    <?php if ($message): ?>
        <div class="notification"><?php echo htmlspecialchars($message); ?></div>
    <?php endif; ?>

    <?php if (empty($cartItems)): ?>
        <p class="empty">Sepetiniz boş.</p>
    <?php else: ?>
        <div class="cart-grid">
            <div class="cart-items">
                <?php foreach ($cartItems as $entry): $product = $entry['product']; ?>
                    <article class="cart-item">
                        <img src="<?php echo '/public' . $product['image']; ?>" alt="<?php echo htmlspecialchars($product['name']); ?>">
                        <div>
                            <h3><?php echo htmlspecialchars($product['name']); ?></h3>
                            <p class="price"><?php echo number_format($product['price'], 2); ?> TL</p>
                            <form method="post" class="inline-form">
                                <input type="hidden" name="product_id" value="<?php echo htmlspecialchars($product['id']); ?>">
                                <input type="hidden" name="action" value="update">
                                <label>Adet
                                    <input type="number" name="quantity" min="1" value="<?php echo $entry['quantity']; ?>">
                                </label>
                                <button class="button small" type="submit">Güncelle</button>
                            </form>
                            <form method="post" class="inline-form">
                                <input type="hidden" name="product_id" value="<?php echo htmlspecialchars($product['id']); ?>">
                                <input type="hidden" name="action" value="remove">
                                <button class="button ghost small" type="submit">Kaldır</button>
                            </form>
                        </div>
                        <div class="line-total"><?php echo number_format($entry['line_total'], 2); ?> TL</div>
                    </article>
                <?php endforeach; ?>
            </div>
            <aside class="summary">
                <h2>Ödeme Özeti</h2>
                <p>Toplam: <strong><?php echo number_format($total, 2); ?> TL</strong></p>
                <p>Not: Ödeme ve teslimat bilgilerini admin panelinden ekleyebilirsiniz.</p>
                <button class="button full">Siparişi Tamamla</button>
            </aside>
        </div>
    <?php endif; ?>
</section>
<?php include __DIR__ . '/includes/footer.php'; ?>
