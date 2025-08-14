import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, ChevronDown } from 'lucide-react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // ← Initialize as empty array, not undefined
  const [loading, setLoading] = useState<boolean>(true);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'Active' | 'Completed' | 'All'>('Active');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const addTodo = async () => {
    if (newTodo.trim()) {
      try {
        const response = await fetch('http://localhost:3000/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: newTodo.trim(), // ← Use "title" not "text"
            completed: 0, // ← Default to false
          }),
        });

        if (response.ok) {
          // Refetch todos or add to local state
          fetchTodos();
        }
      } catch (error) {
        console.error('Error adding todo:', error);
      }
      setNewTodo('');
    }
  };

  const toggleTodo = async (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: 0,
        }),
      });

      if (response.ok) {
        setTodos(todos.map(todo =>
          todo.id === id ? { ...todo, completed: !! !todo.completed } : todo
        ));
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTodos(todos.filter(todo => todo.id !== id));
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const startEdit = (id: number, title: string) => { // ← Use "title" not "text"
    setEditingId(id);
    setEditText(title);
  };

  const saveEdit = async () => {
    if (editText.trim() && editingId) {
      try {
        const response = await fetch(`http://localhost:3000/todos/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: editText.trim(),
          }),
        });

        if (response.ok) {
          setTodos(todos.map(todo =>
            todo.id === editingId ? { ...todo, title: editText.trim() } : todo
          ));
        }
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    }
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3000/todos');
      const response = await res.json();


      console.log('Fetched todos:', response); // Debugging line
      if (response.success && response.todos) {
        setTodos(response.todos); // ← Adjust based on your API structure
      } else if (Array.isArray(response)) {
        setTodos(response);
      }
      setLoading(false);
    } catch (error) {
      setTodos([]); // ← Fallback to empty array
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) {
    return <p>loading...</p>
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Todo List</h1>
        <p className="text-gray-600">Plan your day and track your tasks</p>
      </div>

      {/* Add Todo Input */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={addTodo}
          className="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Filter and Count */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'Active' | 'Completed' | 'All')}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="All">All</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>
        <span className="text-gray-600">Count: {filteredTodos.length}</span>
      </div>

      {/* Section Title */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        {filter} Tasks
      </h2>

      {/* Todo List */}
      <div className="space-y-3">
        {filteredTodos.map(todo => (
          <div
            key={todo.id}
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            {/* Checkbox */}
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${todo.completed
                ? 'bg-blue-500 border-blue-500 text-white'
                : 'border-gray-300 hover:border-blue-400'
                }`}
            >
              {!!todo.completed && (
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            {/* Todo Text */}
            <div className="flex-1">
              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') saveEdit();
                    if (e.key === 'Escape') cancelEdit();
                  }}
                  onBlur={saveEdit}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              ) : (
                <span
                  className={`${todo.completed
                    ? 'text-gray-500 line-through'
                    : 'text-gray-900'
                    }`}
                >
                  {todo.title}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(todo.id, todo.title)}
                className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="p-2 text-gray-500 hover:text-red-600 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {filteredTodos.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No {filter.toLowerCase()} tasks found
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
