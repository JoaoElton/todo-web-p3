import { useContext, useRef } from "react";
import { TasksContext } from "../../providers/TaskProvider";
import styles from "./TaskForm.module.scss";
import Swal from 'sweetalert2'

export const TaskForm = () => {
  const { addTask } = useContext(TasksContext);

  const inputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const { current: input } = inputRef;

    if (!input || input.value.trim().length === 0) {
      return;
    }

    const task = {
      description: input.value.trim(),
      completed: false,
    };

    addTask(task);
    input.value = "";
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
      title: "Tarefa adicionada com sucesso",
    });
  };

 
  return (
    <div className={styles.Container}>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} />
        <button type="submit" >Criar</button>
      </form>
    </div>
  );
};
