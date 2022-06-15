import { createContext, useCallback, useState } from "react";
import Swal from "sweetalert2";
import { useAxios } from "../hooks/useAxios";
import UserService from "../services/user.service";

export const UserContext = createContext({});

export const UserProvider = ({children}) => { 
    const [user, setUser] = useState([]);

    const axiosInstance = useAxios();

    const addUser = useCallback(
        async (user) => {
          const userCopy = [...user];
          try {
            const userService = new UserService(axiosInstance);
            const newUser = await userService.add(user);
            userCopy.push(newUser);
            setUser(userCopy);
          } catch (error) {
            Swal.fire({
                html:"não foi possivel adicionar o usuario",
                icon: "error",
            })
          }
        },
        [axiosInstance, user]
      );
    return (
    <UserContext.Provider
        value={{
            addUser,
        }}
    >
        {children}
    </UserContext.Provider>
    );
}