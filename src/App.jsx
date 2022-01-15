import { useSelector } from "react-redux";
import Public from "./routes/Public"
import Private from "./routes/Private";
import "./views/styles/home.css"
import { BrowserRouter} from "react-router-dom";
import Footer from "../src/components/Footer";
import NavBar from "../src/components/NavBar"

function App() {
  const { currentUser } = useSelector((state) => state.auth);
  
  return (
    <BrowserRouter>
    <div   className="app">
      <NavBar/>
      {currentUser?<Private/>:<Public/>}
      <Footer/>
      </div>
      
      </BrowserRouter>
  );
}

export default App;
