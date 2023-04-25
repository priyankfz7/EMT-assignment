import logo from "./logo.svg";
import "./App.css";
import AllRoutes from "./Components/AllRoutes";
import { Toaster } from "react-hot-toast";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            theme: {
              primary: "#4aed88",
            },
          },
        }}
      />
      <Navbar />
      <AllRoutes />
    </>
  );
}

export default App;
