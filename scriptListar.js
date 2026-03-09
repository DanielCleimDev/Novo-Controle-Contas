import { dados, setores,array } from "./controler/getTabelas.js";
import { gerarCard } from "./controler/listar/gerarCard.js";

const listar = document.getElementById("itens");

dados.forEach(item => {
    listar.appendChild(gerarCard(item.id, item.descricao, item.valor, item.departamento, item.setor, item.data, item.meioPagamento))
});


const selectSetores = document.getElementById("setores")

setores.forEach(element =>{
    const option = document.createElement("option");
    option.value = element;
    option.textContent = element;
    selectSetores.appendChild(option);
})


selectSetores.addEventListener("change", function (){
    const sectionFiltro = document.getElementById("filtro");

    const label = document.createElement("label");
    label.textContent = "Departamentos";
    sectionFiltro.appendChild(label);

    const selectDepartamentos = document.createElement("select");
    selectDepartamentos.id = "selectDepartamentos";
    
    array.find(item => item.id === (document.getElementById("setores").value + "Dep")).departamentos.forEach(element => {
        const option = document.createElement("option");
        option.value = element;
        option.textContent = element;
        selectDepartamentos.appendChild(option);
    })

    sectionFiltro.appendChild(selectDepartamentos);
})