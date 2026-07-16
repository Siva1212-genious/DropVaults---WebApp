import {useState, useRef, useEffect} from 'react'
import './posts.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Nav from '../Nav.jsx'
import {Link} from 'react-router-dom'
import Footer from '../Components/Footer.jsx'


function Posts(){

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [file, setFile] = useState(null)
    const [details, setDetails] = useState([])

    const Navigate = useNavigate()
    
    useEffect(() => {
        const token = localStorage.getItem('token')

        if(!token){
            Navigate('/Login')
        }
    }, [Navigate])


    const fileRef = useRef(null)


    function onChangeTitle(event){
        setTitle(event.target.value)
    }

    function onChangeContent(event){
        setContent(event.target.value)
    }

    function onChangeFile(event){
        setFile(event.target.files[0])
    }

    async function handleClick(){


        const formData = new FormData()

        formData.append("Title", title)
        formData.append("Content", content)
        formData.append("Upload_File", file)

         const token = localStorage.getItem('token')

        try{
            const Post_API = await axios.post("http://127.0.0.1:8000/Postss/post" , formData,
                {
                    headers:{
                        Authorization : `Bearer ${token}`
                    }
                }
            )
            
            setDetails((details) => [...details, formData])
            
            
            setTitle('')
            setContent('')
            setFile(null)

            fileRef.current.value=""
        }

        catch(error){
            if(error.response?.status === 401){
                localStorage.removeItem("token")
                Navigate('/Login')
            }
        }
    }

    const display = details.map((detail,index) => console.log("Succesfully Posted"))

    function Logout(){
        localStorage.removeItem("token")
        Navigate('/Login')
    }

    return(
        <div className="post-main-container">
            
            <Nav title={"Posts Page"}/>
            <div className="post-page-container">
                <div className="Paragraph-container">
                    <h2 className="post-heading2"> Objective Of This App</h2>
                    <p className="post-paragraph">
                        Welcome to your personal digital storage space, where you can securely upload and manage all your important files in one place. 
                        Whether it's images, PDF files, Word documents, Excel spreadsheets, presentations, videos, or other supported file types, you can store them safely and access them whenever you need.
                    </p>
                    <p className="post-paragraph">
                        Each upload can include a title and a detailed description, making it easy to organize, search, and identify your files later. 
                        Whether you're saving cherished memories, work documents, study materials, certificates, or personal notes, everything remains neatly organized in your account.
                    </p>
                    <p className="post-paragraph">
                        Our goal is to provide a simple, reliable, and user-friendly experience. With just a few clicks, you can upload new content, browse your existing files, and keep your digital assets available whenever you need them. 
                        Your content is stored securely, giving you peace of mind while ensuring quick and convenient access from your account.
                    </p>
                    <p className="post-paragraph">
                        Start uploading today and create your own personal collection of files, documents, and memories—all stored in one secure and organized place.
                    </p>
                </div>
                
                <div className="post-input-container"> 
                    <label className='Label-container' htmlFor="title">Title</label><br/>
                    <input className="post-input" onChange={onChangeTitle} id="title" value={title} type="text" placeholder='Title'></input><br/>
                    <label className='Label-container' htmlFor="content">Content</label><br/>
                    <textarea className="textarea-input" onChange={onChangeContent} id="content" value={content} type="text" placeholder="Content"></textarea><br/>
                    <label className='Label-container' htmlFor="file">Select File</label><br/>
                    <input className="post-input" onChange={onChangeFile} id="file" ref={fileRef} type="file"></input><br/>
                    <button className="post-button" onClick={handleClick}>Post</button>
                </div>
            </div>
        </div>
    )
} 

export default Posts