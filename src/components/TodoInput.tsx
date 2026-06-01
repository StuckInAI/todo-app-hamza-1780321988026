import React, { useState } from 'react';

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTodo(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors"
      >
        Add
      </button>
    </form>
  );
};

export default TodoInput;
