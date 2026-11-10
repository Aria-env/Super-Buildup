
import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [currentPage, setCurrentPage] = useState("login");

  return (
    <>
      {currentPage === "login" ? (
        <Login onCreateAccount={() => setCurrentPage("register")} />
      ) : (
        <Register onSignIn={() => setCurrentPage("login")} />
      )}
    </>
  );
}

export default App;