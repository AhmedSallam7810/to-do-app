toD = new toDo();
toD.getTasks();
toD.render();

document.querySelector("#add-task-button").addEventListener("click", () => {
  input = document.querySelector("#add-task-input");
  input.value ? toD.addTask(input.value) : "";
  input.value = "";
});

document.querySelector("#compelete-checkbox").addEventListener("click", () => {
  toD.compeleteButton = !toD.compeleteButton;
  toD.render();
});

document.querySelector("#filter-input").addEventListener("input", (e) => {
  toD.filterInput = e.target.value;
  toD.render();
});
