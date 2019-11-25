var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}


var todos = document.querySelectorAll("input[type=checkbox]");

function loadTodos() {
  $.ajax({
    url: 'https://final-back.herokuapp.com/todos',
    // url: 'https://tuapp.herokuapp.com/todos',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function (data) {

      for (let i = 0; i < data.length; i++) {
        // aqui va su código para agregar los elementos de la lista
        // algo asi:
        addTodo(data[i]._id, data[i].description, data[i].completed)
        // no tienen que usar la funcion de addTodo, es un ejemplo
      }
    },
    error: function (error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

loadTodos()


// o con jquery
// $('input[name=newitem]').keypress(function(event){
//     var keycode = (event.keyCode ? event.keyCode : event.which);
//     if(keycode == '13'){
//         $.ajax({})
//     }
// });

var input = document.querySelector("input[name=newitem]");

input.addEventListener('keypress', function (event) {
  if (event.charCode === 13) {
    json_to_send = {
      "description": input.value
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      url: 'https://final-back.herokuapp.com/todos',
      // url: 'https://tuapp.herokuapp.com/todos',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function (data) {
        // agregar código aqui para poner los datos del todolist en el el html
        addTodo(data._id, data.description, data.completed)

      },
      error: function (error_msg) {
        alert((error_msg['responseText']));
      }
    });
    input.value = '';
  }
})


function addTodo(id, todoText, completed) {
  todoList = document.getElementById('todo-list');

  listElement = document.createElement('li');

  list_input = document.createElement('input');

  list_input.type = "checkbox";
  list_input.name = "todo";

  description = document.createElement('span');
  description.innerHTML = todoText;

  listElement.appendChild(list_input);
  listElement.appendChild(description);

  todoList.appendChild(listElement)

}


logoutBtn = document.getElementById('logout');

logout.onclick = function () {
  $.ajax({
    url: 'https://final-back.herokuapp.com/logout',
    // url: 'https://tuapp.herokuapp.com/todos',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    method: 'POST',
    dataType: 'json',
    success: function (data) {
      // agregar código aqui para poner los datos del todolist en el el html
      addTodo(data._id, data.description, data.completed)

    },
    error: function (error_msg) {
      alert((error_msg['responseText']));
    }
  });

  localStorage.removeItem('token');
  window.location = './index.html'
}