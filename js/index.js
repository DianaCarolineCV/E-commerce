let lista = document.querySelector(".lista");
let carrinho = document.querySelector(".carrinho ul");
let divCarrinho = document.querySelector(".adicionar-carrinho");
let carrinho_produtos = [];
let total = 0;
let quantidadeProdutos = 0;

function criarCard(produto) {

    let id = produto.id
    let imgUrl = produto.imgUrl
    let tag = produto.tag
    let nameItem = produto.nameItem
    let description = produto.description
    let value = produto.value
    let addCart = produto.addCart


    let li = document.createElement("li")
    let img = document.createElement("img")
    img.src = imgUrl
    img.alt = nameItem
    let h3 = document.createElement("h3")
    h3.innerText = tag
    let h2 = document.createElement("h2")
    h2.innerText = nameItem
    let p = document.createElement("p")
    p.innerText = description
    let h4 = document.createElement("h4")
    h4.innerText = `R$ ${value}.00`
    let button = document.createElement("button")
    button.innerText = addCart
    button.classList.add("botao")

    if (id != undefined) {
        button.id = id
    }

    li.appendChild(img)
    li.appendChild(h3)
    li.appendChild(h2)
    li.appendChild(p)
    li.appendChild(h4)
    li.appendChild(button)
    return li
};

function card(lista, secao) {
    secao.innerHTML = ""
    for (let i = 0; i < lista.length; i++) {
        let produto = lista[i]
        let cardProduto = criarCard(produto)
        secao.appendChild(cardProduto)
    }
    
};

card(data, lista);

lista.addEventListener("click", interceptandoProduto);

function interceptandoProduto(event) {
    divCarrinho.style.display = "none"
    let btnComprar = event.target
    if (btnComprar.tagName === "BUTTON") {
        let idProduto = btnComprar.id
        let produto = data.find(function (produto) {
            if (produto.id == idProduto) {
                return produto

            }
        })

        let produtoCarrinho = carrinho_produtos.push(produto)

        adicionarCarrinho(produtoCarrinho)
    }

};


function adicionarCarrinho() {
    card(carrinho_produtos, carrinho)
    soma(carrinho_produtos)
    quantidade(carrinho_produtos)
}

carrinho.addEventListener("click", removerCarrinho)

function removerCarrinho(event) {
    let btnRemover = event.target
    if (btnRemover.tagName === "BUTTON") {
        let parent = btnRemover.parentElement
        let parentIndex = Array.from(carrinho.children).indexOf(parent)
        carrinho_produtos.splice(parentIndex, 1)
        soma(carrinho_produtos)
        quantidade(carrinho_produtos)
        carrinho.removeChild(parent)
    }

    if (carrinho_produtos.length === 0) divCarrinho.style.display = "flex"
}


function soma(array) {
    total = 0
    for (let i = 0; i < array.length; i++) {
        total += array[i].value
    }
    let h3 = document.getElementById("total")
    h3.innerText = `Preço total: R$ ${total}.00`
}

function quantidade(array) {
    quantidadeProdutos = 0
    for (let i = 0; i < array.length; i++) {
        quantidadeProdutos++
    }
    let h2 = document.getElementById("quantidadeDeProdutos")
    h2.innerText = `QTD de produto: ${ quantidadeProdutos}`
}

let carrinhoInfo = document.querySelector(".carrinho-info")
let h3 = document.createElement("h3")
h3.id = "total"
h3.innerText = `Preço total: R$ ${total}`
carrinhoInfo.appendChild(h3)
let h2 = document.createElement("h2")
h2.id = "quantidadeDeProdutos"
h2.innerText = `QTD de produto: ${quantidadeProdutos}`
carrinhoInfo.appendChild(h2)




let inputBusca = document.querySelector("input")
let btnBusca = document.querySelector(".busca")

btnBusca.addEventListener("click", function () {
    let pesquisaUsuario = inputBusca.value
    let resultadoBusca = busca(pesquisaUsuario)
    card(resultadoBusca, lista)

    inputBusca.value = ""

})

function busca(valorPesquisa) {
    let result = []
    for (let i = 0; i < data.length; i++) {
        if (data[i].nameItem.toLowerCase().includes(valorPesquisa.toLowerCase())) {
            result.push(data[i])
        }
    }

    return result
}


let nav = document.querySelector("nav")

nav.addEventListener("click", filtro)


function filtro(evt) {
    evt.preventDefault()
    let filtroNav = evt.target
    if (filtroNav.tagName == "A") {
        if (filtroNav.id == "Acessórios") {
            buscaFiltro(filtroNav.id)
        } else if (filtroNav.id == "Camisetas") {
            buscaFiltro(filtroNav.id)
        } else if (filtroNav.id == "Todos") {
            card(data, lista)
        } 
        else  { 
            alert("Infelizmente não temos esse produto no estoque!")
    }

}

}

function buscaFiltro(valorPesquisa) {
    let result = []
    for (let i = 0; i < data.length; i++) {
        if (data[i].tag.includes(valorPesquisa)) {
            result.push(data[i])
        }
    }

    card(result, lista)

}