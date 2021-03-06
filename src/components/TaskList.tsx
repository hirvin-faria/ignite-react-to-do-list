import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'
//import { getRandomId } from '../utils/functions';

export function getRandomId(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};
interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(newTaskTitle.trim() !== "") {
      const newTask = {
        id: getRandomId(1000, 9999),
        title: newTaskTitle,
        isComplete: false
      };
  
      // trata atrasos na atualizacao do state utilizando-se uma funcao callback
      // recebe o state antigo e o dado a ser adicionado ao state
      setTasks(oldState => [...oldState, newTask]);
      setNewTaskTitle('');
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const taskList = tasks.map(task => {
      const { id: taskId, isComplete } = task;
      if(id === taskId) {
        return {
          ...task,
          isComplete: !isComplete
        }
      }
      return task;
    });

    setTasks(taskList);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const taskList = tasks.filter((task) => task.id !== id);
    setTasks(taskList);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}