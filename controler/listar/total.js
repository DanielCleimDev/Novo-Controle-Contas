
export function atualizarTotal(total, string) {
    const ptotal = document.getElementById("total").
    textContent = `${string}: R$ ${total.
        toLocaleString('pt-BR')}`;
}