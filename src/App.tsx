import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Components/Header";

function App() {
  return (
    <Router>
      <Header/>
      <Route path = "/" element={<Home/>}/>
      <Route path = "/tv" element={<Tv/>}/>
      <Route path = "/search" element={<Search/>}/>
       
    </Router>
  );
}

export default App;
