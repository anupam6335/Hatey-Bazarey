import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Footer, Header, Productdetails } from "./components/allComponents";
import { Home } from "./pages/allpages";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/search/:keyword" element={<Home />} />
          <Route path="/product/:id" element={<Productdetails />} exact />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
