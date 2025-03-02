const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearBtn = document.getElementById("clearBtn");
const emptyMessage = document.getElementById("emptyMessage");

// Загружаем сохранённые задачи при загрузке страницы
loadTasks();

addTaskBtn.addEventListener("click", function () {
  const taskText = taskInput.value.trim();
  if (taskText) {
    addTask(taskText, false);
    saveTasks();
    taskInput.value = "";
  }
});

clearBtn.addEventListener("click", function () {
  taskList.innerHTML = "";
  saveTasks();
});

function addTask(text, isChecked) {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isChecked;

  checkbox.addEventListener("change", saveTasks);

  li.appendChild(checkbox);
  li.appendChild(document.createTextNode(" " + text));
  taskList.appendChild(li);

  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    const checkbox = li.querySelector("input");
    tasks.push({
      text: li.textContent.trim(),
      done: checkbox.checked,
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateUI();
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => addTask(task.text, task.done));
  updateUI();
}

function updateUI() {
  if (taskList.children.length > 0) {
    emptyMessage.style.display = "none";
    clearBtn.removeAttribute("disabled");
  } else {
    emptyMessage.style.display = "block";
    clearBtn.setAttribute("disabled", "true");
  }
}
