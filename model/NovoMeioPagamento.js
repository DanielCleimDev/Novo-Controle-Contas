import { salvar } from "../controler/salvar.js";

export default class NovoMeioPagamento{
    constructor(meioPagamento, meiosPagamento = []){
        this.id = "meiosPagamento";
        this.meioPagamento = meioPagamento;
        this.meiosPagamento = meiosPagamento;
    }

    insert(){
        

        if(this.meiosPagamento == 1){
            this.meiosPagamento = [];
            this.meiosPagamento.push(this.meioPagamento)
        }else{
            this.meiosPagamento.push(this.meioPagamento);
        }
        let itemMeioPagamento = {
            id: this.id,
            meiosPagamento: this.meiosPagamento
        }
        
        salvar(itemMeioPagamento);
    }
}