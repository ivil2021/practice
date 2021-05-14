const input = document.querySelector("#input");
const addBtn = document.querySelector("#addBtn");
const todoListContainer = document.querySelector("#todo-list-container");
const total = document.querySelector("#total");

let l = 0; // Number of elements in localStorage
let todosArr = [];

let todoList = new TodoList();

const serverContent = fetch("http://localhost:3333/todos")
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
  let delBtnDOMElement = document.createElement("button"); // Create Del button at the end of the task
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

      //---//---//---//---//
      fetch("http://localhost:3333/todos/" + id, {
        method: "DELETE",
        body: JSON.stringify(todoList),
        headers: {
          "Content-Type": "application/json", // It's necessary to point out the certain type of the text "application/json"
        },
      }).then(() => {
        todosArrLengthUpdate(todoList);
      });
      //---//---//---//---//

      todosArrLengthUpdate(todoList);
    }

    l = todosArr.length;
  });

  todoDOMElement.appendChild(delBtnDOMElement); // Add Del button to the list element

  // Toggle class completed
  todoDOMElement.addEventListener("click", (e) => {
    let id = parseInt(e.target.id, 10); // parseInt returns an integer number
    let todo = todoList.getElementById(id);

    //---//---//---//---//
    fetch("http://localhost:3333/todos/" + id, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json", // It's necessary to point out the certain type of the text "application/json"
      },
    }).then((res) => {
      e.target.classList.toggle("li-completed");
      todo.toggle(!todo.isDone);
      todosArrLengthUpdate(todoList);
    });
    //---//---//---//---//
  });

  return todoDOMElement;
}

// Work with Add button event
addBtn.addEventListener("click", (e) => {
  // Update data structures
  let testTodo = new Todo(input.value);

  fetch("http://localhost:3333/todos", {
    method: "POST",
    body: JSON.stringify(testTodo),
    headers: {
      "Content-Type": "application/json", // It's necessary to point out the certain type of the text "application/json"
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
    localStorage.clear("todo");
    todoListContainer.innerHTML = "";
    todosArrLengthUpdate(todoList);
  }
});

function todosArrLengthUpdate(todos) {
  l = todos.filterByStatus(ACTIVE).length;
  total.textContent = l + " tasks left";
}
