import venda from '../../model/venda.js';
import { listarVendas } from './listarVendas.js';

const vendaForm = document.getElementById('vendaForm');
const mensagem = document.getElementById('mensagem');

vendaForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const item = {
    valor: Number(document.getElementById('valor').value),
    mae: document.getElementById('mae').value.trim(),
    data: document.getElementById('data').value,
    local: document.getElementById('local').value,
    gastos: Number(document.getElementById('gastos').value),
    descricaoGastos: document.getElementById('descricaoGastos').value,
  };

  function validarVenda(v) {
    if (isNaN(v.valor) || v.valor <= 0) return 'Valor deve ser maior que zero.';
    if (!v.mae) return 'Informe o nome da mãe.';
    if (!v.data) return 'Informe a data da venda.';
    if (!v.local) return 'Informe o local da venda.';
    if (isNaN(v.gastos) || v.gastos < 0) return 'Gastos deve ser um número maior ou igual a zero.';
    if (!v.descricaoGastos) return 'Informe a descrição dos gastos.';
    return null;
  }

  const erro = validarVenda(item);
  if (erro) {
    mensagem.textContent = erro;
    mensagem.className = 'error';
    return;
  }

  mensagem.textContent = 'Venda salva com sucesso!';
  mensagem.className = 'message';
  vendaForm.reset();

  const objVenda = new venda(item.valor, item.mae, item.data, item.local, item.gastos, item.descricaoGastos);
  objVenda.insert();

  setTimeout(() => {
    mensagem.textContent = '';
  }, 2500);
});

