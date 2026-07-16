import { Link } from "react-router-dom";
import { useState } from 'react';
import "./nav.css";
import {useNavigate} from 'react-router-dom'

function Nav({title}){

    const [open, setOpen] = useState(false)

    const Navigate = useNavigate()

    function Logout(){

        localStorage.removeItem("token")
        localStorage.clear();  
        Navigate('/Login')
    }



    return(
        <div>
            <div className="navbar">
                <button className="hamburger" onClick={() => setOpen(!open)}>☰</button>

                <h2>DropVaults</h2>

                <h1 className="Nav-H1" >{title}</h1>

                <button onClick={Logout} className = "Logout-button">Sign Out</button>
            </div>
            <div className = {open ? "sidebar active" : "sidebar"}>
                <button className="close" onClick={() => setOpen(false)}>❮</button>

                <div className="menu-links">
                    <Link className="link-individual" to="/">DropVaults</Link>
                    <Link className="link-individual" to="/Posts">Post</Link>
                    <Link className="link-individual" to="/Home">Home</Link>
                    <Link className="link-individual" to="/Aboutus">About Us</Link>
                </div>
            </div>
            
        </div>
    )
}

export default Nav