import NovoSetor from "../model/novoSetor.js";
export function cadastarSetor(){
    document.getElementById("cadastrarSetor").style.display= "flex";
    document.getElementById("cadastrar").style.display= "none";   
}

export function salvarSetor(arraySetores){
    const novoSetor = document.getElementById("cadastrarSetor-setor");
    document.getElementById("cadastrar").style.display= "flex";
    document.getElementById("cadastrarSetor").style.display= "none";
    if(arraySetores.some(item => item.toLowerCase() === novoSetor.value.toLowerCase())){
        alert("O setor Já Existe")
    }else{
        const obNovoSetor = new NovoSetor(novoSetor.value, arraySetores);
        obNovoSetor.insert();
    }
}

