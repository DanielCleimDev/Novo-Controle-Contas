import NovoMeioPagamento from "./model/NovoMeioPagamento.js"

let btSalvar = document.getElementById("cadastrarMeioPagamento_salvar")
let inputCadastrarMeioPagamento_valor = document.getElementById("cadastrarMeioPagamento_valor")

btSalvar.addEventListener("click", function (){
    const objNovoMeioPagamento = new NovoMeioPagamento(inputCadastrarMeioPagamento_valor.value, JSON.parse(sessionStorage.getItem('meiosPagamento')));
    objNovoMeioPagamento.insert()
    alert("Meio de Pagamento Salvo Com Sucesso")
    location.href= "index.html";
})