import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Template from "../../containers/Template";

import styles from "./SignUp.module.scss";

const  SignUp = () => {
  const navigate = useNavigate();

  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmationInputRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const name = nameInputRef.current.value.trim();
    const age = ageInputRef.current.value.trim();
    const email = emailInputRef.current.value.trim();
    const password = passwordInputRef.current.value.trim();
    const confirmation = passwordConfirmationInputRef.current.value.trim();
    

    if (!name || !age || !email || !password || !confirmation) {
      return Swal.fire({
        html: "dados pendentes",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    if (password !== confirmation) {
      return Swal.fire({
        html: "As senhas não conferem",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    if (age < 18) {
      return Swal.fire({ 
        html: "Você precisa ser maior de 18 anos",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  
    try {
      const user = { name, age, email, password };
      const response = await fetch("http://localhost:3333/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (data.error) {
        return Swal.fire({
          html: "Email já cadastrado",
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
        
      }
      Swal.fire({
        title: "casdastro realizado com sucesso",
        icon: "success",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2000,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        html: "não foi possivel adicionar o usuario",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } 

  return (
    <Template title="Cadastrar-se">
      <form className={styles.Form} onSubmit={handleSubmit}>
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          aria-describedby="name"
          placeholder="Digite seu nome"
          ref={nameInputRef}
        />
        <label htmlFor="age">Idade</label>
        <input
          type="number"
          id="age"
          min={0}
          aria-describedby="age"
          placeholder="Digite sua idade"
          ref={ageInputRef}
        />
        <label htmlFor="email">E-mail de Usuário</label>
        <input
          type="email"
          id="email"
          aria-describedby="email"
          placeholder="Digite seu email"
          ref={emailInputRef}
        />
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          placeholder="Digite sua senha"
          ref={passwordInputRef}
        />
        <label htmlFor="password_confirmation">Confirmação</label>
        <input
          type="password"
          id="password_confirmation"
          placeholder="Confirme sua senha"
          ref={passwordConfirmationInputRef}
        />
        <button type="submit">Cadastrar</button>
        <Link to="/"> voltar!</Link>
      </form>
    </Template>
  );
}

export default SignUp;
