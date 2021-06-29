var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

var createNewTaskElement = function(taskString) {
  //create list item   
  var listItem = document.createElement("li");
        // checkbox input
  var checkbox = document.createElement("input");
      // label
  var label = document.createElement("label")
      // text input
  var editInput = document.createElement("input")
      // edit button
  var editButton = document.createElement("button");
      // delete button
  var deleteButton = document.createElement("button");
  
      // each element modified and appended
  
    checkbox.type = "checkbox";
    editInput.type = "text";
    
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    
    label.innerText = taskString;
  
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
  
  return listItem;
  }

var addTask = function() {
  console.log("add new..");
  // Create new task list item with text from new task 
  var listItem = createNewTaskElement(taskInput.value);

  //append listItem to incompleteTaskHolder
  if(taskInput.value !== "") {
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted); 
  taskInput.value = "";
  }
}

var editTask = function() {
   console.log("edit task..");
  
  var listItem = this.parentNode;
  
  var editInput = listItem.querySelector("input[type=text]");
  var editButton = listItem.querySelector("button");
  var label = listItem.querySelector("label");
  
  var containsClass = listItem.classList.contains("editMode");
  
      // if parent has editMode class
    if(containsClass) {
        //switch from edit 
      label.innerText = editInput.value;
        // label text become the input's value
        editButton.innerText = "Edit";
    } else {
      editInput.value = label.innerText; 
        // switch to editMode
        // input value becomes label's text
        editButton.innerText = "Save";
      }
  // toggle edit mode on parent
  listItem.classList.toggle("editMode");
  }

var taskCompleted = function() {
   console.log("task completed");
    var listItem = this.parentNode
     // append list item to complete tasks
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete); 
}

var taskIncomplete = function() {
   console.log("task incomplete");
    var listItem = this.parentNode
     // append list item to complete tasks
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted); 
}

var deleteTask = function() {
   console.log("delete task");
// Delete tasks
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

var bindTaskEvents = function(taskListItem, checkboxEventHandler) {
  console.log("bind list item");
  
    //select children
      var checkbox = taskListItem.querySelector("input[type=checkbox]");
      var editButton = taskListItem.querySelector("button.edit");
      var deleteButton = taskListItem.querySelector("button.delete");
  
   //bind edittask to editbutton
     editButton.onclick = editTask;
  
    //bind deletetask to delete button
       deleteButton.onclick = deleteTask;
  
    //bind taskcompleted to checkbox
       checkbox.onchange = checkboxEventHandler;
}

var ajaxRequest = function() {
 console.log("ajax request"); 
}
// Adds task if enter is pressed without having to click "add"
var enterPressed = function(e) {
  if (e.keyCode === 13) {
  addTask();
  }
}

// Event Listerners
taskInput.addEventListener("keydown", enterPressed);
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

// cycle over incomplete taskholder ul list item
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

// cycle over completetaskholder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}