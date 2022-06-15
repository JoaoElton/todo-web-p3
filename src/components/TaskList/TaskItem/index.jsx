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
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sim, remova!",
      confirmButtonColor: "#3085d6",
    }) .then ( async (willDelete) => {
      if (willDelete.value) {
        await removeTask(_id);
       const Toast = Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 2000,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          }
        });
        Toast.fire({
          icon: "success",
          iconColor: "#00FF00",
          title: "Tarefa removida com sucesso",
        });

      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 2000,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          }
        });
        Toast.fire({
          icon: "error",
          iconColor: "#B22222",
          title: "Sua tarefa esta a salvo 😁",
        });
      }
    })

  }

  const handleSave = () => {
    const modifiedTask = { ...task, description: name };
    updateTask(modifiedTask);
    setEdit(false);
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 2000,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      }
    });
    Toast.fire({
      icon: "success",
      iconColor: "#00FF00",
      title: "Tarefa atualizada com sucesso",
    });
    
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
