<?php
require_once __DIR__ . '/../config.php';
$settings = $pdo->query('SELECT * FROM settings LIMIT 1')->fetch() ?: [
    'site_name' => 'Demo Mağaza',
    'primary_color' => '#0ea5e9',
    'secondary_color' => '#0f172a',
    'logo_url' => '/public/logo.png',
    'phone' => '',
    'email' => '',
    'whatsapp' => '',
    'address' => ''
];
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
            <img src="<?php echo htmlspecialchars($settings['logo_url']); ?>" alt="Logo" class="logo" />
            <span><?php echo htmlspecialchars($settings['site_name']); ?></span>
        </a>
        <div class="contact">
            <?php if ($settings['phone']): ?><span>Tel: <?php echo htmlspecialchars($settings['phone']); ?></span><?php endif; ?>
            <?php if ($settings['email']): ?><span>E-posta: <?php echo htmlspecialchars($settings['email']); ?></span><?php endif; ?>
        </div>
    </div>
</header>
<main class="container">
