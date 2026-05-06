import { dados } from "../controler/getTabelas.js";
import { gerarCard } from "../controler/listar/gerarCard.js";
import { atualizarTotal } from "../controler/listar/total.js";

const listar = document.getElementById("itens");
let total = 0;
let dadosSemana = filtrarPorSemana(new Date(), dados);

dadosSemana.forEach(item => {
    total += parseInt(item.valor);
    listar.appendChild(gerarCard(item.id, item.descricao, item.valor, item.departamento, item.setor, item.data, item.meioPagamento))
});
atualizarTotal(total, `Total da Semana`);


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

  return lista.filter(item => {
    const dataItem = parseData(item.data);
    return dataItem >= inicioSemana && dataItem <= fimSemana;
  });
}