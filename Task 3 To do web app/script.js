document.addEventListener('DOMContentLoaded', loadTasks);

const taskTitleInput = document.getElementById('task-title');
const taskDescInput = document.getElementById('task-desc');
const taskTimerInput = document.getElementById('task-timer');
const addTaskBtn = document.getElementById('add-task-btn');
const taskTableBody = document.getElementById('task-table-body');

// Audio file path
const alertSound = new Audio('alert.mp3');

addTaskBtn.addEventListener('click', addTask);

function addTask() {
  const title = taskTitleInput.value.trim();
  const description = taskDescInput.value.trim();
  const timer = taskTimerInput.value;

  if (title === '' || description === '') {
    alert('Please fill out both Title and Description fields!');
    return;
  }

  const task = {
    title: title,
    description: description,
    timer: timer,
    id: Date.now(),
  };

  saveTask(task);
  renderTask(task);
  taskTitleInput.value = '';
  taskDescInput.value = '';
  taskTimerInput.value = '';
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) => renderTask(task));
  checkTimers();
}

function renderTask(task) {
  const tr = document.createElement('tr');
  tr.setAttribute('data-id', task.id);

  const titleTd = document.createElement('td');
  titleTd.textContent = task.title;

  const descTd = document.createElement('td');
  descTd.textContent = task.description;

  const timerTd = document.createElement('td');
  if (task.timer) {
    const timerSpan = document.createElement('span');
    timerSpan.textContent = new Date(task.timer).toLocaleString();
    timerTd.appendChild(timerSpan);
  } else {
    timerTd.textContent = 'No Timer';
  }

  const deleteTd = document.createElement('td');
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'X';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', () => deleteTask(task.id));

  deleteTd.appendChild(deleteBtn);

  tr.appendChild(titleTd);
  tr.appendChild(descTd);
  tr.appendChild(timerTd);
  tr.appendChild(deleteTd);

  taskTableBody.appendChild(tr);
}

function deleteTask(id) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter((task) => task.id !== id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  refreshTasks();
}

function refreshTasks() {
  taskTableBody.innerHTML = '';
  loadTasks();
}

function checkTimers() {
  setInterval(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => {
      if (task.timer && new Date(task.timer) <= new Date()) {
        alert(`Task Alert: ${task.title} is due now!`);
        alertSound.play(); // Play alert sound
        task.timer = null; // Reset the timer once the alert is shown
        saveTasks(tasks);
        refreshTasks();
      }
    });
  }, 60000); // Check every minute
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
