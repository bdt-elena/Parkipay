import getCookie from '../../funciones/GetCookie.js';
import styled from 'styled-components';
import "bootstrap/dist/css/bootstrap.min.css";
import $ from 'jquery';

export function Form_comentar(props) {

  const id = props.id;


  async function commentHandler(e) {
    e.preventDefault();

    const contenido = $('#commentArea').val();

    if (contenido === '') return;

    //Seteado de cookies para sacar el nombre
    const name = getCookie("nombre");

    const body = {
      nombre: name,
      contenido: contenido
    };

    console.log(body);

    const response = await fetch(
      `http://localhost:3001/api/establecimientos/addResenia/${id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );

    const respJson = await response.json();
    console.log(respJson);
    window.location.reload();
  }


  return <>

    <Form_comnt>
      <textarea placeholder="Escribe un comentario..." rows="2" id="commentArea"></textarea>
      <Boton onClick={commentHandler}>Enviar comentario</Boton>
    </Form_comnt>

  </>
}

const Form_comnt = styled.div`

    padding-top: 10px;
    padding-bottom: 10px;

    textarea{
        background: none;
        border-radius: 0px;
        width: 100%;
    }
`;
const Boton = styled.div`

    float: right;
    width: fit-content;
    background-color: none;
    margin-top: 0px;
    border-color: transparent;
    color: gray;

    &:hover{
        color: black;
    }
`;
