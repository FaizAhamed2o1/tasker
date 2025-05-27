import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React Natives",
    description:
      "I want to learn React so that I can treat it like my slave and make it do whatever I want to do.",
    tags: ["web", "react", "js"],
    priority: "Medium",
    isFavorite: true,
  };

  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  function handleAddEditTask(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }
    setShowAddModal(false);
  }

  function handleEditTask(task) {
    setTaskToUpdate(task);
    setShowAddModal(true);
  }

  function handleCloseModal() {
    setShowAddModal(false);
    setTaskToUpdate(null);
  }

  function handleDeleteTask(taskId) {
    const tasksAfterDeletion = tasks.filter((task) => task.id !== taskId);
    setTasks(tasksAfterDeletion);
  }

  function handleDeleteAllClick() {
    tasks.length = 0;
    setTasks([...tasks]);
  }

  function handleFavorite(taskId) {
    // First e amra amader tasks array theke taskId (jei ta amader function er parameter theke ashtese) er index ta ber korbo.
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    // ekhon amra existing task er ekta copy banabo jeno oitake amra mutate korte pari.
    const newTasks = [...tasks];

    // ekhon amra 'newTask' array er specific oi index er object ta ke dhorbo jeitar index amra ber korsilam ar tar "isFavorite" property ta ke amra toggle krbo.
    newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite;

    // finally amra newTasks array ta ke setTasks er moddhe set kore dibo
    setTasks(newTasks);
  }

  function handleSearch(searchTerm) {
    console.log(searchTerm);

    // tasks array ke boltesi je tmi tmr prottekta task element er title er lowercase e dekho je amr searchTerm er lowercase ta ke contain kore ki na. Jeshob item contain kore, tader notun searchedItems array te return kore dao.
    const searchedItems = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setTasks([...searchedItems]);
  }

  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal
          onSave={handleAddEditTask}
          taskToUpdate={taskToUpdate}
          onCloseClick={handleCloseModal}
        />
      )}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchTask onSearch={handleSearch} />
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            onAddClick={() => setShowAddModal(true)}
            onDeleteAllClick={handleDeleteAllClick}
          />

          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onFav={handleFavorite}
            />
          ) : (
            <h2 className="text-center text-2xl text-white/70 mt-4">
              No tasks added.
            </h2>
          )}
        </div>
      </div>
    </section>
  );
}
