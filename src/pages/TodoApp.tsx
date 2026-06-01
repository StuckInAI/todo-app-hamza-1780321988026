import React, { useState, useEffect } from 'react';
import TodoList from '@/components/TodoList';
import TodoInput from '@/components/TodoInput';
import type { Todo } from '@/types/todo';

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (e) {
        console.error('Failed to parse todos from localStorage', e);
      }
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-center text-gray-800 mb-2">
            My Todo List
          </h1>
          <p className="text-center text-gray-600">
            Stay organized and manage your tasks effectively
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Input Section */}
          <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600">
            <TodoInput onAddTodo={addTodo} />
          </div>

          {/* Stats Section */}
          {todos.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">{todos.length}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{activeCount}</p>
                <p className="text-sm text-gray-600">Active</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{completedCount}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>
          )}

          {/* Filter Buttons */}
          {todos.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex gap-2 justify-center">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'active'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'completed'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                }`}
              >
                Completed
              </button>
            </div>
          )}

          {/* Todo List */}
          <div className="p-6">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {todos.length === 0
                    ? '✨ No todos yet. Add one to get started!'
                    : 'No todos in this category.'}
                </p>
              </div>
            ) : (
              <TodoList
                todos={filteredTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            )}
          </div>

          {/* Footer Actions */}
          {todos.length > 0 && completedCount > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <button
                onClick={clearCompleted}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition-colors"
              >
                Clear Completed ({completedCount})
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
