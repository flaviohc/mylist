//Variáveis
let entrada = dqs('#ent');
let lista = [];
let titulo = "MyList";
let hid = document.querySelector("textarea");
let concluidos = undefined;

//captura o texto digitado
entrada.addEventListener('keypress', (e)=>{
    if(e.key==="Enter"){
        listar(entrada.value);
        limparInput();
        mostrar();
    }
})

//insere o texto digitado na matriz Lista
function listar(item){
    lista.push([item,true]);
}

//limpa o campo input para digitar proximo item
function limparInput(){
    entrada.value="";
    entrada.focus();
}

//mostra itens da matriz Lista para o usuario
function mostrar(){
    dqs("#mylist").innerHTML="";
    concluidos = lista.find((element)=> element[1]==false);
    console.log(concluidos);
    lista.forEach((item, index)=>{
        if(item[1]==true){
            dqs("#mylist").insertAdjacentHTML('beforeend','<div class="item" id="'+index+'"><span class="hidden"><input type="checkbox" id="cb'+index+'"></span>'+item[0]+'</div>');
        }
    })
    if(concluidos != undefined){
        dqs("#mylist").insertAdjacentHTML('beforeend',"--- itens concluídos ---");
        lista.forEach((item, index)=>{
            if(item[1]==false){
                dqs("#mylist").insertAdjacentHTML('beforeend','<div class="item done" id="'+index+'"><span class="hidden"><input type="checkbox" id="cb'+index+'"></span>'+item[0]+'</div>');
            }
        })
    }
    deletarComClick();
}

//deleta item ao clicar em cima
function deletarComClick(){
    dqsa(".item").forEach((element)=>{
        element.addEventListener("click", ()=>{
            element.classList.toggle("done");
            lista[element.id][1] = !lista[element.id][1];
            console.log(lista[element.id]);
            mostrar();
        })
    })
    // mostrar();
}

dqs("#exp").addEventListener('click',()=>{
    exportar()
})

function exportar(){
    dqs("#textexp").innerHTML = criarTextoExportacao();
    hid.select();
    hid.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(hid.value);
}

function criarTextoExportacao(){
    let text = "";
    let listaExcluidos = false;
    text += "*"+titulo+"* &#10;"
    lista.forEach((item)=>{
        if(item[1]==true){
            text += "&#10;- ✅"+ item[0];
        }
        if(item[1]==false){
            listaExcluidos = true;
        }
    })
    if(listaExcluidos==true){
        text += "&#10;&#10; ______itens concluídos______ &#10;";
        lista.forEach((item)=>{
            if(item[1]==false){
                text += "&#10;- ~"+ item[0]+"~";
            }
        });
    }
    return text;
}