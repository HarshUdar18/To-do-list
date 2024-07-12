document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            createTaskElement(task);
        });
    };

    // Save tasks to local storage
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(taskElement => {
            tasks.push({
                text: taskElement.querySelector('.task-text').textContent,
                completed: taskElement.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Create a new task element
    const createTaskElement = (task) => {
        const taskElement = document.createElement('li');
        taskElement.classList.toggle('completed', task.completed);

        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskText.classList.add('task-text');
        taskElement.appendChild(taskText);

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        const tickBtn = document.createElement('button');
        tickBtn.textContent = '✔';
        tickBtn.classList.add('tick-btn');
        buttonContainer.appendChild(tickBtn);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        buttonContainer.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        buttonContainer.appendChild(deleteBtn);

        taskElement.appendChild(buttonContainer);
        taskList.appendChild(taskElement);

        // Mark task as completed
        tickBtn.addEventListener('click', () => {
            taskElement.classList.toggle('completed');
            saveTasks();
        });

        // Edit task
        editBtn.addEventListener('click', () => {
            const newText = prompt('Edit task', taskText.textContent);
            if (newText !== null && newText.trim() !== '') {
                taskText.textContent = newText.trim();
                saveTasks();
            }
        });

        // Delete task
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(taskElement);
            saveTasks();
        });
    };

    // Add a new task
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            createTaskElement({ text: taskText, completed: false });
            taskInput.value = '';
            saveTasks();
        }
    });

    loadTasks();
});
