import React from 'react'
import "./style/footer.css"
const Footer = () => {
    return (
        <div  className='footer'>
            <div className=" footer-content">
                <h5>Redes Sociales</h5>
                <h6><i class="i bi bi-facebook"></i>Kevin Sebastian Ortiz Sarmiento</h6>
                <h6><i class="i bi bi-whatsapp"></i>322 9278936</h6>
                <h6><i class="i bi bi-instagram"></i>@kevinortiz_developer</h6>
            </div>
            <div className=" footer-content">
                <h5>Contacto</h5>
                <h6><i class="i bi bi-telephone-fill"></i>322 9278936</h6>
                <h6><i class="i bi bi-envelope-fill"></i>academica.application@gmail.com</h6>
            </div>
            <div className=" footer-content">
                <h5>Sitio Oficial</h5>
                <h6><i class="i bi bi-globe"></i>https://academica-application-front.herokuapp.com</h6>
                <h6><i class="i bi bi-globe"></i>https://red-academica.herokuapp.com</h6>
            </div>
        </div>
    )
}

export default Footer
