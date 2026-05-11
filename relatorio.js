import { dados } from "./controler/getTabelas.js";

// Elementos do DOM
const listaCorpo = document.getElementById('lista-corpo');
const filterSetor = document.getElementById('filter-setor');
const filterDepto = document.getElementById('filter-departamento');
const filterMes = document.getElementById('filter-mes');
const totalValorDisplay = document.getElementById('total-valor');
const totalTransacoesDisplay = document.getElementById('total-transacoes');

// Inicialização
function init() {
    popularFiltros();
    renderizar(dados);
    
    // Listeners
    [filterSetor, filterDepto, filterMes].forEach(el => {
        el.addEventListener('change', aplicarFiltros);
    });
}

function popularFiltros() {
    const setores = [...new Set(dados.map(d => d.setor))];
    const deptos = [...new Set(dados.map(d => d.departamento))];

    setores.forEach(s => filterSetor.innerHTML += `<option value="${s}">${s}</option>`);
    deptos.forEach(d => filterDepto.innerHTML += `<option value="${d}">${d}</option>`);
}

function aplicarFiltros() {
    const setorVal = filterSetor.value;
    const deptoVal = filterDepto.value;
    const mesVal = filterMes.value;

    const filtrados = dados.filter(item => {
        const dataObj = new Date(item.data);
        const mesItem = (dataObj.getUTCMonth() + 1).toString().padStart(2, '0');

        const matchSetor = setorVal === 'all' || item.setor === setorVal;
        const matchDepto = deptoVal === 'all' || item.departamento === deptoVal;
        const matchMes = mesVal === 'all' || mesItem === mesVal;

        return matchSetor && matchDepto && matchMes;
    });

    renderizar(filtrados);
}

function renderizar(lista) {
    listaCorpo.innerHTML = "";
    let somaTotal = 0;

    lista.sort((a, b) => new Date(b.data) - new Date(a.data));

    lista.forEach(item => {
        const valorNumerico = parseFloat(item.valor);
        somaTotal += valorNumerico;

        const row = `
            <tr>
                <td>${formatarData(item.data)}</td>
                <td><strong>${item.descricao}</strong></td>
                <td><span class="badge">${item.departamento}</span></td>
                <td><small>${item.meioPagamento}</small></td>
                <td>${item.setor}</td>
                <td class="text-right valor-cell">R$ ${valorNumerico.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
            </tr>
        `;
        listaCorpo.innerHTML += row;
    });

    totalValorDisplay.innerText = `R$ ${somaTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`;
    totalTransacoesDisplay.innerText = lista.length;
}

function formatarData(dataString) {
    const [ano, mes, dia] = dataString.split('-');
    return `${dia}/${mes}/${ano}`;
}

init();