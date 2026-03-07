import { get } from "./get.js";

let array = await get();
let setores = array.find(item => item.id === "tabelaSetor").setores;
let meiosPagamento = array.find(item => item.id === "meiosPagamento")?.meiosPagamento ?? 1;

sessionStorage.setItem('array', JSON.stringify(array));
sessionStorage.setItem('setores', JSON.stringify(setores));
sessionStorage.setItem('meiosPagamento', JSON.stringify(meiosPagamento));

async function atualizarTabelas(){
    array = await get();
    setores = array.find(item => item.id === "tabelaSetor").setores;
    
    sessionStorage.setItem('array', JSON.stringify(array));
    sessionStorage.setItem('setores', JSON.stringify(setores));
}
export {setores, array, atualizarTabelas }

