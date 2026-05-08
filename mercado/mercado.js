import { dados } from "../controler/getTabelas.js";
import { gerarCard } from "../controler/listar/gerarCard.js";
import { atualizarTotal } from "../controler/listar/total.js";

const listar = document.getElementById("itens");
const btDiminuir = document.getElementById("diminuir");
const btAumentar = document.getElementById("aumentar");

let total = 0;
let data = new Date();

atualizarLista();

function atualizarLista() {
    listar.replaceChildren();
    total = 0;
    let dadosSemana = filtrarPorSemana(data, dados);
    dadosSemana.forEach(item => {
        total += parseInt(item.valor);
        listar.appendChild(gerarCard(item.id, item.descricao, item.valor, item.departamento, item.setor, item.data, item.meioPagamento))
    });
    atualizarTotal(total, `Total da Semana`);
}

btDiminuir.addEventListener("click", () => {
    data.setDate(data.getDate() - 7);
    atualizarLista();
});

btAumentar.addEventListener("click", () => {
    data.setDate(data.getDate() + 7);
    atualizarLista();
});

function parseData(dataStr) {
  const [ano, mes, dia] = dataStr.split('-');
  return new Date(ano, mes - 1, dia); // local
}

function filtrarPorSemana(dataReferencia, lista) {
  const data = dataReferencia instanceof Date
    ? dataReferencia
    : parseData(dataReferencia);

  const diaSemana = data.getDay();

  const inicioSemana = new Date(data);
  inicioSemana.setDate(data.getDate() - (diaSemana === 0 ? 6 : diaSemana - 1));
  inicioSemana.setHours(0, 0, 0, 0);

  const fimSemana = new Date(inicioSemana);
  fimSemana.setDate(inicioSemana.getDate() + 6);
  fimSemana.setHours(23, 59, 59, 999);

  lista = lista.filter(item => item.departamento == "Mercado");

  return lista.filter(item => {
    const dataItem = parseData(item.data);
    return dataItem >= inicioSemana && dataItem <= fimSemana;
  }).sort((a, b) => new Date(b.data) - new Date(a.data));
}