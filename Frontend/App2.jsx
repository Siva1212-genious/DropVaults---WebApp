import { Routes, Route } from "react-router-dom";

import Nav from "./Nav.jsx";
import Login from "./Login.jsx";
import Users from "./Users.jsx";
import Posts from "./Posts.jsx";
import Home from './Home.jsx';
import Aboutus from './Aboutus.jsx'
import DataVaults from './DataVaults.jsx'
import Footer from './Footer.jsx'

function App2() {
  return (
    <div className="app">
      <div className="content">
        <Routes>
          <Route path="/" element={<DataVaults />} />
          <Route path="/DropVaults" element={<DataVaults />}></Route>
          <Route path="/Login" element={<Login />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/Posts" element={<Posts />} />
          <Route path = "/Home" element = {<Home/>}></Route>
          <Route path="/Aboutus" element={<Aboutus/>}></Route>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App2;