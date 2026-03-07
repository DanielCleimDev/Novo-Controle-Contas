export function verificar(){
    if(document.cookie == "500407b4e88dab4b8e487fabd12aab814bb2ff5561517eb839a3fe82d8455cd1"){
        document.getElementById("login").style.display = "none";
        document.getElementById("cadastrar").style.display = "flex";
    }
}