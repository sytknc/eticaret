<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../includes/auth.php';
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    $stmt = $pdo->prepare('SELECT * FROM admin_users WHERE username = ? LIMIT 1');
    $stmt->execute([$username]);
    $user = $stmt->fetch();
    if ($user && password_verify($password, $user['password_hash'])) {
        $_SESSION['admin'] = $user['username'];
        header('Location: /eticaretphp/admin/dashboard.php');
        exit;
    } else {
        $error = 'Giriş başarısız. Bilgileri kontrol edin.';
    }
}
?>
<!doctype html>
<html lang="tr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Yönetici Girişi</title>
    <link rel="stylesheet" href="/eticaretphp/assets/css/style.css">
</head>
<body class="container" style="padding:2rem 0;">
    <h1>Yönetici Girişi</h1>
    <?php if ($error): ?><div class="alert"><?php echo htmlspecialchars($error); ?></div><?php endif; ?>
    <form method="post">
        <label>Kullanıcı adı</label>
        <input name="username" required>
        <label>Şifre</label>
        <input type="password" name="password" required>
        <button class="button" type="submit">Giriş yap</button>
    </form>
</body>
</html>
