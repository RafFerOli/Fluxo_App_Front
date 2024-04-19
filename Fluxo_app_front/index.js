/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET para despesas
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  document.getElementById("SumDespesa").value = "0";
  document.getElementById("SumNotas").value = "0";
  document.getElementById("Sum").value = "0";
  
 
  //Busca dados das despesas
  let url1 = 'http://127.0.0.1:5000/Despesas';
  fetch(url1, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.despesas.forEach(item => SomaDespesa(item.valor))

      //calcula diferenca dos valores
      CalculaDiferenca();
    })
    .catch((error) => {
      console.error('Error:', error);
    });    

  //Busca dados das notas
  let url2 = 'http://127.0.0.1:5000/Notas';
  fetch(url2, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.notas.forEach(item => SomaNotas(item.valor, item.cancelada))

      //calcula diferenca dos valores
      CalculaDiferenca();    
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()

/*
  --------------------------------------------------------------------------------------
  Função para somar valores das despesas
  --------------------------------------------------------------------------------------
*/
const SomaDespesa = (value) => {  
  let total = Number(document.getElementById("SumDespesa").value);
  total += Number(value);
  document.getElementById("SumDespesa").value = total;
}

/*
  --------------------------------------------------------------------------------------
  Função somar valores das notas
  --------------------------------------------------------------------------------------
*/
const SomaNotas = (value, cancelada) => {  
  if(!Boolean(cancelada))
  {
    let total = Number(document.getElementById("SumNotas").value);
    total += Number(value);
    document.getElementById("SumNotas").value = total;
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para calculo da diferença
  --------------------------------------------------------------------------------------
*/
function CalculaDiferenca() {
  let totalnota = Number(document.getElementById("SumNotas").value) - Number(document.getElementById("SumDespesa").value);
  document.getElementById("Sum").value = totalnota;
}
