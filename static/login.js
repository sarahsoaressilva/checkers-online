async function postForm(){
    var email = document.getElementById('email');
    var password = document.getElementById('password');

    var json = {
        method: 'POST',
        headers: {}, 

    body: JSON.stringify( {
        email: email,
        password: password
    } )
    };

    // fetch : método de envio.
    // await: espera resposta

    console.log(json);
    
    const response = await fetch('http://127.0.0.1:8000/login', json);
    
    console.log(response);
} 