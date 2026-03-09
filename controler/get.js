export async function get(){
    return fetch(`https://2ih8obvwec.execute-api.us-east-1.amazonaws.com/items/controleContas`)
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
}
export async function getDados() {
  return fetch(`https://2ih8obvwec.execute-api.us-east-1.amazonaws.com/items/controleContasNovoItem`)
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
}