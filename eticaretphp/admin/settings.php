<?php
require_once __DIR__ . '/../includes/auth.php';
require_login();
require_once __DIR__ . '/../config.php';
$message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = [
        'site_name' => $_POST['site_name'] ?? 'Demo Mağaza',
        'primary_color' => $_POST['primary_color'] ?? '#0ea5e9',
        'secondary_color' => $_POST['secondary_color'] ?? '#0f172a',
        'logo_url' => $_POST['logo_url'] ?? '/public/logo.png',
        'phone' => $_POST['phone'] ?? '',
        'email' => $_POST['email'] ?? '',
        'whatsapp' => $_POST['whatsapp'] ?? '',
        'address' => $_POST['address'] ?? ''
    ];
    $pdo->prepare('DELETE FROM settings')->execute();
    $pdo->prepare('INSERT INTO settings (site_name, primary_color, secondary_color, logo_url, phone, email, whatsapp, address) VALUES (?,?,?,?,?,?,?,?)')
        ->execute(array_values($data));
    $message = 'Ayarlar kaydedildi';
}
$settings = $pdo->query('SELECT * FROM settings LIMIT 1')->fetch() ?: [];
?>
<!doctype html>
<html lang="tr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Site Ayarları</title>
    <link rel="stylesheet" href="/eticaretphp/assets/css/style.css">
</head>
<body class="container" style="padding:2rem 0;">
<nav class="admin-nav">
    <a href="/eticaretphp/admin/dashboard.php">Genel Bakış</a>
    <a href="/eticaretphp/admin/products.php">Ürünler</a>
    <a href="/eticaretphp/admin/settings.php">Site Ayarları</a>
    <a href="/eticaretphp/admin/logout.php">Çıkış</a>
</nav>
<h1>Site Ayarları</h1>
<?php if ($message): ?><div class="alert"><?php echo htmlspecialchars($message); ?></div><?php endif; ?>
<form method="post" class="card">
    <label>Site adı</label>
    <input name="site_name" value="<?php echo htmlspecialchars($settings['site_name'] ?? ''); ?>" required>
    <label>Logo URL</label>
    <input name="logo_url" value="<?php echo htmlspecialchars($settings['logo_url'] ?? ''); ?>" required>
    <label>Birincil renk</label>
    <input type="color" name="primary_color" value="<?php echo htmlspecialchars($settings['primary_color'] ?? '#0ea5e9'); ?>">
    <label>İkincil renk</label>
    <input type="color" name="secondary_color" value="<?php echo htmlspecialchars($settings['secondary_color'] ?? '#0f172a'); ?>">
    <label>Telefon</label>
    <input name="phone" value="<?php echo htmlspecialchars($settings['phone'] ?? ''); ?>">
    <label>E-posta</label>
    <input name="email" value="<?php echo htmlspecialchars($settings['email'] ?? ''); ?>">
    <label>WhatsApp</label>
    <input name="whatsapp" value="<?php echo htmlspecialchars($settings['whatsapp'] ?? ''); ?>">
    <label>Adres</label>
    <textarea name="address"><?php echo htmlspecialchars($settings['address'] ?? ''); ?></textarea>
    <button class="button" type="submit">Kaydet</button>
</form>
</body>
</html>
