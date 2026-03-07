import { salvar } from "../controler/salvar.js";

export default class NovoSetor{
    constructor(nome, arraySetores){
        this.idSetor = "tabelaSetor";
        this.departamento = nome+"Dep";
        this.nome = nome;
        this.arraySetores = arraySetores;
    }

    insert(){
        this.arraySetores.push(this.nome);
        let novoSetor = {
            id: this.idSetor,
            setores: this.arraySetores
        }
        salvar(novoSetor);

        let novoDep = {
            id: this.departamento,
            departamentos: []
        }
        salvar(novoDep);
        location.reload();
    }
}