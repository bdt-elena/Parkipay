import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import styled from 'styled-components';

const Modal = ({children, estado, cambiarestado}) => {

    return (
        <>
        {estado && 
            <Overlay>
                <Contenedor_modal>
                    <Encabezado>
                        <h4>Editar Perfil</h4>
                    </Encabezado>

                    <BotonCerrar onClick={() => cambiarestado(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </BotonCerrar>
                    {children}
                </Contenedor_modal>
            </Overlay>  
        }
        </>
    );
};

export default Modal;

const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
    display: flex;
    align-items: center;
    justify-content: center;

`;

const Contenedor_modal = styled.div`

    width: 500px;
    min-height: 100px;
    background: #fff;
    position: relative;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    padding: 20px;

`;

const Encabezado = styled.div`

    display: felx;
    
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid gray;

    h4{
       
    }

    svg{
        width: 100%;
        height: 100%;
    }
`;

const BotonCerrar = styled.div`

    position: absolute;
    top: 15px;
    right: 20px;

    width: 30px;
    height: 30px;
    
    border: none;
    background: none;
    cursor: pointer;
    transition: .3s ease all;
    border-radius: 10px;
    color: gray;

    &:hover{
        background-color: rgb(228, 228, 228);
    }

`;