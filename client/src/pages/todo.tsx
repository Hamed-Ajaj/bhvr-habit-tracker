import React, { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useTodos } from "@/hooks/useTodos";
import { useAddTodo } from "@/hooks/useAddTodo";
import { useDeleteTodo } from "@/hooks/useDeleteTodo";
import { useUpdateTodo } from "@/hooks/useUpdateTodo";
import { useEditTitle } from "@/hooks/useEditTitle";
import Loader from "@/components/ui/loader";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const { todos: tanstackTodos, isLoading } = useTodos();
  const tanstackAddTodo = useAddTodo();
  const tanstackDeleteTodo = useDeleteTodo();
  const tanstackUpdateTodo = useUpdateTodo();
  const tanstackEditTitle = useEditTitle();

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      setNewTodo("");
      await tanstackAddTodo.mutateAsync(newTodo.trim());
    } catch {
      /* handled in hooks */
      console.log("error adding todo");
    }
  };

  const toggleTodo = async (id: number, title: string, completed: boolean) => {
    try {
      await tanstackUpdateTodo.mutateAsync({ id, title, completed });
    } catch {
      /* handled in hooks */
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await tanstackDeleteTodo.mutateAsync(id);
    } catch {
      /* handled in hooks */
    }
  };

  const startEdit = (id: number, title: string) => {
    setEditingId(id);
    setEditText(title);
  };

  const saveEdit = async () => {
    const todo = tanstackTodos?.todos?.find((t) => t.id === editingId);
    if (!editText.trim() || !editingId || !todo) return;

    try {

      setEditText("");
      setEditingId(null);

      await tanstackEditTitle.mutateAsync({
        id: editingId,
        title: editText.trim(),
        completed: todo.completed,
      });

    } finally {
      setEditingId(null);
      setEditText("");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Todo List</h1>
        <p className="text-gray-600">Plan your day and track your tasks</p>
      </div>

      {/* Add Todo */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTodo}
          disabled={tanstackAddTodo.isPending}
          className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
        >
          {/* {tanstackAddTodo.isPending ? "Adding…" : "Add"} */}
          <Plus />
        </button>
      </div>

      {/* Todo List */}
      <div className="space-y-3">
        {tanstackTodos?.todos?.map((todo: Todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            {/* Checkbox */}
            <button
              onClick={() => toggleTodo(todo.id, todo.title, !todo.completed)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${todo.completed
                ? "bg-blue-500 border-blue-500 text-white"
                : "border-gray-300 hover:border-blue-400"
                }`}
            >
              {!!todo.completed && (
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>

            {/* Title */}
            <div className="flex-1">
              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit();
                    if (e.key === "Escape") cancelEdit();
                  }}
                  onBlur={saveEdit}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              ) : (
                <span
                  className={`${todo.completed ? "text-gray-500 line-through" : "text-gray-900"
                    }`}
                >
                  {todo.title}
                </span>
              )}
            </div>

            {/* Actions */}
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
      </div>
    </div>
  );
};

export default TodoList;
