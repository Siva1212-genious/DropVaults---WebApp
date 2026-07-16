import {useState} from 'react'
import './login.css'
import GenPic from '../assets/GenPic.jpg'
import axios from 'axios'
import Nav from '../Nav.jsx'
import {useNavigate} from 'react-router-dom'
import Footer from '../Components/Footer.jsx'
import {Link} from 'react-router-dom'

function Login(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [details, setDetails] = useState([])
    const Navigate = useNavigate()


    function onChangeEmail(event){
        setEmail(event.target.value)
    }

    function onChangePassword(event){
        setPassword(event.target.value)
    }

    async function onClick(event){
        event.preventDefault();

        const input = {
            Email: email,
            Password: password,
        }

        try{
            const Login_API = await axios.post("http://127.0.0.1:8000/Login", input)
            const data = Login_API.data

            localStorage.setItem("token", Login_API.data.Access_token);

            Navigate('/Home')

        }
        catch{
            alert("Un-Authorized Access!!")
        }


        setDetails(details => [...details, input])



        setEmail('')
        setPassword('')
    }

    const items = details.map((detail, index) => console.log("Login Succesfull!!"))


    function onClickRegister(){

        Navigate('/Users')
    }


    return(
        <div className="login-page-container">
            <div className=" login-header">
                <h2>DropVaults</h2>
                <h1 className="login-h1">Login To Your Account</h1>
                <Link className="header-link" to='/DropVaults'>Drop Vaults</Link>
            </div>
            <div className = "login-container">
                <div className="Image-Container">
                    <img src = {GenPic} alt="Image" className="login-image"></img>
                </div>
                <form className="input-containers" onSubmit={onClick}>
                    <label className="label-container" htmlFor="email">Enter Email </label><br/>
                    <input className="input-cont" id="email" onChange={onChangeEmail} value={email} type="email"></input><br/>
                    <label className="label-container" htmlFor="password">Enter Password</label><br/>
                    <input className="input-cont" id="password" onChange={onChangePassword} value={password} type="password"></input><br/>
                    <button className="button-container" type="submit">Login</button><br/>
                    <button className="button-container" onClick={onClickRegister}>Register</button>
                </form>
            </div>
        </div>
    )
} 

export default Login