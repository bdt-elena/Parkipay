import "bootstrap/dist/css/bootstrap.min.css";
import "../login-page/login_page.css";
import { Form_register } from '../../forms/Form_register.js';
import img from '../login-page/image.jpg';
//import axios from "axios"
//import { useEffect } from "react";

export function Registro_page(){
   /* const[posts,setPosts] = useState([]);

    useEffect(()=>{
        const fetchPosts = async ()=>{
            const res =  await axios.get("/");
            console.log(res)
        }
    },[])*/
    return <>
         <div className="login">
            <div className="login__content">
                <div className="login__form">
                    <h3 className="">Registro de Usuarios</h3>
                    
                        <Form_register></Form_register>
                    
                </div>
            </div>

            
            <div>
              <img className="login__img" src={img}/>
            </div>
        </div>
    </>
}
