import { BrowserRouter } from "react-router-dom";
import Pages from "./pages";
import { AppProvider } from "./providers";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Pages />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
