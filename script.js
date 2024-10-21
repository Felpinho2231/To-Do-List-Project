document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const addTaskBtn = document.getElementById('add-task-btn');
    const searchBar = document.getElementById('search-bar');
  
    let tasks = [];
  
    addTaskBtn.addEventListener('click', () => {
      const title = document.getElementById('task-title').value;
      const desc = document.getElementById('task-desc').value;
  
      if (title) {
        const task = {
          id: Date.now(),
          title,
          desc,
          completed: false
        };
  
        tasks.push(task);
        saveTasks();
        renderTasks();
        clearInput();
      }
    });
  
    searchBar.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      renderTasks(searchTerm);
    });
  
    function renderTasks(searchTerm = '') {
      taskList.innerHTML = '';
      const filteredTasks = tasks.filter(task => 
        task.title.toLowerCase().includes(searchTerm)
      );
      
      filteredTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
          <span class="${task.completed ? 'completed' : ''}">${task.title}</span>
          <div>
            <button onclick="editTask(${task.id})">Editar</button>
            <button onclick="deleteTask(${task.id})">Deletar</button>
            <button onclick="toggleComplete(${task.id})">Concluir</button>
          </div>
        `;
        taskList.appendChild(taskItem);
      });
    }
  
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function loadTasks() {
      tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      renderTasks();
    }
  
    window.deleteTask = (id) => {
      tasks = tasks.filter(task => task.id !== id);
      saveTasks();
      renderTasks();
    };
  
    window.editTask = (id) => {
      const task = tasks.find(task => task.id === id);
      document.getElementById('task-title').value = task.title;
      document.getElementById('task-desc').value = task.desc;
      deleteTask(id);
    };
  
    window.toggleComplete = (id) => {
      const task = tasks.find(task => task.id === id);
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    };
  
    function clearInput() {
      document.getElementById('task-title').value = '';
      document.getElementById('task-desc').value = '';
    }
  
    loadTasks();
  });
  