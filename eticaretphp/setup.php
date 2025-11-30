<?php
// Basit kurulum scripti. Hostinginizde tek sefer çalıştırın.
$DB_HOST = getenv('DB_HOST') ?: 'localhost';
$DB_NAME = getenv('DB_NAME') ?: 'ebadinam_eticaret';
$DB_USER = getenv('DB_USER') ?: 'ebadinam_eticaret';
$DB_PASS = getenv('DB_PASS') ?: 'sytknC.1031';

$dsnBase = "mysql:host={$DB_HOST};charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];
try {
    $pdo = new PDO($dsnBase, $DB_USER, $DB_PASS, $options);
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `{$DB_NAME}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    $pdo->exec("USE `{$DB_NAME}`");

    $pdo->exec('CREATE TABLE IF NOT EXISTS settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        site_name VARCHAR(190) NOT NULL,
        primary_color VARCHAR(20) NOT NULL DEFAULT "#0ea5e9",
        secondary_color VARCHAR(20) NOT NULL DEFAULT "#0f172a",
        logo_url VARCHAR(255) NOT NULL DEFAULT "",
        phone VARCHAR(60) DEFAULT NULL,
        email VARCHAR(190) DEFAULT NULL,
        whatsapp VARCHAR(60) DEFAULT NULL,
        address TEXT DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;');

    $pdo->exec('CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(190) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL DEFAULT 0,
        image_url VARCHAR(255) NOT NULL DEFAULT "/eticaretphp/assets/demo-product.jpg",
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY name_unique (name)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;');

    $pdo->exec('CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(190) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;');

    // demo veriler
    $pdo->exec('DELETE FROM products');
    $stmt = $pdo->prepare('INSERT INTO products (name, description, price, image_url) VALUES (?,?,?,?)');
    $demoProducts = [
        ['Demo Ürün 1', 'Tanıtım amaçlı ürün açıklaması.', 249.90, '/eticaretphp/assets/demo-product.jpg'],
        ['Demo Ürün 2', 'İkinci demo ürün.', 129.00, '/eticaretphp/assets/demo-product.jpg'],
        ['Demo Ürün 3', 'Üçüncü demo ürün.', 89.99, '/eticaretphp/assets/demo-product.jpg']
    ];
    foreach ($demoProducts as $p) { $stmt->execute($p); }

    $pdo->exec('DELETE FROM settings');
    $pdo->prepare('INSERT INTO settings (site_name, primary_color, secondary_color, logo_url, phone, email, whatsapp, address) VALUES (?,?,?,?,?,?,?,?)')
        ->execute([
            'Ebadinam E-Ticaret', '#0ea5e9', '#0f172a', '/public/logo.png', '05071325838', 'destek@ornek.com', '05071325838', 'Demo adres satırı'
        ]);

    $pdo->exec('DELETE FROM admin_users');
    $adminPass = password_hash('sytknC.1031', PASSWORD_DEFAULT);
    $pdo->prepare('INSERT INTO admin_users (username, password_hash) VALUES (?,?)')->execute(['05071325838', $adminPass]);

    echo "Kurulum tamamlandı. Yönetici kullanıcı adı: 05071325838";
} catch (PDOException $e) {
    http_response_code(500);
    echo "Kurulum sırasında hata: " . htmlspecialchars($e->getMessage());
    exit;
}
