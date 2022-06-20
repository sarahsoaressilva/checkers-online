// Modelagem JSON tabuleiro
const tabuleiro = [
    {
        id: 0,
        nome: 'xxx',
        descricao: 'xxx',
        img: 'https://i.pinimg.com/564x/02/3f/44/023f448eae59c7d5c71069bed1dd7670.jpg',
        valor: 0
    }
];


// Modelagem JSON tabuleiro
const fundo = [
    {
        id: 0,
        nome: 'xxxxx',
        descricao: 'xxxx',
        img: 'https://a.travel-assets.com/findyours-php/viewfinder/images/res40/71000/71115-Maracana-Stadium.jpg',
        valor: 0
    },
    {
        id: 0,
        nome: 'xxxxx',
        descricao: 'xxxx',
        img: 'https://a.travel-assets.com/findyours-php/viewfinder/images/res40/71000/71115-Maracana-Stadium.jpg',
        valor: 0
    },
    {
        id: 0,
        nome: 'xxxxx',
        descricao: 'xxxx',
        img: 'https://a.travel-assets.com/findyours-php/viewfinder/images/res40/71000/71115-Maracana-Stadium.jpg',
        valor: 0
    }
];


// Lista os tabuleiros na tela de loja.
function listarTabuleiros() {
    var containerTabuleiro = document.getElementById('tabuleiros');
    
    // Lista todos os itens de tabuleiro.
    tabuleiro.map( (tab) => {
 
        console.log("Id: " + tab.id);
        console.log("Nome do Tabuleiro: " + tab.nome);
        console.log("Descrição: " + tab.descricao);
        console.log("Valor (R$): " + tab.valor);

        containerTabuleiro.innerHTML += `

        <div class="card espaco-img" style="width: 18rem;">
            <img src="`+ tab.img + `" class="card-img-top" heigth="500px" width="500px" >

            <div class="card-body">
                <h3 class="card-title"> ` + tab.nome + ` </h3>
                <p class="card-text"> ` + tab.valor + `</p>
                <p class="card-text"> `+ tab.descricao + `</p>
                <button type="button" class="btn btn-danger" id=`+ tab.id + `> Comprar </button>
            </div>
            
        </div>
        <br>
        ` 
    } 
    );
}

// Lista os tabuleiros na tela de loja.
function listarImagensFundo() {
    var containerFundo = document.getElementById('imagensFundo');
    
    // Lista todos os itens de tabuleiro.
    fundo.map( (fundo ) => {
 
        console.log("Id: " + fundo.id);
        console.log("Nome da Img de Fundo: " + fundo.nome);
        console.log("Descrição: " + fundo.descricao);
        console.log("Valor (R$): " + fundo.valor);

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