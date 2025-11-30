<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/data.php';
require_once __DIR__ . '/settings.php';
require_once __DIR__ . '/cart.php';

ensureSession();

$settings = loadSettings($pdo);
$products = loadProducts();
