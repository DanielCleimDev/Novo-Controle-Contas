import venda from './model/venda.js';

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

  
  mensagem.textContent = 'Venda salva com sucesso!';
  mensagem.className = 'message';
  vendaForm.reset();

  const objVenda = new venda(item.valor, item.mae, item.data, item.local, item.gastos, item.descricaoGastos);
  objVenda.insert();

  setTimeout(() => {
    mensagem.textContent = '';
  }, 2500);
});

