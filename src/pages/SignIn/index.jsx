import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Template from "../../containers/Template";
import { useAuth } from "../../hooks/useAuth";
import styles from "./SignIn.module.scss";
import Swal from "sweetalert2";

const SignIn = () => {
  const { signIn, isAuthenticated } = useAuth();
  const { signOut, user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!emailInputRef.current || !passwordInputRef.current) {
      return;
    }
    const email = emailInputRef.current.value.trim();
    const password = passwordInputRef.current.value.trim();

    if (!email || !password) {
      return Swal.fire({
        html: "Preencha todos os campos para continuar",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      
    }
    try {

      const response = await fetch("http://localhost:3333/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.user) {
        await signIn({ email, password });
        Swal.fire({
          title: `Bem vindo`,
          html: `Você está logado no usuário: ${data.user.name}`,
          icon: "success",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,

        })
        navigate("/home");
      } 
  
      else if (email || password !== data.email || data.password) {
        Swal.fire({
          title: "Erro ao logar",
          html: "e-mail ou senha incorreto",
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Erro",
        html: "Erro ao efetuar login",
        icon: "error",
        timer: 2000,
      });
    }

 
  };

  return (
    <Template title="Login">
      <form className={styles.Form} onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail de Usuário</label>
        <input
          type="email"
          id="email"
          aria-describedby="email"
          placeholder="Digite seu email"
          ref={emailInputRef}
        />
        <label htmlFor="Password">Senha</label>
        <input
          type="password"
          id="Password"
          placeholder="Digite sua senha"
          ref={passwordInputRef}
        />
        <button type="submit">Login</button>
        <Link to="/cadastro">Não tem cadastro, crie sua conta!</Link>
      </form>
    </Template>
  );
};

export default SignIn;
