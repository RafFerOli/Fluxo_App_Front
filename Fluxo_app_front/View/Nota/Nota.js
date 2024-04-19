/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  document.getElementById("Sum").value = "0";
  let url = 'http://127.0.0.1:5000/Notas';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.notas.forEach(item => insertList(item.numero, item.cliente_id, item.cancelada, item.descricao_servico,
       item.data_emissao,  item.data_faturamento, item.valor))
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
  Função para colocar um item na lista do servidor via requisição POST
  (numero, cliente_id, cancelada, descricao_servico,
  data_emissao,  data_faturamento, valor)
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputNumber, inputClient, inputCancel, inputDescription, inputDateEmi, inputDateBil, inputValue) => {
  const formData = new FormData();
  formData.append('numero', inputNumber);
  formData.append('cliente_id', inputClient);
  formData.append('cancelada', inputCancel);
  formData.append('descricao_servico', inputDescription);
  formData.append('data_emissao', inputDateEmi);
  formData.append('data_faturamento', inputDateBil);
  formData.append('valor', inputValue);

  let url = 'http://127.0.0.1:5000/Nota';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/Nota?numero=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputNumber = document.getElementById("newNumber").value;
  let inputClient = document.getElementById("newClient").value;
  let inputCancel = document.getElementById("newCancel").value;
  let inputDescription = document.getElementById("newDescription").value;
  let inputDateEmi = document.getElementById("newDateEmi").value;
  let inputDateBil = document.getElementById("newDateBil").value;
  let inputValue = document.getElementById("newValue").value;

  if (isNaN(inputNumber)) 
  {
    alert("Escreva o numero da nota fiscal!");
  }
  else if (isNaN(inputClient)) 
  {
    alert("Escreva a qual cliente essa nora pertence!");
  }
  else if (inputCancel === '') 
  {
    alert("Selecione o status da nota fiscal!");
  }
  else if (inputDescription === '') 
  {
    alert("Descreva o serviço prestado!");
  } 
  else if (!validaData(inputDateEmi))
  {
    alert("Escreva a data em que a nota foi emitida!");
  }
  else if (!validaData(inputDateBil))
  {
    alert("Escreva a data em que a nota foi faturada!");
  }
  else if (isNaN(inputValue)) 
  {
    alert("Escreva o valor da nota fiscal!");
  } 
  else {    
    postItem(inputNumber, inputClient, inputCancel, inputDescription, inputDateEmi, inputDateBil, inputValue)
    alert("Item adicionado!")

    window.location.reload(true);    
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (numero, cliente_id, cancelada, descricao_servico,
  data_emissao,  data_faturamento, valor) => {
  var item = [numero, cliente_id, cancelada, descricao_servico,
    data_emissao,  data_faturamento, valor]
  var table = document.getElementById('myTable');
  var row = table.insertRow();
  let total = Number(document.getElementById("Sum").value);

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newNumber").value = "";
  document.getElementById("newClient").value = "";
  document.getElementById("newCancel").value = "";
  document.getElementById("newDescription").value = "";
  document.getElementById("newDateEmi").value = "";
  document.getElementById("newDateBil").value = "";
  document.getElementById("newValue").value = "";

  if(!Boolean(cancelada))
  {
  total+= Number(item[6]);
  document.getElementById("Sum").value = total;
  }

  removeElement()
}