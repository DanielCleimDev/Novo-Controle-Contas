
export function selectSetores(setores, array){
    let comDepartamento = false;
    const selectSetor = document.getElementById("selectSetor");
    const selectDep = document.getElementById("selectDep");
    
    atualizarSetores(setores)
    
    selectSetor.addEventListener("change", function() {
        if(comDepartamento){
            selectDep.options.length = 0;
            comDepartamento = false;
        }
        atualizarDepartamentos(array);
        comDepartamento = true;
    })
}

export function atualizarSetores(setores){
    setores.forEach(element => {
        const option = document.createElement("option");
        option.value = element;
        option.textContent = element;
        document.getElementById("selectSetor").appendChild(option);
    });
}

export function atualizarDepartamentos(array){
    array.find(item => item.id === (document.getElementById("selectSetor").value + "Dep")).departamentos.forEach(element => {
        const option = document.createElement("option");
        option.value = element;
        option.textContent = element;
        document.getElementById("selectDep").appendChild(option);
    })
}