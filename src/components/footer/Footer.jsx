import React from 'react'
import './footer.css'
import { FaFacebookMessenger } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
   <footer>

    <div className="footer-content">
        <p>
            &copy; 2025 Your E-Learning platform.All right reserved <br />
            made with ❤️💕 by <a href="https://github.com/Hariom-chaurashiya">STACKERS:connect@github</a>
        </p>
        <div className="social-links">

            <a href="https://www.facebook.com/profile.php?id=61575146745914"><FaFacebookMessenger/></a>
            <a href="https://chat.whatsapp.com/Hq50KnVEIpP3tuc9E2Eom7"><FaWhatsapp/></a>
            <a href="https://www.instagram.com/e_learning_resource_sharing?igsh=OXUzMGZkbDk0dW4z"><FaInstagramSquare/></a>
        </div>
    </div>
   </footer>
  )
}

export default Footer