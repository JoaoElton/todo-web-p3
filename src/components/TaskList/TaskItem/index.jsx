import { useState } from "react";
import Swal from "sweetalert2";
import { useTasks } from "../../../hooks/useTasks";
import styles from "./TaskItem.module.scss";

const TaskItem = ({ task }) => {
  const { removeTask, updateTask } = useTasks();
  const { _id, description, completed } = task;
  const [name, setName] = useState(description);

  const [edit, setEdit] = useState(false);

  const handleCheckboxChange = (event) => {
    const modifiedTask = { ...task, completed: !completed };
    updateTask(modifiedTask);
  };

  const handleRemove = () => {
 
    Swal.fire({
      title: "Você tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, remova!",
      confirmButtonColor: "#3085d6",
    }) .then ( async (willDelete) => {
      if (willDelete.value) {
        await removeTask(_id);
        Swal.fire("Deletado!", "Sua Task foi removida com sucesso!", "success");
      } else {
        Swal.fire("Cancelado!", "Sua Task esta a salvo 😃", "error");
      }
    })

  }

  const handleSave = () => {
    const modifiedTask = { ...task, description: name };
    updateTask(modifiedTask);
    setEdit(false);
    Swal.fire({
      title: "Tarefa atualizada!",
      html: "Sua tarefa foi atualizada com sucesso!",
      icon: "success",
      timer: 3000,
    })
  };

  const renderDescription = () => {
    if (edit) {
      return (
        <>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <button onClick={handleSave}>💾</button>
        </>
      );
    }
    return (
      <>
        <span className={completed ? styles.marked : ""}>{description}</span>
        <button onClick={() => setEdit(true)}>✒️</button>
      </>
    );
  };

  return (
    <li className={styles.Item}>
      <input
        type="checkbox"
        name={`task-${_id}`}
        checked={completed}
        onChange={handleCheckboxChange}
      />
      {renderDescription()}
      <button onClick={handleRemove}>🗑️</button>
    </li>
  );
};

export default TaskItem;
