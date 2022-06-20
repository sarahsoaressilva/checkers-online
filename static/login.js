async function postForm(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var json = {
        method: 'POST',
        headers: {}, 

    body: JSON.stringify (
    {
        email: email,
        password: password
    }
    )
    };

    // json = JSON.stringify(json);

    // fetch : método de envio.
    // await: espera resposta

    // console.log(json);
    
    // const response = await fetch('http://127.0.0.1:8000/login', json);
    
    //console.log(response);
} 