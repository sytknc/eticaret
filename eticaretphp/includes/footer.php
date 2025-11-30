</main>
<footer class="site-footer">
    <div class="container footer-grid">
        <div>
            <p class="brand-footer"><?php echo htmlspecialchars($settings['site_name']); ?></p>
            <p><?php echo htmlspecialchars($settings['headline']); ?></p>
            <div class="social">
                <?php if (!empty($settings['whatsapp'])): ?>
                    <a href="https://wa.me/<?php echo urlencode($settings['whatsapp']); ?>" target="_blank">WhatsApp</a>
                <?php endif; ?>
                <?php if (!empty($settings['email'])): ?>
                    <a href="mailto:<?php echo htmlspecialchars($settings['email']); ?>">E-posta</a>
                <?php endif; ?>
            </div>
        </div>
        <div>
            <p class="footer-heading">İletişim</p>
            <p>Adres: <?php echo htmlspecialchars($settings['address']); ?></p>
            <p>Telefon: <?php echo htmlspecialchars($settings['phone']); ?></p>
        </div>
        <div>
            <p class="footer-heading">Hızlı Linkler</p>
            <a href="/eticaretphp/products.php">Tüm Ürünler</a>
            <a href="/eticaretphp/cart.php">Sepet</a>
            <a href="/eticaretphp/admin/login.php">Yönetim</a>
        </div>
    </div>
    <div class="footer-bottom">© <?php echo date('Y'); ?> <?php echo htmlspecialchars($settings['site_name']); ?>. Tüm hakları saklıdır.</div>
</footer>
</body>
</html>
