export default async function getReservacion(){
    const response = await fetch(`http://localhost:3001/api/reserve/GetReservationUser`);
    const respJson = await response.json();
    if (respJson.success) {
        const response = await fetch(`http://localhost:3001/api/establecimientos/findById/`+ respJson.idEstablecimiento);
        const respJson2 = await response.json();
        if (respJson2.success) {
            var datos = {
                dataReservacion: respJson,
                dataEstacionamiento: respJson2
            }
            return datos;
        }
    }
}

export async function deleteReservacion(id){
    const response = await fetch(`http://localhost:3001/api/reserve/${id}`  ,
    {
        method: 'DELETE'
    }
    );
    const respJson = await response.json();
    if (respJson.success) {
        return respJson;
    }
    console.log("asd")
}

