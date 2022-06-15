import { AuthProvider } from "./AuthProvider";
import { TaskProvider } from "./TaskProvider";
import { UserProvider } from "./UserProvider";

export const AppProvider = ({ children }) => (
  <>
    <UserProvider/>
    <AuthProvider>
      <TaskProvider>{children}</TaskProvider>
    </AuthProvider>
  </>
);
