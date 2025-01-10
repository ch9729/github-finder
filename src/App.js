import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { GithubProvider } from "./context/github/GithubContext";
import Alert from "./components/layout/Alert";
import { useState } from "react";
import User from "./pages/User";

function App() {
  const [alert, setAlert] = useState("");

  const handleAlert = (msg) => {
    setAlert(msg);
    // 3초 뒤에 메세지 제거
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };
  return (
    <GithubProvider>
      <BrowserRouter>
        <div className="flex flex-col justify-between h-screen">
          <Navbar title={"Github Finder"} />
          <main className="container mx-auto px-3 pb-12">
            <Alert alert={alert} />
            <Routes>
              <Route path="/" element={<Home handleAlert={handleAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/user/:login" element={<User />} />
              <Route path="/notfound" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </GithubProvider>
  );
}

export default App;
