<?php
include('conection.php');

if( isset($_POST['email']) || isset($_POST['password']) ) {

    if( strlen($email) == 0 ) {
        echo 'Preencha seu email';
    } else if (strlen($password) == 0 ) {
        echo 'Preencha sua senha';
    } else {

        $sql = "SELECT * FROM users WHERE email= '$email' and senha='$password' ";
        $sql_query = $mysqli->query($sql) or die("Erro:" . $mysqli->error);

        $quant = $sql_query->num_rows;

        if($quant == 1) {
            $usuario = $sql_query->fetch_assoc();

            if( !isset($_SESSION) ){
                session_start();
            }
    
            $_SESSION['user'] = $usuario['username'];

            header("location: board.html");

        } else {
            echo "Falha ao logar! Email/senha incorretos";
        }

    }

}

?>

<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> Login </title>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" 
    rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">

    <!-- 
    <link rel="stylesheet" href="{ { url_for('templates', path='/board.html') } }">
    -->

    <link rel="stylesheet" href="/css/sign-in.css">
    
</head>


<body class="text-center">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" 
        crossorigin="anonymous">
    </script>

    <main class="form-signin w-100 m-auto">
        <img src="/img/damas_icon.png" alt="Simbolo de Damas" class="icon" width="100" height="100">
        <form action="board" method="POST">
            <!-- <img class="mb-4 rounded mx-auto d-block" src="../img/teste.png"> -->
            <h1 class="h1 mb-3 fw-normal"> Pronto para Jogar? </h1>

            <div class="form-floating">
                <input type="email" class="form-control" id="email" name="email"
                placeholder="name@example.com">
                <label for="floatingInput"> Email </label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" 
                id="password" placeholder="Password" name="email">
                <label for="floatingPassword"> Senha </label>
            </div>

            <button class="w-100 mt-3 btn btn-lg btn-primary" type="submit"> Entrar </button>
            <a class="w-100 mt-2 btn btn-lg btn-secondary" href="cadastrar" type="submit"> Cadastrar </a> 
            <a class="font-weight-light convitemsg" type="submit" href="board"> Tem um convite? Clique aqui! </a>
        </form>
    </main>
</body>

</html>