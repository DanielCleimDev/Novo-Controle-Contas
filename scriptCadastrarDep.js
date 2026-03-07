import NovoDep from "./model/NovoDep.js";

document.getElementById("cadastarDep-salvar").addEventListener("click", function (){
    let setor = sessionStorage.getItem('valorSetorSelecionado')
    let array = JSON.parse(sessionStorage.getItem('array'));
    const inputCadastrarDep_Dep = document.getElementById("cadastrarDep-Dep");
    
    const objNovoDep = new NovoDep(setor, array, inputCadastrarDep_Dep.value);
    objNovoDep.insert();
    alert("Departamento " + inputCadastrarDep_Dep.value + "\nSalvo com sucesso!")
    location.href= "index.html";
})