export const fetchTasks = async (page = 1, limit = 10) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`
  );
  return response.json();
};

export const createTask = async (task) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return response.json();
};

export const updateTask = async (id, task) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return response.json();
};

export const deleteTask = async (id) => {
  await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: 'DELETE',
  });
};