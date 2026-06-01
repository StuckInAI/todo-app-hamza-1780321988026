import React from 'react';
import type { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
      />
      <span
        className={`flex-1 text-lg ${
          todo.completed
            ? 'line-through text-gray-400'
            : 'text-gray-800'
        }`.trim()}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="px-3 py-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all text-sm font-medium"
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
