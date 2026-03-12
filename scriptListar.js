import { dados, setores,array } from "./controler/getTabelas.js";
import { gerarCard } from "./controler/listar/gerarCard.js";
import { atualizarTotal } from "./controler/listar/total.js";

const listar = document.getElementById("itens");
const pTotal = document.getElementById("total");
let total = 0;

dados.sort((a, b) => new Date(b.data) - new Date(a.data));
dados.forEach(item => {
    total += parseInt(item.valor);
    listar.appendChild(gerarCard(item.id, item.descricao, item.valor, item.departamento, item.setor, item.data, item.meioPagamento))
});
pTotal.textContent = `Total: R$ ${total.toFixed(2)}`;

anosMeses()

function anosMeses(){
    const sectionAnosMeses = document.getElementById("anosMeses");
    
    //Gerando Anos
    const labelAnos = document.createElement("label");
    labelAnos.textContent = "Ano: ";
    sectionAnosMeses.appendChild(labelAnos);
    
    const selectAnos = document.createElement("select");
    selectAnos.id = "selectAnos";
    selectAnos.innerHTML = "<option selected>Selecione o Ano</option>";

    [...new Set(dados.map(item => item.data.split('-')[0]))].forEach(ano =>{
        const option = document.createElement("option");
        option.value = ano;
        option.textContent = ano;
        selectAnos.appendChild(option);
    })

    sectionAnosMeses.appendChild(selectAnos);

    let anoSelecionado = false;
    selectAnos.addEventListener("change", function(){
        const labelMeses = document.createElement("label")
        labelMeses.textContent = "Mês: ";
        sectionAnosMeses.appendChild(labelMeses);
    
        const selectMeses = document.createElement("select");
        selectMeses.id = "selectMeses";

        selectMeses.innerHTML = "<option selected>Selecione o Mês</option>";

        const anos = dados.filter(item => item.data.split('-')[0] == this.value);

        const listar = document.getElementById("itens")
        listar.replaceChildren();

        //Calculando o total do ano selecionado
        let totalAno = 0;
            anos.forEach(item =>{
            totalAno += parseInt(item.valor);
            listar.appendChild(gerarCard(item.id, item.descricao, item.valor, item.departamento, item.setor, item.data, item.meioPagamento))
        })
        atualizarTotal(totalAno, `Total do Ano: `);
        
        

        let meses =[...new Set(anos.map(item => item.data.split('-')[1]))]
        
        meses.forEach(item =>{
            const option = document.createElement("option");
            option.value = item;
            option.textContent = item;
            selectMeses.appendChild(option);
        })
        sectionAnosMeses.appendChild(selectMeses);

        
        anoSelecionado = true;
        
        document.getElementById("selectMeses").addEventListener("change", function(){
            const dadosMeses = dados.filter(item => item.data.split('-')[1] == this.value);
            listar.replaceChildren();
            
            if(dadosMeses.length >= 1){
                let totalMes = 0;
                                
                dadosMeses.forEach(item => {
                    totalMes += parseInt(item.valor);
                    listar.appendChild(gerarCard(item.id, item.descricao, item.valor, item.departamento, item.setor, item.data, item.meioPagamento))
                });
                atualizarTotal(totalMes, `Total do Mês: `);
            }
        });
    })

}

const selectSetores = document.getElementById("setores")

setores.forEach(element =>{
    const option = document.createElement("option");
    option.value = element;
    option.textContent = element;
    selectSetores.appendChild(option);
})

let selecionado = false;
selectSetores.addEventListener("change", function (){

    const dadosSetor = dados.filter(item => item.setor == this.value);
    listar.replaceChildren();

    if(dadosSetor.length >= 0 ){
        let totalSetor = 0;
        dadosSetor.forEach(item => {
            totalSetor += parseInt(item.valor);
            listar.appendChild(gerarCard(item.id, item.descricao, item.valor, item.departamento, item.setor, item.data, item.meioPagamento))
        });
        atualizarTotal(totalSetor, `Total do Setor: `);
    }
    
    const sectionFiltro = document.getElementById("filtro");
    
    if(selecionado){
        document.getElementById("selectDepartamentos").remove();
    }else{
        const label = document.createElement("label");
        label.textContent = "Departamentos";
        sectionFiltro.appendChild(label);
    }

    const selectDepartamentos = document.createElement("select");
    selectDepartamentos.id = "selectDepartamentos";
    selectDepartamentos.innerHTML = "<option selected>Selecione um Departamento</option>";
    
    array.find(item => item.id === (document.getElementById("setores").value + "Dep")).departamentos.forEach(element => {
        const option = document.createElement("option");
        option.value = element;
        option.textContent = element;
        selectDepartamentos.appendChild(option);
    })
    sectionFiltro.appendChild(selectDepartamentos);
    
    document.getElementById("selectDepartamentos").addEventListener("change", function () {
        const dadosDepartamento = dados.filter(item => item.departamento == this.value && item.setor == document.getElementById("setores").value);
        listar.replaceChildren();
        if(dadosDepartamento.length >= 1){
            let totalDepartamento = 0;
            dadosDepartamento.forEach(item => {
                totalDepartamento += parseInt(item.valor);
                listar.appendChild(gerarCard(item.id, item.descricao, item.valor, item.departamento, item.setor, item.data, item.meioPagamento))
            });
            atualizarTotal(totalDepartamento, `Total do Departamento: `);
        }
    })

    selecionado = true;


})


