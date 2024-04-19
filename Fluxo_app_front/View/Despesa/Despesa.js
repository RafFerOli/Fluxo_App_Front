/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  document.getElementById("Sum").value = "0";
  let url = 'http://127.0.0.1:5000/Despesas';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.despesas.forEach(item => insertList(item.id, item.descricao, item.data, item.valor))
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
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputDescription, inputDate, inputValue) => {
  const formData = new FormData();
  formData.append('descricao', inputDescription);
  formData.append('data', inputDate);
  formData.append('valor', inputValue);

  let url = 'http://127.0.0.1:5000/Despesa';
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
  let url = 'http://127.0.0.1:5000/Despesa?id=' + item;
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
  let inputDescription = document.getElementById("newDescription").value;
  let inputDate = document.getElementById("newDate").value;
  let inputValue = document.getElementById("newValue").value;

  if (inputDescription === '') 
  {
    alert("Escreva uma descrição para a despesa!");
  } 
  else if (!validaData(inputDate))
  {
    alert("Escreva a data em que a despesa foi realizada!");
  }
  else if (isNaN(inputValue)) 
  {
    alert("Escreva o valor da despesa!");
  } 
  else {    
    postItem(inputDescription, inputDate, inputValue)
    alert("Item adicionado!")

    window.location.reload(true);    
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (idExpense, description, date, value) => {
  var item = [idExpense, description, date, value]
  var table = document.getElementById('myTable');
  var row = table.insertRow();
  let total = Number(document.getElementById("Sum").value);

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];   
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newDescription").value = "";
  document.getElementById("newDate").value = "";
  document.getElementById("newValue").value = "";

  total+= Number(item[3]);
  document.getElementById("Sum").value = total;
  
  removeElement()
}

