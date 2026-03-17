import { salvarTabela } from "../controler/salvarTabela.js";

export default class venda{
    constructor(valor, mae, data, local, gastos, descricaoGastos){
        this.id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
        this.valor =  valor;
        this.mae = mae;
        this.data = data;
        this.local = local;
        this.gastos = gastos;
        this.descricaoGastos = descricaoGastos;
    }

    insert(){
        let item = {
            id: this.id,
            valor: this.valor,
            mae: this.mae,
            data: this.data,
            local: this.local,
            gastos: this.gastos,
            descricaoGastos: this.descricaoGastos
        }
        salvarTabela(item, "vendas");
    }
}