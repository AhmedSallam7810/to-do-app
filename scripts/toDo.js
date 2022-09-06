class toDo {
  constructor() {
    this.tasks = [];
    this.compeleteButton = false;
    this.filterInput = "";
  }

  render() {
    let tasksE = document.querySelector("#tasks");
    let incompeleteE = document.querySelector("#incompelete");
    tasksE.innerHTML = "";
    let incompelete = 0;
    this.tasks.forEach((task, indx) => {
      if (!task.compeleted) incompelete++;
      if (
        (this.compeleteButton && task.compeleted) ||
        !task.text.includes(this.filterInput)
      )
        return;
      tasksE.appendChild(this.makeTask(task, indx));
    });

    incompeleteE.innerHTML = `You have ${incompelete} tasks to do!`;
  }

  makeTask(task, indx) {
    let taskDivE = document.createElement("div");
    let taskConE = document.createElement("div");
    let taskCheckE = document.createElement("input");
    let taskTextE = document.createElement("span");
    let taskRemoveE = document.createElement("button");
    taskCheckE.setAttribute("type", "checkbox");
    taskCheckE.checked = task.compeleted;
    taskTextE.textContent = task.text;
    taskRemoveE.textContent = "remove";
    taskConE.classList.add("list-item__container");
    taskDivE.classList.add("list-item");
    taskRemoveE.classList.add("button", "button--text");
    taskConE.appendChild(taskCheckE);
    taskConE.appendChild(taskTextE);
    taskDivE.append(taskConE);
    taskDivE.appendChild(taskRemoveE);

    taskRemoveE.addEventListener("click", () => {
      this.removeTask(indx);
    });

    taskCheckE.addEventListener("click", () => {
      task.compeleted = !task.compeleted;
      this.saveTasks();
      this.render();
    });

    return taskDivE;
  }

  addTask(task) {
    this.tasks.push({ id: uuidv4(), text: task, compeleted: false });
    this.render();
    this.saveTasks();
  }

  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  getTasks() {
    let data = JSON.parse(localStorage.getItem("tasks"));
    this.tasks = data ? data : [];
  }

  removeTask(indx) {
    this.tasks.splice(indx, 1);
    this.saveTasks();
    this.render();
  }
}
