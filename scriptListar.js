import { array } from "./controler/getTabelas.js";

let idsParaRemover = ["CasaDep","CarroDep","teste",	"tabelaSetor",	"CanilDep",	"meiosPagamento"]
const listar = document.getElementById("itens");
let arrayFiltrado= array.filter(item => !idsParaRemover.includes(item.id));

arrayFiltrado.forEach(item => {
    listar.appendChild(gerarCard(item.id, item.descricao, item.valor, item.departamento, item.setor, item.data, item.meioPagamento))
});

function gerarCard(id,descricao,valor,departamento,setor,data,meioPagamento){
    const dataFormatada = new Date(data).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    let html = `
        <h3>Detalhes do Gasto</h3>
        <dl>
            <dt>Descrição</dt>
            <dd>${descricao}</dd>
    
            <dt>Valor</dt>
            <dd>R$ ${valor}</dd>
    
            <dt>Departamento / Setor</dt>
            <dd>${departamento} (${setor})</dd>
    
            <dt>Data</dt>
            <dd><time datetime="${data}">${dataFormatada}</time></dd>
    
            <dt>Meio de Pagamento</dt>
            <dd>${meioPagamento}</dd>
        </dl>
    `;

    const card = document.createElement("article")
    card.classList.add("despesa-card")
    card.id = id;
    card.innerHTML = html;
    return card;
}
