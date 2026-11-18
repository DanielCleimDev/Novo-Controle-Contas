import { getVendas } from '../get.js';

let todasAsVendas = [];
let offsetMes = null; 

iniciar();

async function iniciar() {
    todasAsVendas = await getVendas();
    todasAsVendas.sort((a, b) => new Date(b.data) - new Date(a.data));
    renderizarTela();
}

// Função auxiliar para formatar números sem casas decimais e com pontos (ex: 5000 -> 5.000)
function formatarMoeda(valor) {
    return Number(valor).toLocaleString('pt-BR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

function obterInfoMes(offset) {
    const dataAtual = new Date();
    const dataAlvo = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + offset, 1);
    
    const nomeMes = dataAlvo.toLocaleDateString('pt-BR', { month: 'long' });
    const ano = dataAlvo.getFullYear();
    const mesIndex = dataAlvo.getMonth();

    const label = ano !== dataAtual.getFullYear() 
        ? `${nomeMes}/${ano}` 
        : nomeMes;

    return { label, mes: mesIndex, ano };
}

function renderizarControles() {
    const headerFiltro = document.getElementById('filtro-mes');
    headerFiltro.innerHTML = '';

    if (offsetMes === null) {
        const infoMesAtual = obterInfoMes(0);
        headerFiltro.innerHTML = `
            <button id="btn-esquerda" class="btn-seta">
                &#8592; ${infoMesAtual.label}
            </button>
            <span class="titulo-filtro-atual">Todas as Vendas</span>
        `;

        document.getElementById('btn-esquerda').addEventListener('click', () => {
            offsetMes = 0;
            renderizarTela();
        });

    } else {
        const infoMesSelecionado = obterInfoMes(offsetMes);
        const infoMesAnterior = obterInfoMes(offsetMes - 1);
        const textoDireita = offsetMes === 0 
            ? 'Todos os dados' 
            : obterInfoMes(offsetMes + 1).label;

        headerFiltro.innerHTML = `
            <button id="btn-esquerda" class="btn-seta">
                &#8592; ${infoMesAnterior.label}
            </button>
            
            <span class="titulo-filtro-atual">${infoMesSelecionado.label}</span>
            
            <button id="btn-direita" class="btn-seta">
                ${textoDireita} &#8594;
            </button>
        `;

        document.getElementById('btn-esquerda').addEventListener('click', () => {
            offsetMes -= 1;
            renderizarTela();
        });

        document.getElementById('btn-direita').addEventListener('click', () => {
            if (offsetMes === 0) {
                offsetMes = null;
            } else {
                offsetMes += 1;
            }
            renderizarTela();
        });
    }
}

function renderizarTela() {
    renderizarControles();

    const totalElement = document.getElementById('total');
    const containerVendas = document.getElementById('vendas');
    containerVendas.innerHTML = '';

    let vendasFiltradas = todasAsVendas;

    if (offsetMes !== null) {
        const { mes, ano } = obterInfoMes(offsetMes);
        vendasFiltradas = todasAsVendas.filter((venda) => {
            const dataVenda = new Date(venda.data);
            return dataVenda.getUTCMonth() === mes && dataVenda.getUTCFullYear() === ano;
        });
    }

    const valorTotal = vendasFiltradas.reduce((acc, venda) => acc + parseFloat(venda.valor), 0);
    const tituloTotal = offsetMes === null 
        ? 'Total de Vendas' 
        : `Total (${obterInfoMes(offsetMes).label})`;

    // Aplicando a formatação sem vírgula no total
    totalElement.innerHTML = `<h2>${tituloTotal}: R$ ${formatarMoeda(valorTotal)}</h2>`;

    if (vendasFiltradas.length === 0) {
        containerVendas.innerHTML = '<p>Nenhuma venda registrada neste período.</p>';
        return;
    }

    vendasFiltradas.forEach((venda) => {
        const card = gerarCardVenda(venda);
        containerVendas.appendChild(card);
    });
}

function gerarCardVenda(venda) {
    const card = document.createElement('section');
    card.className = 'venda-card';
    card.innerHTML = `
        <h3 class="venda-titulo">Venda ${venda.mae}</h3>
        <div class="venda-row"><span>Valor:</span><strong>R$ ${formatarMoeda(venda.valor)}</strong></div>
        <div class="venda-row"><span>Data:</span><strong>${new Date(venda.data).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</strong></div>
        <div class="venda-row"><span>Local:</span><strong>${venda.local}</strong></div>
        <div class="venda-row"><span>Gastos:</span><strong>R$ ${formatarMoeda(venda.gastos)}</strong></div>
        <div class="venda-row"><span>Descrição gastos:</span><em>${venda.descricaoGastos}</em></div>
    `;
    return card;
}