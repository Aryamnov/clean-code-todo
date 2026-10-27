const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.getElementsByTagName("button")[0];
const incompleteTaskList = document.getElementById("incompleteTasks");
const completedTaskList = document.getElementById("completed-tasks");

const createDeleteButton = function () {
  const deleteButton = document.createElement("button");
  const deleteIcon = document.createElement("img");

  deleteButton.className = "delete";
  deleteIcon.src = "./remove.svg";
  deleteButton.appendChild(deleteIcon);

  return deleteButton;
};

const createTaskListItem = function (taskText) {
  const taskListItem = document.createElement("li");

  const completionCheckbox = document.createElement("input");
  const taskLabel = document.createElement("label");
  const taskEditInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = createDeleteButton();

  // Keep user-entered task text literal rather than interpreting it as HTML.
  taskLabel.innerText = taskText;
  taskLabel.className = "task";

  completionCheckbox.type = "checkbox";
  taskEditInput.type = "text";
  taskEditInput.className = "task";

  editButton.innerText = "Edit";
  editButton.className = "edit";

  taskListItem.appendChild(completionCheckbox);
  taskListItem.appendChild(taskLabel);
  taskListItem.appendChild(taskEditInput);
  taskListItem.appendChild(editButton);
  taskListItem.appendChild(deleteButton);
  return taskListItem;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const taskListItem = createTaskListItem(newTaskInput.value);

  incompleteTaskList.appendChild(taskListItem);
  bindTaskEvents(taskListItem);

  newTaskInput.value = "";
};

const toggleTaskEditing = function () {
  const taskListItem = this.parentNode;

  const taskEditInput = taskListItem.querySelector("input[type=text]");
  const taskLabel = taskListItem.querySelector("label");
  const editButton = taskListItem.querySelector(".edit");
  const isEditing = taskListItem.classList.contains("editMode");
  if (isEditing) {
    taskLabel.innerText = taskEditInput.value;
    editButton.innerText = "Edit";
  } else {
    taskEditInput.value = taskLabel.innerText;
    editButton.innerText = "Save";
  }

  taskListItem.classList.toggle("editMode");
};

const deleteTask = function () {
  const taskListItem = this.parentNode;
  const taskList = taskListItem.parentNode;
  taskList.removeChild(taskListItem);
};

const toggleTaskCompletion = function () {
  const taskListItem = this.parentNode;
  const destinationList = this.checked ? completedTaskList : incompleteTaskList;
  destinationList.appendChild(taskListItem);
};

addTaskButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskListItem) {
  const completionCheckbox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = toggleTaskEditing;
  deleteButton.onclick = deleteTask;
  completionCheckbox.onchange = toggleTaskCompletion;
};

for (const taskListItem of [
  ...incompleteTaskList.children,
  ...completedTaskList.children,
]) {
  bindTaskEvents(taskListItem);
}
