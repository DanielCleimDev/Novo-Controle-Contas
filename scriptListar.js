import { dados, setores,array } from "./controler/getTabelas.js";
import { gerarCard } from "./controler/listar/gerarCard.js";
import { atualizarTotal } from "./controler/listar/total.js";

const listar = document.getElementById("itens");
const pTotal = document.getElementById("total");
let dadosFiltrados = dados;
let dadosAno = null;
let dadosMes = null;
let total = 0;

dados.sort((a, b) => new Date(b.data) - new Date(a.data));
dados.forEach(item => {
    total += parseInt(item.valor);
    listar.appendChild(gerarCard(item.id, item.descricao, item.valor, item.departamento, item.setor, item.data, item.meioPagamento))
});
atualizarTotal(total, `Soma: `);

anosMeses()

function limparFiltros(){
    dadosFiltrados = dados;
    dadosAno = null;
    dadosMes = null;
    document.getElementById("selectAnos").style.display = "";
    document.getElementById("labelAnos").style.display = "";

    listar.replaceChildren();
    atualizarTotal(0, `Soma `);
    
    document.getElementById("selectAnos").value = "Selecione o Ano";
    if(document.getElementById("labelMeses")){
        document.getElementById("labelMeses").remove();
    }
    if(document.getElementById("selectMeses")){
        document.getElementById("selectMeses").remove();
    }

    document.getElementById("labelSetor").style.display = "none";
    document.getElementById("setores").style.display = "none"; 

    document.getElementById("setores").value = "Selecione o Setor";
    if(document.getElementById("labelDepartamentos")){
        document.getElementById("labelDepartamentos").remove();
    }
    if(document.getElementById("selectDepartamentos")){
        document.getElementById("selectDepartamentos").remove();
    }
    selecionado = false;
}

document.getElementById("btnLimpar").addEventListener("click", limparFiltros); 

function anosMeses(){
    document.getElementById("labelSetor").style.display = "none";
    document.getElementById("setores").style.display = "none";  

    const sectionAnosMeses = document.getElementById("anosMeses");
    
    const labelAnos = document.createElement("label");
    labelAnos.id = "labelAnos";
    labelAnos.textContent = "Ano: ";
    sectionAnosMeses.appendChild(labelAnos);
    
    const selectAnos = document.createElement("select");
    selectAnos.id = "selectAnos";
    selectAnos.innerHTML = "<option selected>Selecione o Ano</option>";
    
    //Gerando Anos
    [...new Set(dadosFiltrados.map(item => item.data.split('-')[0]))].forEach(ano =>{
        const option = document.createElement("option");
        option.value = ano;
        option.textContent = ano;
        selectAnos.appendChild(option);
    })

    sectionAnosMeses.appendChild(selectAnos);

    let anoSelecionado = false;
    selectAnos.addEventListener("change", function(){
        document.getElementById("labelSetor").style.display = "";
        document.getElementById("setores").style.display = ""; 

        selectAnos.style.display = "none";
        labelAnos.style.display = "none";
        
        const labelMeses = document.createElement("label")
        labelMeses.id = "labelMeses";
        labelMeses.textContent = "Mês: ";
        sectionAnosMeses.appendChild(labelMeses);
    
        const selectMeses = document.createElement("select");
        selectMeses.id = "selectMeses";

        selectMeses.innerHTML = "<option selected>Selecione o Mês</option>";

        dadosAno = dadosFiltrados.filter(item => item.data.split('-')[0] == this.value);

        const listar = document.getElementById("itens")
        listar.replaceChildren();

        //Calculando o total do ano selecionado
        let totalAno = 0;
            dadosAno.forEach(item =>{
            totalAno += parseInt(item.valor);
            //Populando a lista com os itens do ano selecionado
            listar.appendChild(gerarCard(item.id, item.descricao, item.valor, item.departamento, item.setor, item.data, item.meioPagamento))
        })
        atualizarTotal(totalAno, `Total: `);
        
        
        //Gerando os meses do ano selecionado
        let meses =[...new Set(dadosAno.map(item => item.data.split('-')[1]))]
        
        meses.forEach(item =>{
            const option = document.createElement("option");
            option.value = item;
            option.textContent = item;
            selectMeses.appendChild(option);
        })
        sectionAnosMeses.appendChild(selectMeses);

        
        anoSelecionado = true;
        
        document.getElementById("selectMeses").addEventListener("change", function(){
            //Filtrando os itens do mês selecionado
            if(document.getElementById("selectDepartamentos")){
                document.getElementById("selectDepartamentos").value = "Selecione um Departamento";
            }
            dadosMes = dadosAno.filter(item => item.data.split('-')[1] == this.value);
            listar.replaceChildren();
            
            if(dadosMes.length >= 1){
                let totalMes = 0;
                //Populando a lista com os itens do mês selecionado                                
                dadosMes.forEach(item => {
                    totalMes += parseInt(item.valor);
                    listar.appendChild(gerarCard(item.id, item.descricao, item.valor, item.departamento, item.setor, item.data, item.meioPagamento))
                });
                atualizarTotal(totalMes, `Total: `);
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

    if (dadosMes){
        dadosFiltrados = dadosMes;
        dadosFiltrados = dadosFiltrados.filter(item => item.setor == this.value);
        dadosAno = dadosAno.filter(item => item.setor == this.value);
    }else if(dadosAno){
        dadosFiltrados = dadosAno;
        dadosFiltrados = dadosFiltrados.filter(item => item.setor == this.value);
    }else{
        dadosFiltrados = dados.filter(item => item.setor == this.value);
    }

    listar.replaceChildren();

    if(dadosFiltrados.length >= 0 ){
        let totalSetor = 0;
        dadosFiltrados.forEach(item => {
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
        label.id = "labelDepartamentos";
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
        let dadosDepartamento = dadosFiltrados.filter(item => item.departamento == this.value && item.setor == document.getElementById("setores").value);
        listar.replaceChildren();
        let totalDepartamento = 0;
        if(dadosDepartamento.length >= 1){
            dadosDepartamento.forEach(item => {
                totalDepartamento += parseInt(item.valor);
                listar.appendChild(gerarCard(item.id, item.descricao, item.valor, item.departamento, item.setor, item.data, item.meioPagamento))
            });
        }
        atualizarTotal(totalDepartamento, `Total: `);
    })

    selecionado = true;


})


