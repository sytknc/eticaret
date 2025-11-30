<?php
// Basit yapılandırma ve isteğe bağlı veritabanı bağlantısı
$DB_HOST = getenv('DB_HOST') ?: 'localhost';
$DB_NAME = getenv('DB_NAME') ?: 'ebadinam_eticaret';
$DB_USER = getenv('DB_USER') ?: 'ebadinam_eticaret';
$DB_PASS = getenv('DB_PASS') ?: 'sytknC.1031';

$dsn = "mysql:host={$DB_HOST};dbname={$DB_NAME};charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

$pdo = null;
try {
    $pdo = new PDO($dsn, $DB_USER, $DB_PASS, $options);
} catch (PDOException $e) {
    // Veritabanı bağlantısı isteğe bağlıdır; başarısız olursa JSON ayarları kullanılacaktır.
    $pdo = null;
}
