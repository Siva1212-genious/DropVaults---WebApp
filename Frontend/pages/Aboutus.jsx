import Nav from '../Nav.jsx'
import './aboutus.css'
import Droplets from '../assets/Droplets.jpeg'
import robo from '../assets/robo.jpg'
import Footer from '../Components/Footer.jsx'


function Aboutus(){

    return(
        <div>
            <Nav title={"About Us"}/>
            <div className="hero">
                <h1>Secure. Simple. Yours.</h1>

                <p>
                    Every upload is safely stored inside your own personal vault.
                </p>
            </div>
            <div className="Aboutus-Main-Container">

                <section className="Section-1">
                    <div className="Welcome-Dropvaults-container">
                        <h2> Welcome To DropVaults </h2>

                        <p>
                            Welcome to DropVaults, your personal digital sanctuary for secure file storage and chronological post tracking.
                            We believe that your data belongs to you, which is why our platform is designed to give every registered user their own isolated,
                            private digital vault. 
                        </p>
                    </div>
                    <img src={Droplets} className="Image-Container1" alt="AboutUs Image"></img>
                </section>

                <section className="Section-2">
                    <img src={robo} className="Image-Container2" alt="Aboutus Image2"></img>

                    <div className="Why-Dropvaults-container">
                        <h2>Your Personal Time-Line</h2>
                        <p>
                            Once you log in, you are greeted by a clean, unified dashboard featuring your complete history of uploads, 
                            allowing you to seamlessly look back through everything you have saved. 
                            We view every single file, document, or image you upload as a unique, valuable data point—a Droplet—safely housed within your personal vault framework. 
                            Built with a focus on absolute privacy, intuitive navigation, and reliable performance, DropVaults transforms chaotic file sharing into a beautifully organized, secure streaming timeline tailored exclusively to you.
                        </p>
                    </div>
                </section>

                <section className="Section-3">
                    <div className="Why-Dropvaults-container">
                        <h2>Why DropVaults?</h2>
                        <p>
                            In an era where cloud storage feels crowded, complicated, and overly commercial, we wanted to build something simpler. 
                            DropVaults was founded on the principle of minimal overhead and maximal clarity. 
                            We don't sell your data, track your browsing behavior, or clutter your interface with unnecessary features. 
                            Our mission is to provide an elegant, distraction-free environment where your files are securely tucked away, yet instantly accessible whenever you need them. 
                            One vault per user. Zero complications.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Aboutus