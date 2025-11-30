<?php

function loadSettings(?PDO $pdo = null): array
{
    $defaults = [
        'site_name' => 'Lezzetli Sepet',
        'primary_color' => '#2563eb',
        'secondary_color' => '#0f172a',
        'logo_url' => '/public/logo.svg',
        'phone' => '+90 212 000 00 00',
        'email' => 'destek@lezzetlisepet.com',
        'whatsapp' => '+90 532 000 00 00',
        'address' => 'İstanbul, Türkiye',
        'headline' => 'Geleneksel Tatlılar & Börekler',
        'subheadline' => 'Taze üretilen ürünleri aynı gün kargoluyoruz.',
    ];

    if ($pdo instanceof PDO) {
        try {
            $dbSettings = $pdo->query('SELECT * FROM settings LIMIT 1')->fetch();
            if ($dbSettings) {
                return array_merge($defaults, $dbSettings);
            }
        } catch (Throwable $e) {
            // JSON yedeğine düş.
        }
    }

    $filePath = dirname(__DIR__) . '/data/settings.json';
    if (file_exists($filePath)) {
        $jsonSettings = json_decode(file_get_contents($filePath), true) ?: [];
        return array_merge($defaults, $jsonSettings);
    }

    return $defaults;
}
