async function teste(mensagem){
    const msgBuffer = new TextEncoder().encode(mensagem);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function entrar(){
    const usuario = document.getElementById("usuario");
    const senha = document.getElementById("senha");
    const testeH = "500407b4e88dab4b8e487fabd12aab814bb2ff5561517eb839a3fe82d8455cd1";
    await teste(usuario.value + " " + senha.value).then(hash => {
            document.cookie = hash + "; path=/; SameSite=Lax; Secure";
            localStorage.setItem("entrarNovoControle", hash);
        });

    if(document.cookie == testeH || localStorage.getItem("entrarNovoControle") == testeH){
        alert("Usuário Logado");
        document.getElementById("login").style.display = "none";
        document.getElementById("cadastrar").style.display = "flex";
    }else{
        alert("Senha ou Usuário incorreto!");
    }
}