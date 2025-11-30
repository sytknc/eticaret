</main>
<footer class="site-footer">
    <div class="container footer-inner">
        <div>
            <strong>Adres:</strong> <?php echo htmlspecialchars($settings['address'] ?? ''); ?>
        </div>
        <div class="social">
            <?php if ($settings['whatsapp']): ?>
                <a href="https://wa.me/<?php echo urlencode($settings['whatsapp']); ?>" target="_blank">WhatsApp</a>
            <?php endif; ?>
        </div>
    </div>
</footer>
</body>
</html>
