import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer, Header } from "./components/allComponents";
import { Home } from "./pages/allpages";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
