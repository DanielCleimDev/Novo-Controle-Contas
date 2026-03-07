export async function salvar (item) {
  let tabela = "controleContas";
  fetch("https://2ih8obvwec.execute-api.us-east-1.amazonaws.com/items", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tabela,
      item,
    }),
  })
    .then((response) => console.log(response.json))
    .catch((error) => {
      console.log("Ocorreu um erro ao carregar os dados." + error.message);
    });
};