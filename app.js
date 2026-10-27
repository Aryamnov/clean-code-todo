//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const newTaskInput = document.getElementById("new-task"); //Add a new task.
const addTaskButton = document.getElementsByTagName("button")[0]; //first button
const incompleteTaskList = document.getElementById("incompleteTasks"); //ul of #incompleteTasks
const completedTaskList = document.getElementById("completed-tasks"); //completed-tasks

//New task list item
const createTaskListItem = function (taskText) {
  const taskListItem = document.createElement("li");

  //input (checkbox)
  const completionCheckbox = document.createElement("input"); //checkbx
  //label
  const taskLabel = document.createElement("label"); //label
  //input (text)
  const taskEditInput = document.createElement("input"); //text
  //button.edit
  const editButton = document.createElement("button"); //edit button

  //button.delete
  const deleteButton = document.createElement("button"); //delete button
  const deleteIcon = document.createElement("img"); //delete button image

  taskLabel.innerText = taskText;
  taskLabel.className = "task";

  //Each elements, needs appending
  completionCheckbox.type = "checkbox";
  taskEditInput.type = "text";
  taskEditInput.className = "task";

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteIcon.src = "./remove.svg";
  deleteButton.appendChild(deleteIcon);

  //and appending.
  taskListItem.appendChild(completionCheckbox);
  taskListItem.appendChild(taskLabel);
  taskListItem.appendChild(taskEditInput);
  taskListItem.appendChild(editButton);
  taskListItem.appendChild(deleteButton);
  return taskListItem;
};

const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!newTaskInput.value) return;
  const taskListItem = createTaskListItem(newTaskInput.value);

  //Append taskListItem to incompleteTaskList
  incompleteTaskList.appendChild(taskListItem);
  bindTaskEvents(taskListItem);

  newTaskInput.value = "";
};

//Edit an existing task.

const toggleTaskEditing = function () {
  const taskListItem = this.parentNode;

  const taskEditInput = taskListItem.querySelector("input[type=text]");
  const taskLabel = taskListItem.querySelector("label");
  const editButton = taskListItem.querySelector(".edit");
  const isEditing = taskListItem.classList.contains("editMode");
  //If class of the parent is .editmode
  if (isEditing) {
    //switch to .editmode
    //label becomes the inputs value.
    taskLabel.innerText = taskEditInput.value;
    editButton.innerText = "Edit";
  } else {
    taskEditInput.value = taskLabel.innerText;
    editButton.innerText = "Save";
  }

  //toggle .editmode on the parent.
  taskListItem.classList.toggle("editMode");
};

//Delete task.
const deleteTask = function () {
  const taskListItem = this.parentNode;
  const taskList = taskListItem.parentNode;
  //Remove the parent list item from the ul.
  taskList.removeChild(taskListItem);
};

const toggleTaskCompletion = function () {
  const taskListItem = this.parentNode;
  const destinationList = this.checked ? completedTaskList : incompleteTaskList;
  destinationList.appendChild(taskListItem);
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addTaskButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskListItem) {
  //select ListItems children
  const completionCheckbox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  //Bind toggleTaskEditing to edit button.
  editButton.onclick = toggleTaskEditing;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  completionCheckbox.onchange = toggleTaskCompletion;
};

for (const taskListItem of [
  ...incompleteTaskList.children,
  ...completedTaskList.children,
]) {
  bindTaskEvents(taskListItem);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
