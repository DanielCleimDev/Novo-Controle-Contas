import Item from "../model/item.js";

export function salvarItem(){
    const valorInput = document.getElementById("valor");
    const descricaoInput = document.getElementById("descricao");
    const dataInput = document.getElementById("data");
    const setorSelect = document.getElementById("selectSetor");
    const depSelect = document.getElementById("selectDep");
    const meioPagamentoSelect = document.getElementById("meioPagamento");

    if(valorInput.value.trim() !== '' && descricaoInput.value.trim() !== '' &&
        dataInput.value.trim() !== ''&& setorSelect.value!== '' && 
        depSelect.value!== '' && meioPagamentoSelect.value!== ''){
            const objItem = new Item(valorInput.value, descricaoInput.value, dataInput.value, setorSelect.value, depSelect.value, meioPagamentoSelect.value);
            objItem.insert();
            
            valorInput.value ="";
            descricaoInput.value="";
            dataInput.value=""
            setorSelect.value="";
            depSelect.value="";
            meioPagamentoSelect.value="";
        }else{
            alert("É necessário preencher todos os campos!")
        }
}