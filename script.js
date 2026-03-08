import { entrar } from "./controler/teste.js";
import { verificar } from "./controler/verificar.js";
import { selectSetores } from "./controler/selectSetores.js";
import { setores, array } from "./controler/getTabelas.js";
import { cadastarSetor, salvarSetor } from "./controler/cadastrarSetor.js";
import { popularMeiosPagamento } from "./controler/popularSelectMPag.js";
import { salvarItem } from "./controler/salvarItem.js";

verificar();
selectSetores(setores, array);
popularMeiosPagamento();

const btEntrar = document.getElementById("btEntrar");
btEntrar.addEventListener("click", ()=>entrar());

const btCadastarSetor = document.getElementById("btCadastarSetor");
btCadastarSetor.addEventListener("click", function (){cadastarSetor();})

const btCadastarSetor_salvar=document.getElementById("cadastarSetor-salvar");
btCadastarSetor_salvar.addEventListener("click", function (){salvarSetor(setores);})

document.getElementById("btCadastrarDep").addEventListener("click", function(){
    sessionStorage.setItem('valorSetorSelecionado', document.getElementById("selectSetor").value);
})


document.getElementById("formCadastrar").addEventListener("submit", function(event) {
    event.preventDefault();
    salvarItem();
});
