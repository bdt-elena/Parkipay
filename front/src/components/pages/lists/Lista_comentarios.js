import "bootstrap/dist/css/bootstrap.min.css";
import styled from 'styled-components';

export function Lista_comentarios(props){

    const nombre = props.nombre;
    const contenido = props.contenido;

    return<>
    <Comentarios>
        <div className="info_coment">
            <img src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.webp"></img>
            <p className="p-username">{nombre}</p>
        </div>
        <p className="p-comentario-text">{contenido}</p>
        <hr></hr>
    </Comentarios>
    </>
}

const Comentarios = styled.div`

height: auto;
        width: 100%;
        background-color: rgb(228, 228, 228);
        padding: 20px;
        border-bottom: solid;
        border-width: 10px;
        border-color:  rgb(243, 243, 243);;

        .info_coment{
            display: flex;
        }

        img{
            width: 50px;
            height: 50px;
            border-radius: 50px;
        }
        .p-username{
            color: black;
            font-weight: bold;
            padding-top: 15px;
            padding-left: 10px;
        }
        .p-comentario-text{
            color: black;
            padding-top: 5px;
            font-weight: normal
        }

`;
