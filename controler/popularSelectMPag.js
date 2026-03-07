export function popularMeiosPagamento(){
    let selectMeiosPagamento = document.getElementById("meioPagamento")

    let meiosPagamento = JSON.parse(sessionStorage.getItem("meiosPagamento"));
    meiosPagamento.forEach(element => {
        const option = document.createElement("option");
        option.value = element;
        option.textContent = element;
        selectMeiosPagamento.appendChild(option);
    });
}