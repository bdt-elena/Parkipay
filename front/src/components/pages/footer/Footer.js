import './Footer.css';
import "bootstrap/dist/css/bootstrap.min.css";
import icon_fb from './icon_fb.png';
import icon_tw from './icon_tw.png';
import icon_wp from './icon_wp.png';

export function Footer(){
    return <>
    <footer>
        <div className="row py-5 row-app">
            <div className="col-6 container text-center">
                <p className="p-color">CONTACTANOS</p><br></br>
                <img className="img-pad" src={icon_fb} height="50px" width="50px"></img>
                <img className="img-pad" src={icon_tw} height="50px" width="50px"></img>
                <img className="img-pad" src={icon_wp} height="50px" width="50px"></img>
            </div>
            <div className="col-6 container text-center">
                <a className="style-a">Consulta los Términos y condiciones</a>
            </div>
        </div>
    </footer>
    </>}