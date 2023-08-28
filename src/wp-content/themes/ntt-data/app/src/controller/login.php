<?php
session_start();
loadModel('Login');

$user = ($_SESSION) ? $_SESSION['user'] : null;
if (isset($user)) {
    header('Location: app');
    exit();
} else {

    $exception = null;
    if (count($_POST) > 0) {
        $login = new Login($_POST);

        try {
            $user = $login->checkLogin();
            $_SESSION['user'] = $user;
            /**
             * O redirecionamento está sendo feito pelo javascript
             * para o navegador esperar armazenar o storage do usuário
             * e só depois redirecionar
             * 
             * OBS: se deixar header do php ele não dá tempo para o javascript armazenar no storage
             */
            userLoginJS($user);
            // usleep(500000); // 500000 microssegundos = 500 milissegundos
            // header("Location: app");
        } catch (AppException $e) {
            $exception = $e;
        }
    }

    loadView('login', $_POST + ['exception' => $exception]);
}