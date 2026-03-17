import { getVendas } from '../get.js';

listarVendas();

async function listarVendas(){
    const vendas = await getVendas();

    const containerVendas = document.getElementById('vendas');
    vendas.forEach((venda) => {
        const card = gerarCardVenda(venda);
        containerVendas.appendChild(card);
    });

}

function gerarCardVenda(venda) {
    const card = document.createElement('section');
    card.className = 'venda-card';
    card.innerHTML = `
        <h3 class="venda-titulo">Venda ${venda.mae}</h3>
        <div class="venda-row"><span>Valor:</span><strong>R$ ${parseFloat(venda.valor).toFixed(2)}</strong></div>
        <div class="venda-row"><span>Data:</span><strong>${new Date(venda.data).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</strong></div>
        <div class="venda-row"><span>Local:</span><strong>${venda.local}</strong></div>
        <div class="venda-row"><span>Gastos:</span><strong>R$ ${parseFloat(venda.gastos).toFixed(2)}</strong></div>
        <div class="venda-row"><span>Descrição gastos:</span><em>${venda.descricaoGastos}</em></div>
    `;
    return card;
}