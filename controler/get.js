export async function get(){
  console.log("pegando dados 1");
    return fetch(`https://2ih8obvwec.execute-api.us-east-1.amazonaws.com/items/controleContas`)
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
}
export async function getDados() {
  console.log("pegando dados 2");
  return fetch(`https://2ih8obvwec.execute-api.us-east-1.amazonaws.com/items/controleContasNovoItem`)
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
}