export function verificar(){
    const teste = "500407b4e88dab4b8e487fabd12aab814bb2ff5561517eb839a3fe82d8455cd1"
    if(document.cookie == teste || localStorage.getItem("entrarNovoControle") == teste){
        document.getElementById("login").style.display = "none";
        document.getElementById("cadastrar").style.display = "flex";
        document.querySelector(".listar").style.display = "block";
    }
}