<?php

function ensureSession(): void
{
    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_start();
    }
}

function getCart(): array
{
    ensureSession();
    return $_SESSION['cart'] ?? [];
}

function cartCount(): int
{
    $count = 0;
    foreach (getCart() as $item) {
        $count += $item['quantity'];
    }
    return $count;
}

function addToCart(string $id, int $quantity = 1): void
{
    ensureSession();
    $cart = $_SESSION['cart'] ?? [];
    if (isset($cart[$id])) {
        $cart[$id]['quantity'] += $quantity;
    } else {
        $cart[$id] = ['product_id' => $id, 'quantity' => max(1, $quantity)];
    }
    $_SESSION['cart'] = $cart;
}

function updateCart(string $id, int $quantity): void
{
    ensureSession();
    $cart = $_SESSION['cart'] ?? [];
    if ($quantity <= 0) {
        unset($cart[$id]);
    } else {
        $cart[$id] = ['product_id' => $id, 'quantity' => $quantity];
    }
    $_SESSION['cart'] = $cart;
}

function clearCartItem(string $id): void
{
    ensureSession();
    $cart = $_SESSION['cart'] ?? [];
    unset($cart[$id]);
    $_SESSION['cart'] = $cart;
}
