const urlMeusTab = '/meusTabuleiros';
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


function listarMeusTabuleiros() {
    var containerTabuleiro = document.getElementById('meusTabs');

    // Pega os dados e transforma de forma usável.
    var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            response = this.responseText;
            console.log(typeof((this.responseText)));
        }
    };
    xhttp.open("GET", urlMeusTab, false);
    var a = xhttp.responseText;

        var tamanhoArray = response.length; 
        
        // Para cada indice na array, ele lista no HTML.
        for (var i = 0; i < tamanhoArray; i++) {
            
            //console.log("Nome:" + response[i].nome);

            var tab_nome = response[i].nome;
            var tab_img = response[i].img;
            var tab_id = response[i].tab_id;
            

            containerTabuleiro.innerHTML += `
            <div class="card espaco-img" style="width: 18rem;">
              <img src="`+ tab_img  + `" class="card-img-top" heigth="500px" width="500px" >

            <div class="card-body">
                <h3 class="card-title"> ` + tab_nome + ` </h3>
            </div>
            <div class="card-footer">
                <button type="button" class="btn btn-danger" id=`+ tab_id + `
                onclick="usaTabuleiro(`+ tab_img  + `)"> Comprar </button>
            </div>

            </div>
            <br>
        ` 
        };
    };


function trocarTabuleiro(){

  // Detecta o tabuleiro.
  let tabuleiro = document.querySelector('.V');
  tabuleiro = getComputedStyle(tabuleiro);

  // Teste para pegar a propriedade background-image.
  let link = tabuleiro.getPropertyValue("background-image");

  // Capta com sucesso a propriedade.
  console.log(link);

  // Var de Teste  
  let img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAh1BMVEVDv/s/wf1Bv/5CwPkwv/6l2uxFwfNBwPpHvfdBwfi86PWs3u40vf9Hvvq14vBDwPrI6veu4vG76PX89OLc+//j+P3V8/nV8f3Q8fvC7Pes3vC97Pe+6/Cu7f7t79spt/ZAtfae2eyn1uo0wfc7xOg/xPG84fVIvPFGwe4avf+a2PKm2Oba3tdeY85kAAADkklEQVR4nO3dCXOaQACG4b3cZXURY6/ch6nVxP7/39cFxCtGjB3H+ZbvaTNEqLAvxxirY8S37z9+/rq+von6/f54WLmKBo3b+GfQO93t4LC4reER+kcYjUaxY1SLQXf3D49i/PRs1ewprBkTTDUxpplhmhknkCZ8rll1y8oPrOFzWVDOmhcxFrlVWmW1vFYURbai7f+ZZS3i1vJ2bWuJ/JZcKTUzE3H36n+/Tr3cUriKrhU1+VXN/Q+ot+O+vOpPNhjX5KpJOXjrvZ3KhfgTnr1Sodg7AF99qVOJknL+08BmyRH7QvtWWlQHWzTiCLIwEUOTT51Xot4LYsvyUG7coxx1M/iPk925WyfEXoU4lizabe9eqws/j8dwGJSVUol6g7XleNXy4K/20XJPLqd7J7s3y28PnFfLDYkjht9+lJt/stx78dQUs/IYhly69l14ecXO9OPN7SVFvLqkNb2qUO/eLQk6ntqpF6Z/DFmIbrswRevC+Li1/PEjLatCw0JU67M0S7xwkPx1yEJc68IsPu+49GjOYaPQeSfb7wBns1CzEBIL8bEQHwvxsRAfC/GxEB8L8bEQHwvxsRAfC/F16n+EdeLH0Fgtpb/0cM6gKezFQsFCSCzEx0J8G4VOicQLpVIsRMRCfCzEx0J8LMTHQnwsxMdCfCzEx0J8LMTHQnwsxNepQidSf90i/deeWAiKhfg2C1XShQMzc66A+KSoL+rUO/c68O5LFmJiIT4W4mMhPhbiYyE+FuJjIT4W4mMhPhbiYyE+FuJjIT4W4utUoe7AK6Spf2J5Eb+/9HDOgIX4msKr8jpkIaRVoUm9cBgyqVN8OOzc7+xiISIW4mMhPhbiYyE+FuJjIT4W4mMhPhbiYyE+FuJjIT4W4mMhPhbi61ahT7qwX37yR5Hi+76awnHIpC8SDOxQYX2WshARC/GxEB8L8bEQHwvxsRAfC/GxEB8L8bEQHwvxsRAfC/GxEN/OK6SXHs4ZdOkYapmrlI/hyLAQ1brQu7QLb5K/DrtQ6KVIunAUvBMq5d/3xEJcLMTXqcL4UOESfHLhhagfD/PcSut15H0z8euJ/jDZP/f0ha0bO3GhF8rPq0d85ZVWpdi9Mdm5uZ57cOGeuZdZGL/iX18+P1SxsFCJ8mEi7pyyyguZHBfPUldeh/d2NtXzmU3P3Hs7lwvx8KZMMCGY9IQg5du7eHyZLCa9SS9Fk97i/e8/hVKA8Fy9sIkAAAAASUVORK5CYII=';

  tabuleiro.style.setProperty('background-image', img);
  
  
}

