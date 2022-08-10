import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import UserContext from "./contexts/UserContext";

import Navbar from "./components/Navbar"
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Create from "./pages/Create";
import Register from "./pages/Register";
import Login from "./pages/Login"
import Recipe from "./pages/Recipe";
import MyRecipes from "./pages/MyRecipes";
import Error from "./pages/Error";

function App() {
  return (
    <UserContext>
      <Router>
      <Navbar />
      <div className="container main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/recipes/:recipeid" element={<Recipe/>}/>
          <Route path="/myrecipes" element={<MyRecipes/>}/>
          <Route path="/*" element={<Error/>}/>
        </Routes>
      </div>
      <Footer />
    </Router>
    </UserContext>
    
  )
}

export default App;
