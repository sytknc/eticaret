<?php
session_start();

function require_login(): void
{
    if (empty($_SESSION['admin'])) {
        header('Location: /eticaretphp/admin/login.php');
        exit;
    }
}
?>
