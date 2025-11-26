import { useEffect, useState } from "react"

export default function ToDo() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Сдать на права', completed: true },
    { id: 2, title: 'Купить машину', completed: false },
    { id: 3, title: 'Привести в идеал машину', completed: false },
    { id: 4, title: 'Первое дтр', completed: false },
    { id: 5, title: 'Поменять машину', completed: false },
    { id: 6, title: 'Купить машину мечты', completed: false },
    { id: 7, title: 'Закрыть семестр на одни пятерки', completed: false },
    { id: 8, title: 'Получить диплом', completed: false },
    { id: 9, title: 'Утроиться на работу', completed: false },
  ])
  const [filteredTodos, setFilteredTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [currentFilter, setCurrentFilter] = useState("All")
  useEffect(() => {
    if (currentFilter === "Done") {
      setFilteredTodos(
        todos.filter(todo => todo.completed === true)
      )
    } else if (currentFilter === "InProcess") {
      setFilteredTodos(
        todos.filter(todo => todo.completed === false)
      )
    } else {
      setFilteredTodos(todos)
    }
  }, [currentFilter, todos])

  function toggleTodo(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed }
        }
        return todo
      })
    )
  }

  function addTodo() {
    if (newTodo.trim() === '') return

    setTodos([
      ...todos,
      {
        id: Math.max(...todos.map(t => t.id), 0) + 1,
        title: newTodo,
        completed: false
      }
    ])
    setNewTodo('')
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="bg-gray-200 p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          📝 ToDo лист
        </h1>
        <div className="fitters bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
          <div className="flex flex-col space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer hover:bg-white px-3 py-2 rounded-lg transition-colors">
              <input
                type="radio"
                name="filter"
                checked={currentFilter === "Done"}
                onChange={() => setCurrentFilter('Done')}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 font-medium">✅ Выполненные</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer hover:bg-white px-3 py-2 rounded-lg transition-colors">
              <input
                type="radio"
                name="filter"
                checked={currentFilter === "InProcess"}
                onChange={() => setCurrentFilter('InProcess')}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 font-medium">⏳ В процессе</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer hover:bg-white px-3 py-2 rounded-lg transition-colors">
              <input
                type="radio"
                name="filter"
                checked={currentFilter === "All"}
                onChange={() => setCurrentFilter('All')}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 font-medium">📋 Все задачи</span>
            </label>
          </div>
        </div>
        <div className="space-y-3 mb-8">
          {filteredTodos.map(todo => (
            <div
              key={todo.id}
              className={`
                flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-200
                ${todo.completed
                  ? 'bg-green-50 border-green-200'
                  : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                }
              `}
            >
              <input
                onChange={() => toggleTodo(todo.id)}
                checked={todo.completed}
                type="checkbox"
                className="
                  w-5 h-5 text-blue-600 rounded focus:ring-blue-500 
                  border-gray-300 focus:ring-2
                "
              />
              <span className={`
                flex-1 text-lg font-medium transition-all
                ${todo.completed
                  ? 'text-gray-500 line-through'
                  : 'text-gray-800'
                }
              `}>
                {todo.title}
              </span>
              <button
                onClick={() => removeTodo(todo.id)}
                className="
                  px-3 py-2 bg-red-500 text-white rounded-lg 
                  hover:bg-red-600 transform hover:scale-105 
                  transition-all duration-200 font-medium
                "
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            ➕ Добавить дело
          </h2>
          <div className="flex space-x-3">
            <input
              type="text"
              value={newTodo}
              onChange={(event) => setNewTodo(event.target.value)}
              placeholder="Введите название дела..."
              className="
                flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl
                focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                outline-none transition-all duration-200
                placeholder:text-gray-400
              "
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <button
              onClick={() => addTodo()}
              className="
                px-6 py-3 bg-blue-500 text-white rounded-xl
                hover:bg-blue-600 transform hover:scale-105
                transition-all duration-200 font-bold
                shadow-lg hover:shadow-xl
              "
            >
              Добавить
            </button>
          </div>
        </div>
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Всего задач: <span className="font-bold">{todos.length}</span> |
            Выполнено: <span className="font-bold text-green-600">
              {todos.filter(t => t.completed).length}
            </span> |
            Осталось: <span className="font-bold text-orange-600">
              {todos.filter(t => !t.completed).length}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}