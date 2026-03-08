import { salvarNovoItem } from "../controler/salvarNovoItem";


export default class Item{
    constructor(valor, descricao, data,  setor, departamento, meioPagamento){
        this.id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
        this.valor =  valor;
        this.descricao = descricao;
        this.data = data;
        this.setor =setor;
        this.departamento = departamento;
        this.meioPagamento = meioPagamento;
    }

    insert(){
        let item = {
            id: this.id,
            valor: this.valor,
            descricao: this.descricao,
            data: this.data,
            setor: this.setor,
            departamento: this.departamento,
            meioPagamento: this.meioPagamento
        }
        salvarNovoItem(item);
    }
}