import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Nav from '../Nav.jsx'
import Footer from '../Components/Footer.jsx'
import './home.css'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css'

function Home(){

    const Navigate = useNavigate()

    const [posts, setPosts] = useState([])


    useEffect(() => {
        const token = localStorage.getItem("token");
        
        if (!token) {
            Navigate("/Login");
            return;
        }
        
        viewPosts(token);
    }, [Navigate]);


    async function viewPosts(token) {

        try{
            
            const Post_API = await axios.get("http://127.0.0.1:8000/Posts/search",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setPosts(Post_API.data);
        }

        catch(error){
            if(error.response?.status == 401){
                localStorage.removeItem("token")
                Navigate('/Login')
            }
        }
    }

    async function DeletePost(id){

        const token = localStorage.getItem("token")

        try{
            const delete_api = await axios.delete(`http://127.0.0.1:8000/Posts/delete/${id}`, 
                {
                    headers :{
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
        }
        catch(error){
            console.log(error)
        }

        viewPosts(token)
    }
    
    function DisplayFile({ post }) {

        const url = `http://127.0.0.1:8000/${post.Upload_File.replace(/\\/g, "/")}`;
        const extension = post.Upload_File.split(".").pop().toLowerCase();
        
        if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension)) {
            return (
            <div className="image-display">
                <img className="image-display" src={url} alt="Uploaded file" />
            </div>
            );
        }
        
        if (["mp4", "webm", "ogg"].includes(extension)) {
            return (
            <video controls width="300">
                <source className="image-display" src={url} />
            </video>
            );
        }
        
        if (["mp3", "wav"].includes(extension)) {
            return (
            <audio controls>
                <source className="image-display" src={url} />
            </audio>
            );
        }
        
        if (extension === "pdf") {
            return (
            <iframe className="image-display" src={url} width="300" height="230" title="PDF Viewer"/>
            );
        }
        
        return (
        <a href={url} target="_blank" rel="noreferrer">
            📄 Download {post.Upload_File.split("/").pop()}
        </a>
        );
    }
  

    return(
        <div>
        <Nav title={"Your Uploads"}/>
        <div className="main-container">
            {posts.map((post, index) => 
            <div key={post.Id} className="posts">
                <Dropdown className="drop-down-cont">
                    <Dropdown.Toggle variant="secondary" className="drop-down-toggle">
                        ⋮
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                        <Dropdown.Item className="dustbin-container" onClick={() => DeletePost(post.Id)}>
                            🗑️ Delete
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <h3 >{post.Title}</h3><br/>
                <p>{post.Content}</p><br/>
                <DisplayFile post={post} />
            </div>)}
        </div>
        </div>
    )
}

export default Home