import './datavaults.css'
import {Link} from 'react-router-dom'
import Working from '../assets/Working.jpg'
import Footer from '../Components/Footer.jsx'

function DataVault(){

    return(
        <div>
            <div className="header-page">
                <h2>DropVaults</h2>
                <h1>Main Page</h1>
                <div className = "header-links">
                    <Link className="links" to="/Login">Login</Link>
                </div>   
            </div>

            <div className = "mainpage-hero">
                <h1>Store Your Files Securely</h1>
                <p>
                    Upload, organize, and manage your documents,images, PDFs, Word files, Excel sheets,
                    and much more—all in one secure place.
                </p>

                <div className="hero-button">
                    <Link className="hero-link" to="/Users">Get Started</Link>
                    <Link className="hero-link" to="/Login">About Us</Link>
                </div>
                
            </div>

            <div className="Discription-cont">
                <div className="Para-cont">
                    <p className="Para-1"> 
                        Upload images, PDFs, Word documents,Excel sheets, presentations, and more.
                        Each upload includes a title and descriptionfor easy organization.
                        Easily upload and manage your digital content without worrying about file types. 
                        Add meaningful titles and descriptions to every upload, helping you keep your documents organized and making it simple to locate them later using the built-in search functionality.
                    </p>
                </div>
                <img className="working-img" src={Working} alt="Working Image"></img>
            </div>

            <div className="section-3">
                <h2>Why Choose DropVault?</h2>
                <p>
                   DropVault is designed to simplify file management by providing a secure, reliable, and user-friendly platform for storing your digital content. 
                   Whether you're saving personal documents, academic assignments, project files, images, PDFs, Word documents, Excel spreadsheets, presentations, or other important files, everything is organized in one convenient location.

                   After signing in, you can instantly access your uploaded files through a personalized dashboard, making it easy to browse and manage your content. 
                   Every upload can include a title and description, helping you keep your files well organized and easy to identify. 
                   With the built-in search functionality, you can quickly locate your posts by title or unique post ID, eliminating the need to scroll through large collections of files.

                   DropVault combines simplicity, security, and efficiency to deliver a seamless file management experience. 
                   Whether you're a student organizing coursework, a professional managing project documents, or simply someone who wants a secure place to store important files, DropVault makes uploading, finding, and managing your content fast and effortless.
                </p>
            </div>
            
        </div>
    )
}

export default DataVault