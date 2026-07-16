import { useState } from 'react'
import Genpic from '../assets/GenPic.jpg'
import './users.css'
import axios from 'axios'
import Nav from '../Nav.jsx'
import Footer from '../Components/Footer.jsx'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'


function Users(){

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [reEnterPassword, setReEnterPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [details, setDetails] = useState([])

    const Navigate = useNavigate()

    function onChangeName(event){
        setName(event.target.value)
    }

    function onChangeEmail(event){
        setEmail(event.target.value)
    }

    function onChangePassword(event){
        setPassword(event.target.value)
    }

    function onChangeReEnterPassword(event){
        setReEnterPassword(event.target.value)
    }

    function onChangePhoneNumber(event){
        setPhoneNumber(event.target.value)
    }

    async function onClickHandle(event){
        event.preventDefault();

        if(name === ''){
            alert("Please Enter Name")
            return
        }

        if(email === ''){
            alert("Please Enter Email")
            return
        }

        if(password === ''){
            alert("Please Enter Password")
            return
        }

        if(reEnterPassword === ''){
            alert("Please Re-Enter-Password")
            return
        }

        if(phoneNumber === ''){
            alert("Please Enter PhoneNumber")
            return
        }


        if(password !== reEnterPassword){
            alert("Does not match password")
            return
        }

        if(!email.includes('@') || (!email.includes('.com') && !email.includes('.edu')))
        {
            alert("Invalid Email")
            return
        }

        if(password.length<=8 && password.length >=10){
            alert("Invalid Password")
            return
        }


        const input = {
            Name: name,
            Email: email,
            Password: password,
            Phone_Number: phoneNumber,
        }

        const Post_API = await axios.post("http://127.0.0.1:8000/Userss/Create", input)
        const data = Post_API.data

        setDetails(details => [...details, input])

        setName('')
        setEmail('')
        setPassword('')
        setReEnterPassword('')
        setPhoneNumber('')
    }


    const display = details.map((detail) => console.log("Hello"))

    function onClik(){
        Navigate('/Login')
    }



    return(
        <div className="Register-Main-container">
            <div className="Register-header-Cont">
                <h2>DropVaults</h2>
                <h1> Register Your Account </h1>
                <Link className="links-cont" to='/Login'>Login</Link>
            </div>
            <div className="Register-page-container">
                <div className="Image-container">
                    <img className="img-cont" src={Genpic} alt="Registration"></img>
                </div>
                <form className="Form-container" onSubmit={onClickHandle}>
                    <label className="Register-input-label"  htmlFor="name">Enter Name</label><br/>
                    <input className="Register-input" id="name" value={name} onChange={onChangeName} type= "text"></input>
                    <br/>
                    <label className="Register-input-label" htmlFor="email">Enter Email</label><br/>
                    <input className="Register-input" id="email" value={email} onChange={onChangeEmail} type="email"></input>
                    <br/>
                    <label className="Register-input-label" htmlFor="password">Enter Password</label><br/>
                    <input className="Register-input" id="password" value={password} onChange={onChangePassword} type="password"></input>
                    <br/>
                    <label className="Register-input-label" htmlFor = "reEnterPassword">Re-enter Password </label><br/>
                    <input className="Register-input" id="reEnterPassword" value={reEnterPassword} onChange={onChangeReEnterPassword} type="password"></input>
                    <br/>
                    <label className="Register-input-label" htmlFor="phoneNumber">Phone Number</label><br/>
                    <input className="Register-input" id="phoneNumber" value={phoneNumber} onChange={onChangePhoneNumber} type= "text"></input>
                    <br/>
                    <button className="Register-button" type="submit">Register</button>
                </form>
            </div>
        </div>
        
    )
} 

export default Users