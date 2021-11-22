const ipcRenderer = require("electron").ipcRenderer;

await (async () => {
  const taskList = document.getElementById("taskList");

  const updateTasks = async () => {
    const tasks = await ipcRenderer.invoke('storage-get', 'Tasks');

    taskList.innerHTML = '';

    for (const task of tasks) taskList.innerHTML += `
      <div class="task">
        <i class="fas fa-tasks fa-lg"></i>

        <div class="task-info">
          <h3>${task.title}</h3>
        </div>

        <button id="Task#${task._id}">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    `;
  };


  document.getElementById("addTask").addEventListener("click", async () => {
    const task = document.getElementById("newTaskName");

    if (!task.value || (task.value.length === 0))
      return console.log("Unknown title task");

    await ipcRenderer.invoke('storage-addTask', task.value);
    task.value = "";

    await updateTasks();
  });


  const deleteTask = async (id) => {
    await ipcRenderer.invoke('storage-deleteTask', Number(id.split('#')[1]));

    await updateTasks();
  };
  
  taskList.addEventListener("click", async (e) => {
    if (!e.target) return;

    const id = (e.target.id.length > 0)
    ? e.target.id 
    : (e.target.parentNode.id.length > 0)
      ? e.target.parentNode.id
      : undefined;
    
    if (!id) return;
    
    await deleteTask(id);
  });

  await updateTasks();
})();

export {};