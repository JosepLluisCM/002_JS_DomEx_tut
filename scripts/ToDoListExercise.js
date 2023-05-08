let todoList = JSON.parse(localStorage.getItem('todoList'));
 
if (todoList === null) {
  todoList = [];
}

renderTodoList();


function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach(function(todoObject, index) {
    const { name, date } = todoObject;
    console.log(todoObject);
    const html = `
      <div>${name}</div>
      <div>${date}</div>
      <button onclick="
        todoList.splice(${index}, 1);
        localStorage.removeItem('todoList[index]');
        renderTodoList();"
      class="delete-button">Delete</button>`;
      
    todoListHTML += html;
  });

  

  document.querySelector('.js-todoList').innerHTML = todoListHTML;

  localStorage.setItem('todoList', JSON.stringify(todoList));
}


function addTodo() {
  const inputElement = {
    name: '',
    date: ''
  }
  
  inputElement.name = document.querySelector('.js-input-name').value;
  inputElement.date = document.querySelector('.js-input-date').value;

  if (inputElement.name === '') inputElement.name = 'not specified';
  if (inputElement.date === '') inputElement.date = 'not specified';

  todoList.push(inputElement);

  document.querySelector('.js-input-name').value = '';
  document.querySelector('.js-input-date').value = '';

  renderTodoList();
  //console.log(inputElement);
}
