<?php

function loadProducts(): array
{
    static $products;
    if ($products !== null) {
        return $products;
    }

    $filePath = dirname(__DIR__) . '/data/products.json';
    if (!file_exists($filePath)) {
        return [];
    }

    $json = file_get_contents($filePath);
    $products = json_decode($json, true) ?: [];

    return $products;
}

function findProduct(string $id): ?array
{
    foreach (loadProducts() as $product) {
        if ($product['id'] === $id) {
            return $product;
        }
    }

    return null;
}

function featuredProducts(int $limit = 6): array
{
    $products = loadProducts();
    return array_slice($products, 0, $limit);
}
