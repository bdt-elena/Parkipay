import "bootstrap/dist/css/bootstrap.min.css";
import parkipaylogo from "./logoparkipay.png";
import {
  Link
} from "react-router-dom";
import styled from 'styled-components';


function Header_useractive(){

  return<>
    <div>
      <Link to="/ver_reservas" className="style-a">Mis reservaciones</Link>
    </div>
    <div>
      <Link to="/perfil_de_usuario" className="style-a">
        <img className="foto-perfil" src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.webp" height="25" width="25"></img>
        Perfil de usaurio
      </Link>
    </div>
  </>
}
function Header_usernoactive(){

  return<>
    <div className="">
        <Link to="/login" className="style-a">Iniciar Sesión</Link>
    </div>
    <div className="">
        <Link to="/signin" className="style-a">Registrarse</Link>
    </div>
  </>
}


function Header_user_admin(){

  return<>
    <div>
        <Link to="/administrar_establecimientos" className="style-a">Establecimientos</Link>
    </div>
    <div>
        <Link to="/perfil_de_usuario" className="style-a">
          <img className="foto-perfil" src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.webp" height="25" width="25"></img>
          Perfil de usaurio
        </Link>
    </div>
  </>
}



export function Header({ user_active, user_dueño }){
    return <Header_style>
      
      <div className="header">
          <div className="text-center">
            <Link to="/"><img className="" src={parkipaylogo}></img></Link>
          </div>
      </div>
      
      <div className="navegador">
        <div className="contenedor">
          <div className="navegador__contenido"> 
              {user_dueño ? Header_user_admin() : user_active ? Header_useractive() : Header_usernoactive()
              //user_active? isadmin? Header_user_admin() : Header_useractive() : Header_usernoactive()
              }
          </div>
        </div>
      </div>


  </Header_style>
}

const Header_style = styled.div`

  .header{
    background-color: rgb(245, 245, 245);
    padding: 5px 0;
  }
  .header img{
    height: 3vh;
  }

  .navegador{
    background-color: rgb(031, 031, 031);
  }
  .navegador__contenido{
    margin-left: 20px;
    margin-right: 20px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    gap: 20px;
    padding: 5px 0;
  }
 
  @media (min-width: 468px){
    .navegador__contenido{
      display: flex;
      justify-content: end;
      gap: 20px;
      padding: 10px 0;
      align-items: center;
    }
  }

  .foto-perfil{
    margin: 5px;
    border-radius: 50%;
  }
  .contenedor{
    margin: 0 auto;
    width: 95%;
    max-width: 120rem;
  }

  

  /*

  input[type=search] {
      width: 20vw;
      border: 1px solid #555;
      padding: 3px;
      background-color: rgb(46, 46, 46);
      color: white;
      border-radius: 5px;
      font-size: 14px;
  }

 
  .foto-perfil{
    border-radius: 50px;
    margin-right: 15px;
  }

  p{
    color: white;
  }
  
   */
 
`;
