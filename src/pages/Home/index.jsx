import { useNavigate } from "react-router-dom";
import { TaskForm } from "../../components/TaskForm";
import TaskList from "../../components/TaskList";
import Template from "../../containers/Template";
import { useAuth } from "../../hooks/useAuth";
import { GoSignOut } from "react-icons/go";
import Swal from "sweetalert2";

const Home = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
   
      Swal.fire({
        title: "Você tem certeza?",
        text: "Você terá de logar novamente",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sim, desejo sair!",
        confirmButtonColor: "#3085d6",
      }).then(async (willDelete) => {
        if (willDelete.value) {
          
          Swal.fire({
            title: "saindo!",
            text: `até logo ${user.name} 👋`,
            timer: 2000,
          });
          await signOut();
          navigate("/");         

        } else {
          Swal.fire("Cancelado!", `feliz por continuar aqui ${user.name} 😁`);
        }
      })
  };
  return (
    <Template
      title="My Todo App"
      sideButton={
        <button type="button" onClick={handleLogout}>
          {user.name} <GoSignOut />
        </button>
      }
    >
      <TaskForm />
      <TaskList />
    </Template>
  );
};

export default Home;
