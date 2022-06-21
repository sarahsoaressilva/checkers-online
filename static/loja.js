
const urlTab = '/tabuleiros'

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
                <button type="button" class="btn btn-danger" id=`+ tab_id + `> Comprar </button>
            </div>

            </div>
            <br>
        ` 
        };
    } 
    );
};

listarTabuleiros();

// Lista os tabuleiros na tela de loja.

/*
function listarTabuleiros() {
    
    
    // Lista todos os itens de tabuleiro.
    //tabuleiros.map( (tab) => {
 
        //console.log("Id: " + tab.id);
        //console.log("Nome do Tabuleiro: " + tab.nome);
        //console.log("Descrição: " + tab.descricao);
        //console.log("Valor (R$): " + tab.valor);

        
    } 
    );
}


// Lista os tabuleiros na tela de loja.
function listarImagensFundo() {
    var containerFundo = document.getElementById('imagensFundo');
    
    // Lista todos os itens de tabuleiro.
    fundo.map( (fundo ) => {
 
        //console.log("Id: " + fundo.id);
        //console.log("Nome da Img de Fundo: " + fundo.nome);
        //console.log("Descrição: " + fundo.descricao);
        //console.log("Valor (R$): " + fundo.valor);

        containerFundo.innerHTML += `

        <div class="card espaco-img" style="width: 18rem;">
            <img src="`+ fundo.img + `" class="card-img-top" heigth="200px" width="200px" >

            <div class="card-body" padding="20px">
                <h3 class="card-title"> ` + fundo.nome + ` </h3>
                <p class="card-text"> ` + fundo.valor + `</p>
                <p class="card-text"> `+ fundo.descricao + `</p>
                <button type="button" class="btn btn-danger" id=`+ fundo.id + `> Comprar </button>
            </div>
            
        </div>
        <br>
        ` 
    } 
    );
}


listarTabuleiros();
listarImagensFundo();

*/