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

$featured = featuredProducts(6);
?>
<?php include __DIR__ . '/includes/header.php'; ?>
<section class="hero">
    <div class="container hero-inner">
        <div>
            <p class="eyebrow">Geleneksel Tatlı & Börek</p>
            <h1><?php echo htmlspecialchars($settings['headline']); ?></h1>
            <p class="lede"><?php echo htmlspecialchars($settings['subheadline']); ?></p>
            <div class="actions">
                <a class="button" href="/eticaretphp/products.php">Ürünleri Keşfet</a>
                <a class="button ghost" href="/eticaretphp/cart.php">Sepeti Görüntüle</a>
            </div>
            <div class="trust">
                <span>⚡ Aynı Gün Kargo</span>
                <span>🍃 Doğal Malzeme</span>
                <span>⭐ 4.9 Müşteri Memnuniyeti</span>
            </div>
        </div>
        <div class="hero-card">
            <p>En Çok Satanlar</p>
            <ul>
                <?php foreach (array_slice($featured, 0, 3) as $item): ?>
                    <li>
                        <img src="<?php echo '/public' . $item['image']; ?>" alt="<?php echo htmlspecialchars($item['name']); ?>">
                        <div>
                            <strong><?php echo htmlspecialchars($item['name']); ?></strong>
                            <small><?php echo number_format($item['price'], 2); ?> TL</small>
                        </div>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
    </div>
</section>

<?php if ($message): ?>
<div class="notification"><?php echo htmlspecialchars($message); ?></div>
<?php endif; ?>

<section class="section">
    <div class="container section-header">
        <div>
            <p class="eyebrow">Popüler Ürünler</p>
            <h2>Her dilimde mutlu müşteriler</h2>
        </div>
        <a class="link" href="/eticaretphp/products.php">Tüm ürünler</a>
    </div>
    <div class="container grid">
        <?php foreach ($featured as $product): ?>
            <article class="card">
                <div class="card-media">
                    <img src="<?php echo '/public' . $product['image']; ?>" alt="<?php echo htmlspecialchars($product['name']); ?>">
                    <a class="pill" href="/eticaretphp/product.php?id=<?php echo urlencode($product['id']); ?>">Detaya Git</a>
                </div>
                <div class="card-body">
                    <h3><?php echo htmlspecialchars($product['name']); ?></h3>
                    <p><?php echo htmlspecialchars($product['description']); ?></p>
                    <div class="card-footer">
                        <span class="price"><?php echo number_format($product['price'], 2); ?> TL</span>
                        <form method="post" action="/eticaretphp/index.php">
                            <input type="hidden" name="product_id" value="<?php echo htmlspecialchars($product['id']); ?>">
                            <button type="submit" class="button small">Sepete Ekle</button>
                        </form>
                    </div>
                </div>
            </article>
        <?php endforeach; ?>
    </div>
</section>

<section class="section highlight">
    <div class="container feature-grid">
        <div>
            <p class="eyebrow">Neden Biz?</p>
            <h2>Şef onaylı reçeteler, şehir efsanesi lezzet.</h2>
            <p>Klasik antep baklavasından su böreğine kadar tüm ürünlerimizi ustalarımız geleneksel yöntemlerle hazırlıyor.</p>
            <ul class="list">
                <li>🍯 Taş fırında günlük üretim</li>
                <li>🚚 İstanbul içi aynı gün teslimat</li>
                <li>🎁 Şık hediye paketleri</li>
            </ul>
        </div>
        <div class="stat-card">
            <div>
                <strong>12K+</strong>
                <span>Mutlu müşteri</span>
            </div>
            <div>
                <strong>25</strong>
                <span>Yıllık tecrübe</span>
            </div>
            <div>
                <strong>4.9</strong>
                <span>Ortalama puan</span>
            </div>
        </div>
    </div>
</section>

<section class="section">
    <div class="container section-header">
        <div>
            <p class="eyebrow">İlham</p>
            <h2>Blogdan seçtiklerimiz</h2>
        </div>
        <a class="link" href="/eticaretphp/products.php">Siparişe başla</a>
    </div>
    <div class="container cards-inline">
        <article class="mini-card">
            <h3>Baklava nasıl saklanır?</h3>
            <p>Şerbetli tatlıların tazeliğini korumak için püf noktaları.</p>
        </article>
        <article class="mini-card">
            <h3>Usta ipuçları</h3>
            <p>Su böreği katlarını açarken dikkat edilmesi gerekenler.</p>
        </article>
        <article class="mini-card">
            <h3>Kahve eşleşmeleri</h3>
            <p>Türk kahvesiyle en uyumlu tatlı önerileri.</p>
        </article>
    </div>
</section>

<?php include __DIR__ . '/includes/footer.php'; ?>
