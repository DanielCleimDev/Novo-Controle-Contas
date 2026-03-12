
export function atualizarTotal(total, string) {
    const ptotal = document.getElementById("total")
    ptotal.textContent = `${string}: R$ ${total.toFixed(2)}`
}