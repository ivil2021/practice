const input = document.querySelector('#input');
const addBtn = document.querySelector('#addBtn');
const todoListContainer = document.querySelector('#todo-list-container');
const total = document.querySelector('#total');

let activeTasksNumber = 0; // Number of elements in my todoList
let todosArr = [];

let todoList = new TodoList();

/*
//  const serverContent = fetch("http://localhost:3333/todos")
const serverContent = fetch("MyTodoList")
  .then((res) => res.json())
  .then((data) => {
    todosArr = data.todos;
    todosArr.forEach((el) => {
      const todo = new Todo(el.name, el.isDone, el.id);
      todoList.addElement(todo);
    });

    todosArrLengthUpdate(todoList);

    const list = todoList.getTodos();
    list.forEach((todoItem) => {
      let el = createTodoDOMElement(todoItem);
      todoListContainer.appendChild(el);
    });
  });

function createTodoDOMElement(testTodo) {
  // Create a todo item DOM element
  let todoDOMElement = document.createElement("li");
  todoDOMElement.className = "li";
  todoDOMElement.id = testTodo.id;
  todoDOMElement.textContent = testTodo.name;

  if (testTodo.isDone) {
    todoDOMElement.classList.add("li-completed");
  }

  // Look at mouse events / target / path / parent node
  // Create Del button at the end of the task
  let delBtnDOMElement = document.createElement("button");
  delBtnDOMElement.className = "btn-delete-todo"; // Attach class to the button
  delBtnDOMElement.textContent = "Del"; // Add text Del to the button

  // Delete todo from todoList by pressing Del button
  delBtnDOMElement.addEventListener("click", (e) => {
    e.stopPropagation();

    if (confirm("Are you sure?")) {
      // Confirmation window for deleting todos
      let id = parseInt(e.target.parentElement.id); // Getting an id of the parent element
      todoList.removeElement(id); // Removing from data
      document.getElementById(id).remove(); // Removing from html

      // fetch("http://localhost:3333/todos/" + id, {
      fetch("MyTodoList" + id, {
        method: "DELETE",
        body: JSON.stringify(todoList),
        headers: {
          // It's necessary to point out the certain type of the text "application/json"
          "Content-Type": "application/json",
        },
      }).then(() => {
        todosArrLengthUpdate(todoList);
      });

      todosArrLengthUpdate(todoList);
    }

    activeTasksNumber = todosArr.length;
  });

  todoDOMElement.appendChild(delBtnDOMElement); // Add Del button to the list element

  // Toggle class completed
  todoDOMElement.addEventListener("click", (e) => {
    let id = parseInt(e.target.id, 10); // parseInt returns an integer number
    let todo = todoList.getElementById(id);

    // fetch("http://localhost:3333/todos/" + id, {
    fetch("MyTodoList" + id, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: {
        // It's necessary to point out the certain type of the text "application/json"
        "Content-Type": "application/json",
      },
    }).then((res) => {
      e.target.classList.toggle("li-completed");
      todo.toggle(!todo.isDone);
      todosArrLengthUpdate(todoList);
    });
  });

  return todoDOMElement;
}

// Work with Add button event
addBtn.addEventListener("click", (e) => {
  // Update data structures
  let testTodo = new Todo(input.value);

  // fetch("http://localhost:3333/todos", {
  fetch("MyTodoList", {
    method: "POST",
    body: JSON.stringify(testTodo),
    headers: {
      // It's necessary to point out the certain type of the text "application/json"
      "Content-Type": "application/json",
    },
  })
    .then((data) => {
      console.log(data);
      return data.json();
    })
    .then((res) => {
      const todo = new Todo(res.name, res.isDone, res.id);
      console.log(res);
      todoList.addElement(todo);

      // Reset input
      input.value = "";

      let todoDOMElement = createTodoDOMElement(todo);

      // Add todo item DOM element (with events attached) in to todo list DOM element
      todoListContainer.appendChild(todoDOMElement);

      todosArrLengthUpdate(todoList);
    })
    .catch((error) => console.log(error));
});

function toggleTodosVisibility(visibleTodosIds) {
  todoList.getTodos().forEach((todo) => {
    let el = document.getElementById(todo.id);
    if (!visibleTodosIds.includes(todo.id)) {
      el.classList.add("hidden");
    } else {
      el.classList.remove("hidden");
    }
  });
}

// Work with Active button event
document.querySelector(".activeBtn").addEventListener("click", (e) => {
  let visibleTodosIds = todoList.filterByStatus(ACTIVE).map((item) => item.id);
  toggleTodosVisibility(visibleTodosIds);
});

// Work with Completed button event
document.querySelector(".completedBtn").addEventListener("click", (e) => {
  let visibleTodosIds = todoList
    .filterByStatus(COMPLETED)
    .map((item) => item.id);
  toggleTodosVisibility(visibleTodosIds);
});

// Work with All button event
document.querySelector(".AllBtn").addEventListener("click", (e) => {
  let visibleTodosIds = todoList.filterByStatus(ALL).map((item) => item.id);
  toggleTodosVisibility(visibleTodosIds);
});

// Work with Clear All button event
// Use a querySelector with .clearAllBtn class to make sure that we work with the Clear All button
document.querySelector(".clearAllBtn").addEventListener("click", (e) => {
  if (confirm("Are you sure?")) {
    // Confirmation window for deleting todos
    todoList.clear();
    // localStorage.clear("todo");
    todoListContainer.innerHTML = "";

    // fetch("http://localhost:3333/todos/", {
    fetch("MyTodoList", {
      method: "DELETE",
      body: JSON.stringify(todoList),
      headers: {
        // It's necessary to point out the certain type of the text "application/json"
        "Content-Type": "application/json",
      },
    }).then(() => {
      todosArrLengthUpdate(todoList);
    });

    todosArrLengthUpdate(todoList);
  }
});
*/

//----------- FIREBASE ----------//
//----------- FIREBASE ----------//
//----------- FIREBASE ----------//

//----- Calculating the number of active tasks -----//
function todosArrLengthUpdate(todos) {
  activeTasksNumber = todos.filterByStatus(ACTIVE).length;
  total.textContent = activeTasksNumber + ' tasks left';
}

// The reference to the ul element with the id todo-list-container
const ul = document.querySelector('#todo-list-container');

// The reference to the div element with the id myDIV where my input and button tags are
const form = document.querySelector('#myDIV');

// Creating an li element and render todos
// Creating an HTML elements, put some data to those and render them to the DOM
function renderTodos(doc) {
  // Creating a new li element inside ul element with the id todo-list-container
  let li = document.createElement('li');

  li.className = 'li'; // Setting the li class to the li element

  // Creating a new span elements inside li element
  let id = document.createElement('span');
  let name = document.createElement('span');
  let isDone = document.createElement('span');

  // Setting an attribute to each li element in order to use it in future
  li.setAttribute('id', doc.id); // id is the autogenerated id from firebase

  // Setting the text content for each span element
  id.textContent = doc.data().id;
  name.textContent = doc.data().name; // name is a property name from Firebase (for example Learn HTML)
  isDone.textContent = doc.data().isDone;

  li.appendChild(name);

  //----- Creating a Del button at the end of the task -----//
  let delBtn = document.createElement('button');
  delBtn.className = 'btn-delete-todo'; // Setting class to the button
  delBtn.textContent = 'Del'; // Adding text Del to the button

  li.appendChild(delBtn); // Adding Del button at the end of the task

  ul.appendChild(li); // Appending a li element to the ul element

  //----- Del button -----//
  if (delBtn) {
    // console.log('+++');
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm('Are you sure?')) {
        let id = e.target.parentElement.id;
        db.collection('MyTodoList').doc(id).delete();
      }
    });
  }
}

//----- Add button -----//
addBtn.addEventListener('click', (e) => {
  db.collection('MyTodoList').add({
    name: input.value, // getting the value from the input field
    isDone: false,
  });

  input.value = ''; // Clear input field
});

// Real-time listener
// Reacts on every single change in Firebase
db.collection('MyTodoList').onSnapshot((snapshot) => {
  let changes = snapshot.docChanges();

  changes.forEach((change) => {
    if (change.type === 'added') {
      let data = change.doc.data(); // Saving added changes to data

      // Creating a new Todo with data from Firebase
      let todo = new Todo(data.name, data.isDone, change.doc.id);
      todoList.addElement(todo);

      return renderTodos(change.doc);
    }

    if (change.type === 'removed') {
      todoList.removeElement(change.doc.id);

      document.getElementById(change.doc.id).remove(); // Removing from html

      return;
    }
  });

  console.log(todoList.getTodos());

  todosArrLengthUpdate(todoList);
});

// USE THIS METHOD TO UPDATE DATA
//updating document
//db.collection('cafes').doc('VJJnX9qF5U9hbIZMZvvE').update({name: 'Funny guy!'}); //updates only the specified property
// USE THIS METHOD TO UPDATE DATA

// Getting data from Firebase
// Snapshot is what we receive when we call this method db.collection("MyTodoList").get()
// Snapshot is a representation of the different data from our collection
/* db.collection("MyTodoList")
  .get()
  .then((snapshot) => {
    // Cycling through each document on a snapshot, calling the renderTodos function
    // and passing the individual document so we can render it to the DOM
    snapshot.docs.forEach((doc) => {
      console.log(doc.data());
      renderTodos(doc);
    });
  }); */
