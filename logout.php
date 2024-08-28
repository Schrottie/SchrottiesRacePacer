<?php
// Lösche das Login-Cookie
setcookie('loggedIn', '', time() - 3600, '/'); // Cookie abgelaufen setzen
header('Location: index.html');
exit;
?>
