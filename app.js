//Variáveis
let entrada = dqs('#ent');
let lista = [];
let titulo = "*_MyList_*";
let hid = document.querySelector("#textexp");
let concluidos = undefined;
let textoConcluidos = "==================";
let textoImportado = "";

window.onload = function() {
    entrada.focus();
}

//captura o texto digitado
entrada.addEventListener('keypress', (e)=>{
    if(e.key==="Enter"){
        entrada.value.trimStart().trimEnd();
        // console.log(entrada.value.search('\n'));
        if((entrada.value.search('\n\n')>-1) || (entrada.value.search('1-')>-1) || (entrada.value.search('1.')>-1) || (entrada.value.search('- ')>-1) || entrada.value.trimStart().search('\n')>-1){
            importar();
        }else{
            listar(entrada.value);
        }
        mostrar();
        limparInput();
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
    let n = 1;
    dqs("#mylist").innerHTML="";
    concluidos = lista.find((element)=> element[1]==false);

    lista.forEach((item, index)=>{
        if(item[1]==true){
            dqs("#mylist").insertAdjacentHTML('beforeend','<div class="item" id="'+index+'">'+n+"- "+item[0]+'</div>');
            n++;
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
    let n = 1;
    let text = "";
    let listaExcluidos = false;
    text += titulo+"&#10;"
    lista.forEach((item)=>{
        if(item[1]==true){
            text += "&#10;"+n+". "+ item[0];
            n++;
        }
        if(item[1]==false){
            listaExcluidos = true;
        }
    })

    if(listaExcluidos==true){
        text += "&#10;&#10;"+ textoConcluidos;
        lista.forEach((item)=>{
            if(item[1]==false){
                text += "&#10;- ~"+ item[0]+"~";
            }
        });
    }
    return text;
}

//importar lista
function importar(){
    //encontrar pontos com duas quebras de linha
    textoImportado = entrada.value;
    let arListTrue = [];
    const searchStr = '\n\n';
    const indexes = [...textoImportado.matchAll(new RegExp(searchStr, 'gi'))].map(a => a.index);
    //console.log(indexes); // [2, 25, 27, 33]
    let arTodo=textoImportado.split('\n\n');

    //TITULO
    if(arTodo.length>1){
        dqs("#titulo").innerHTML=arTodo[0];
        if(arTodo[0].search('\n')>-1){
            let primeiraQuebraTitulo = arTodo[0].search('\n');
            arTodo[0]="*"+arTodo[0].slice(0,primeiraQuebraTitulo)+"*"+arTodo[0].slice(primeiraQuebraTitulo);
        }
        titulo = arTodo[0];
        arListTrue = arTodo[1].split('\n');
    }

    //LISTA PRINCIPAL
    if(arTodo.length==undefined){
        arListTrue = textoImportado.split('\n');
    }
    arListTrue.forEach((item)=>{
        let it = "";
        let i = item.match(/\-|\./);
        if(i!=undefined){
            it = item.slice(i["index"]+1);
        }else{
            it= item;
        }
        it = it.trimStart().trimEnd();
        if(it.trim()!=""){
            lista.push([it,true]);
        }
    })

    //LISTA EXCLUIDOS
    if(arTodo.length>2){
        let arListFalse = arTodo[2].split('\n');
        arListFalse.shift();
        arListFalse.forEach((item)=>{
            let i = item.match(/\-|\./);
            let it = item.slice(i["index"]+1);
            it = it.trimStart().trimEnd();
            if(it.search("~")>-1){
                it.substring(1);
                if(it.search("~")>-1){
                    it.slice(0,-1);
                }
            }
            if(it.trim()!=""){
                lista.push([it,false]);
            }
        })
    }
}