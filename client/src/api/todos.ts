export interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodosRes {
  success: boolean;
  completed: TodoItem[];
}

export const addTodo = async (title: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
    method: 'POST',
    credentials: "include",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: title.trim(), completed: 0 }),
  });
  return response.json();
};

export const fetchCompletedTodos = async (): Promise<TodosRes> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/todos/completed`, {
    credentials: "include",
  })
  const data = await response.json();
  return data;
}

export const delteTodo = async (id: number) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
    method: "DELETE",
    credentials: "include"
  })
  return response.json();
}

export const editTitle = async ({ id, title, completed }: { id: number, title: string, completed: boolean }) => {

  const response = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
    method: 'PUT',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      completed: completed,
      title: title, // Use the passed title
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  return response.json();
}

export const fetchTodos = async (): Promise<Todo> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
    credentials: "include",
  })
  const data = await response.json();
  return data;
}

export const updateTodo = async ({
  id,
  title,
  completed,
}: TodoItem): Promise<TodosRes> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
    method: 'PUT',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      completed: completed ? 1 : 0, // Toggle completed status
      title: title, // Use the passed title
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  return response.json();
};

