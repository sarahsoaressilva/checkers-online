
const urlImg = '/imagensFundo';
var urlUser = '/userid';

function listarImagensFundo() {
    var containerImagem = document.getElementById('imagensFundo');

    // Pega os dados e transforma de forma usável.
    getJSON(urlImg).then( 
        function( response ) { // Transforma em uma lista de JSONs usável.
        
        //console.log(response[0].valor);
        //console.log(response[1].valor);
        
        // Pega a quantidade de itens da array.
        var tamanhoArray = response.length; 
        
        // Para cada indice na array, ele lista no HTML.
        for (var i = 0; i < tamanhoArray; i++) {
            
            //console.log("Nome:" + response[i].nome);

            var img_nome = response[i].nome;
            var img_valor = response[i].valor;
            var img_descricao = response[i].descricao;
            var img_img = response[i].img;
            var fundo_id = response[i].fundo_id;
            

            containerImagem.innerHTML += `
            <div class="card espaco-img" style="width: 18rem;">
              <img src="`+ img_img   + `" class="card-img-top" heigth="500px" width="500px" >

            <div class="card-body">
                <h3 class="card-title"> ` + img_nome + ` </h3>
                <p class="card-text"> R$ ` + img_valor + `</p>
                <p class="card-text"> `+ img_descricao + `</p>
            </div>
            <div class="card-footer">
                <button type="button" class="btn btn-danger" id=`+ fundo_id + `
                onclick="compraImagensFundo(this.id)"> Comprar </button>
            </div>

            </div>
            <br>
        ` 
        };
    } 
    );
};

//listarTabuleiros();
listarImagensFundo();


function compraImagensFundo(imgId) {
    
    var user = 0; // inicializa user.

    var fundoId = imgId; //Pega id do tabuleiro. 

    // 2 = Imagens
    var tipo = 2;

    //console.log(fundoId);

    
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

            xhttp.open("POST", "/compraImagensFundo", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({
                 "user_id": user,
                 "item_id": fundoId,
                 "tipo": tipo
            }));
        
            alert('Item comprado com sucesso!');
        
        }
    );    
}
