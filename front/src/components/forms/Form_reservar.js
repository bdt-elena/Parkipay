import styled from 'styled-components';
import swal from 'sweetalert';
import { useHistory   } from 'react-router-dom';
import $ from 'jquery';
export function Form_reservar(props) {

  /*const  submitHandler = async(e) =>{

  }*/

  const history = useHistory();
  async function submitHandler(e) {
    e.preventDefault();
    const hourPrice = $('#hora').val();
  
    // For todays date;
  Date.prototype.today = function () { 
  
    return this.getFullYear() +"-"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"-"+((this.getDate() < 10)?"0":"") + this.getDate();
    //return ((this.getDate() < 10)?"0":"") + this.getDate() +"-"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"-"+ this.getFullYear();
  }

  // For the time now
  Date.prototype.timeNow = function () {
   return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes();
  }


  var datetime = new Date().today() + "T" + new Date().timeNow();
  
  //To Unix time
  var d1 = Date.parse(datetime)
  var d2 = Date.parse(hourPrice)
  
    if ( hourPrice === '') {
      swal('Favor de rellenar los campos faltantes');
    } else if(d2 < d1) {
      swal('No puedes agendar una cita en una fecha anterior a la de ahora');
    } else {
      const body = {
        idUser : props.idUser,
        idEstablecimiento : props.establecimientoID,
        establecimiento : props.name,
        cost: props.hourPrice.toString(),
        arrivingTime: hourPrice,
        active : true
      };
      console.log(body);

      const response = await fetch(
        `http://localhost:3001/api/reserve`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      const respJson = await response.json();
      console.log(respJson);
      history.push("/ver_reservas");
        
    }

  }


  console.log(props)

  return (
    <>
      <Reservacion>
      <form onSubmit={submitHandler}>
        <p className="p-aviso">Haz tu reservación fácil y rápido.</p>
        <div className="box-flex">
          <p>Hora de inicio</p>
          <input id="hora" type="datetime-local"></input>
        </div>
        <div className="box-flex">
          <p>Tarifa</p>
          <p>{props.hourPrice}$</p>
        </div>
        <input type="submit" value="Crear Reservacion"></input>
          </form>
      </Reservacion>
    </>
  );
}

const Reservacion = styled.div`
  .box-flex {
    display: flex;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .p-aviso {
    margin: 0px;
    padding: 5px;
    font-weight: bold;
  }

  p {
    padding: 5px;
    margin-left: 0px;
  }
`;
/*const Boton = styled.div`
  float: right;
  width: fit-content;
  background-color: rgb(201, 36, 36);
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 2vw;
  padding-right: 2vw;
  margin-top: 15px;
  border-radius: 5px;
  border-color: transparent;
  color: rgb(236, 242, 247);
  font-family: Herculanum, 'Eras Light ITC', sans-serif;

  &:hover {
    background-color: rgb(168, 30, 30);
  }
`;*/
