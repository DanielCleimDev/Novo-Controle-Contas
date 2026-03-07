
export async function deletar (tabela, id) {
  fetch("https://2ih8obvwec.execute-api.us-east-1.amazonaws.com/items", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tabela,
      id,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.log("Ocorreu um erro ao carregar os dados." + error.message);
    });
};