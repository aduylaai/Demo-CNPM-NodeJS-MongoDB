document.getElementById('addTodoBtn').addEventListener('click', addTodo);

function addTodo() {
  const todoInput = document.getElementById('todoInput');
  const todoTitle = todoInput.value.trim();

  if (todoTitle === '') {
    alert('Please enter a todo title.');
    return;
  }

  // Gửi request POST để thêm todo mới
  fetch('/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: todoTitle }),
  })
  .then(response => response.json())
  .then(todo => {
    todoInput.value = ''; // Clear input field
    renderTodos(); // Cập nhật lại danh sách todos
  })
  .catch(error => console.error('Error adding todo:', error));
}

// Lấy và hiển thị todos
function renderTodos() {
  fetch('/todos')
    .then(response => response.json())
    .then(todos => {
      const tableBody = document.getElementById('todosTableBody');
      tableBody.innerHTML = ''; // Clear current list

      todos.forEach(todo => {
        const row = document.createElement('tr');

        row.innerHTML = `
          <td>${todo.title}</td>
          <td>${todo.complete ? 'Completed' : 'Pending'}</td>
          <td>
            <button class="complete-btn" onclick="toggleComplete('${todo._id}')">
              Mark as ${todo.complete ? 'Pending' : 'Complete'}
            </button>
          </td>
        `;

        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error fetching todos:', error));
}

// Chuyển đổi trạng thái todo từ Pending sang Completed và ngược lại
function toggleComplete(todoId) {
  fetch(`/todos/${todoId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ completed: true }), // Hoặc false nếu muốn đặt lại
  })
  .then(response => response.json())
  .then(() => renderTodos()) // Cập nhật lại danh sách todos
  .catch(error => console.error('Error updating todo:', error));
}

// Load todos khi trang web được tải
document.addEventListener('DOMContentLoaded', renderTodos);
