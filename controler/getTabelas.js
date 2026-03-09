import { get, getDados } from "./get.js";

let array = await get();
let setores = array.find(item => item.id === "tabelaSetor").setores;
let meiosPagamento = array.find(item => item.id === "meiosPagamento")?.meiosPagamento ?? 1;
let dados = await getDados();

sessionStorage.setItem('dados', JSON.stringify(dados));
sessionStorage.setItem('array', JSON.stringify(array));
sessionStorage.setItem('setores', JSON.stringify(setores));
sessionStorage.setItem('meiosPagamento', JSON.stringify(meiosPagamento));

async function atualizarTabelas(){
    array = await get();
    dados = await getDados();
    setores = array.find(item => item.id === "tabelaSetor").setores;
    
    sessionStorage.setItem('array', JSON.stringify(array));
    sessionStorage.setItem('setores', JSON.stringify(setores));
    sessionStorage.setItem('dados', JSON.stringify(dados));
}
export {setores, array, dados, atualizarTabelas }

