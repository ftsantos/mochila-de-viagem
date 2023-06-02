const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem('itens')) || []

console.log(itens);

itens.forEach((elemento) => {
    criaElemento(elemento);
});

// os dados enviados são o evento
form.addEventListener("submit", (evento) => {
    
    evento.preventDefault(); // interromper o comportamento padrão do evento
    console.log('Submit funcionou');

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    const existe = itens.find(elemento => elemento.nome === nome.value);
    console.log(existe);
    
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if(existe){
        itemAtual.id = existe.id;
        
        atualizaElemento(itemAtual);
        //itens[existe.id] = itemAtual; // atualiza o item da posição correspondente
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    }
    else{
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id + 1 : 0;
        criaElemento(itemAtual);
        itens.push(itemAtual);
    }

    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    quantidade.value = "";
});

function criaElemento(item){
    
    //exemplo do objeto que vou criar // <li class="item"><strong>7</strong>Camisas</li>
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade; // <strong> quantidade </strong>
    numeroItem.dataset.id = item.id; // para identificar o item na hora de incrementar itens existentes

    novoItem.appendChild(numeroItem); // adiciona um objeto dentro do outro
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id));
    
    lista.appendChild(novoItem);
}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function botaoDeleta(id){
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";
    elementoBotao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id); //arrow function não carrega o this, por isso não usei () => {}
    });
    return elementoBotao;
}

function deletaElemento(tag, id){
    tag.remove();

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1); //deletar
    
    localStorage.setItem("itens", JSON.stringify(itens));
}