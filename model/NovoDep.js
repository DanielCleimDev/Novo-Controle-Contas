import { salvar } from "../controler/salvar.js";

export default class NovoDep{
    constructor(setor, array, departamento){
        this.id = setor + "Dep";
        this.departamento = departamento;
        this.array = array;
    }

    insert(){
        let arrayDep = this.array.find(item => item.id === this.id).departamentos;
        arrayDep.push(this.departamento)
        let setorDep = {
            id: this.id,
            departamentos: arrayDep
        }
        
        salvar(setorDep);
    }
}