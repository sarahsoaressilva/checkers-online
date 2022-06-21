
const urlTab = '/tabuleiros';
var urlUser = '/userid';

const getJSON = async url => {
    const response = await fetch(url);

    // check if response not worked (no 404 errors etc...)
    if( !response.ok ) 
      throw new Error(response.statusText);
  
    // get JSON from the response  
    const data = await response.json(); 

    // returns a promise, which resolves to this data value
    return data; 
  }



function listarTabuleiros() {
    var containerTabuleiro = document.getElementById('tabuleiros');

    // Pega os dados e transforma de forma usável.
    getJSON(urlTab).then( 
        function( response ) { // Transforma em uma lista de JSONs usável.
        
        //console.log(response[0].valor);
        //console.log(response[1].valor);
        
        // Pega a quantidade de itens da array.
        var tamanhoArray = response.length; 
        
        // Para cada indice na array, ele lista no HTML.
        for (var i = 0; i < tamanhoArray; i++) {
            
            //console.log("Nome:" + response[i].nome);

            var tab_nome = response[i].nome;
            var tab_valor = response[i].valor;
            var tab_descricao = response[i].descricao;
            var tab_img = response[i].img;
            var tab_id = response[i].tab_id;
            

            containerTabuleiro.innerHTML += `
            <div class="card espaco-img" style="width: 18rem;">
              <img src="`+ tab_img  + `" class="card-img-top" heigth="500px" width="500px" >

            <div class="card-body">
                <h3 class="card-title"> ` + tab_nome + ` </h3>
                <p class="card-text"> R$ ` + tab_valor + `</p>
                <p class="card-text"> `+ tab_descricao + `</p>
            </div>
            <div class="card-footer">
                <button type="button" class="btn btn-danger" id=`+ tab_id + `
                onclick="compraTabuleiro(this.id)"> Comprar </button>
            </div>

            </div>
            <br>
        ` 
        };
    } 
    );
};

listarTabuleiros();


function compraTabuleiro(tabId) {
    var user = 0; // inicializa user.
    var tab_id = tabId; //Pega id do tabuleiro. 

    // 1 = Tabuleiro
    var tipo = 1;

    getJSON(urlUser).then(
        function( response ) {
            user = response;

            //console.log ( typeof(user) );

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(this.responseText);
                    response = this.responseText;
                    console.log(typeof( (this.responseText) ) );
                }
            };

            xhttp.open("POST", "/compraTabuleiro", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({
                 "user_id": user,
                 "item_id": tab_id,
                 "tipo": tipo
            }));

            alert('Item comprado com sucesso!');
        }
    );

   //console.log(user) 

}


