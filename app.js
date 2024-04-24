//Variáveis
let entrada = dqs('#ent');
let ent = "";
let lista = [];
let titulo = "*_MyList_*";
let hid = document.querySelector("#textexp");
let concluidos = undefined;
let textoConcluidos = "==================";
let textoImportado = "";
let ordem = false;
let del = false;

//Previne atualização acidental
// function previneReload(){
//     window.addEventListener('beforeunload', (event) => {
//         event.returnValue = 'Deseja atualizar a pagina? Os dados serão perdidos.';
//     });
// }

window.onload = function() {
    entrada.focus();
}

dqs("#ordem").addEventListener('click',()=>{
    if(ordem==false){ordem=true}else{ordem=false};
    mostrar();
})

dqs("#lixo").addEventListener('click',()=>{
    if(del==false){del=true}else{del=false};
    delOn();
})

//captura o texto digitado
entrada.addEventListener('keydown', (e)=>{
    if(e.key==="Enter"){
        preparaInput();
    }
})

entrada.addEventListener('keyup', (e)=>{
    if(e.key==="Enter"){
        adicionar();
    }
});

dqs("#add").addEventListener('click',()=>{
    preparaInput();
    adicionar();
});

//Prepara o valor digitado antes de adicioná-lo a lista
//Para evitar bug de quebra de linha depois de adicinar tarefa
function preparaInput(){
    ent = entrada.value.trimStart().trimEnd();
    entrada.value = "";
}

function adicionar(){
    // console.log(entrada.value.search('\n'));
    if((ent.search('\n\n')>-1) || (ent.search('[1]\-')>-1) || (ent.search(/[1]\./)>-1) || (ent.search('\-s')>-1) || ent.search('\n')>-1){
        importar();
    }else{
        listar(ent);
    }
    if(lista!=[]){
        // previneReload();
    };
    mostrar();
    limparInput();
}

//insere o texto digitado na matriz Lista
function listar(item){
    if(item!=""){
        lista.push([item,true]);
    }
}

//limpa o campo input para digitar proximo item
function limparInput(){
    entrada.value="";
    entrada.focus();
    entrada.value="";
}

//mostra itens da matriz Lista para o usuario
function mostrar(){
    let n = 1;
    let up = false;
    let last = 0;
    let first = 0;
    dqs("#mylist").innerHTML="";
    concluidos = lista.find((element)=> element[1]==false);

    lista.forEach((item, index)=>{
        if(item[1]==true){
            dqs("#mylist").insertAdjacentHTML('beforeend','<div class="item" id="'+index+'"><span class="undone">'+n+"- "+item[0]+'</span><span class="ordem"><button class="button up" id="up'+index+'">o</button><button class="button down" id="down'+index+'">h</button></span></div>');
            if(up == false){
                first = index;
                up = true;
            }
            n++;
            last=index;
        }
    })
    
    if(n-1==0 && lista.length>0){
        dqs("#mylist").insertAdjacentHTML('beforeend',"<div class='concluidos'>(Lista vazia)</div>");
    }
    if(concluidos != undefined){
        dqs("#mylist").insertAdjacentHTML('beforeend',"<div class='concluidos'>----- itens concluídos -----</div>");
        lista.forEach((item, index)=>{
            if(item[1]==false){
                dqs("#mylist").insertAdjacentHTML('beforeend','<div class="item" id="'+index+'"><span class="done">'+item[0]+'</span><button class="del">9</button></div>');
            }
        });
    }
    deletarComClick();
    ordemOn(first,last);
    delOn();
}

function ordenar(first, last){
    dqsa(".up").forEach((e)=>{
        e.addEventListener('click',(item)=>{
            item.stopPropagation();
            let id = item.target.parentNode.parentNode.id;
            let num = 1;
            if(id-num>=0){
                while(lista[id-num][1]==false){
                    num++;
                }
                let t = lista[id];
                lista[id]=lista[id-num];
                lista[id-num]=t;
            }
            mostrar();
        })
    })
    dqsa(".down").forEach((e)=>{
        e.addEventListener('click',(item)=>{
            item.stopPropagation();
            let id = item.target.parentNode.parentNode.id;
            id = Number(id);

            if(id+2<=lista.length){
                let num = 1;
                while(lista[id+num][1]==false){
                    num++
                }
                let t = lista[id+num];
                lista[id+num]=lista[id];
                lista[id]=t;
            }
            mostrar();
        })
    })
    dqs("#up"+first).classList.remove("button");
    dqs("#up"+first).classList.add("disabled");
    dqs("#down"+last).classList.remove("button");
    dqs("#down"+last).classList.add("disabled");
}

function delOn(){
    dqsa(".del").forEach((e)=>{
        if(del==true){
            e.style.display="block";
            e.addEventListener('click', (item)=>{
                item.stopPropagation();
                let id = item.target.parentNode.id;
                console.log(id);
                lista.splice(id, 1);
                mostrar();
            })
        }else{
            e.style.display="none";
        }
    })
}

function ordemOn(first,last){
    if(ordem==true){
        dqsa(".ordem").forEach((i)=>{
            i.style.display="block";
        })
        ordenar(first,last);
    }else{
        dqsa(".ordem").forEach((i)=>{
            i.style.display="none";
        })
    }
}

//deleta item ao clicar em cima
function deletarComClick(){
    dqsa(".item").forEach((element)=>{
        element.addEventListener("click", ()=>{
            element.classList.toggle("done");
            lista[element.id][1] = !lista[element.id][1];
            // console.log(lista[element.id]);
            mostrar();
        })
    })
    // mostrar();
}

dqs("#copy").addEventListener('click',()=>{
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
    console.log("importado");
    textoImportado = ent;
    let arListTrue = [];
    const searchStr = '\n\n';
    const indexes = [...textoImportado.matchAll(new RegExp(searchStr, 'gi'))].map(a => a.index);
    //console.log(indexes); // [2, 25, 27, 33]
    let arTodo=textoImportado.split('\n\n');
    console.log(arTodo.length);

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
    if(arTodo.length==1 || arTodo.length==0){
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

// //Drag and Drop

// columns = dqsa('.mylist');

// document.addEventListener('dragstart', (e)=>{
//     e.target.classList.add('dragging');
// })

// document.addEventListener("dragend", (e)=>{
//     e.target.classList.remove('dragging');
//     //getArray();
// })

// columns.forEach((item)=>{
//     item.addEventListener('dragover', (e)=>{
//         const dragging = dqs('.dragging');
//         const applyAfter = getNewPosition(item, e.clientY);

//         if(applyAfter){
//             applyAfter.insertAdjacentElement('afterend', dragging);
//         }else{
//             if(dragging){
//                 item.prepend(dragging);
//             }
//         }
//         e.preventDefault() ;
//     })
// })

// function getNewPosition(column, posY){
//     const cards = column.querySelectorAll(".item:not(.dragging)");
//     let result;

//     for(let refer_card of cards){
//         const box = refer_card.getBoundingClientRect();
//         const boxCenterY = box.y + box.height/2;

//         if (posY >= boxCenterY)result = refer_card;
//     }

//     return result;
// }
// FIM drag and Drop