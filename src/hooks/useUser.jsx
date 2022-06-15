import { useContext } from "react";
import { UserContext } from "../providers/UserProvider";

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};
