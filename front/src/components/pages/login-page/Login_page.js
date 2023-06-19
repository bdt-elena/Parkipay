import "bootstrap/dist/css/bootstrap.min.css";
import './login_page.css';
import {Form_login} from '../../forms/Form_login.js';
import img from '../login-page/image.jpg';

export function Login_page(){

    return <>

        <div className="login">
            <div className="login__content">
                <div className="login__form">
                    <h3 className="">Inicia Sesion</h3>
  
                        <Form_login></Form_login>
                    
                </div>
            </div>

            <div>
              <img className="login__img" src={img}/>
            </div>
        </div>
    </>
}


/*
 */