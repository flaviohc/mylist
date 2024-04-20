//Variáveis
let entrada = dqs('#ent');
let lista = [];

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
    lista.forEach((item, index)=>{
        if(item[1]==true){
            dqs("#mylist").insertAdjacentHTML('beforeend','<div class="item" id="'+index+'"><span class="hidden"><input type="checkbox" id="cb'+index+'"></span>'+item[0]+'</div>');
        }
    })
    dqs("#mylist").insertAdjacentHTML('beforeend',"--- itens concluídos ---");
    lista.forEach((item, index)=>{
        if(item[1]==false){
            dqs("#mylist").insertAdjacentHTML('beforeend','<div class="item done" id="'+index+'"><span class="hidden"><input type="checkbox" id="cb'+index+'"></span>'+item[0]+'</div>');
        }
    })
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