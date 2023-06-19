import "bootstrap/dist/css/bootstrap.min.css";
import parkipaylogo from "./logoparkipay.png";

function App() {
  return (
    <div>
      <div className="header-app">
          <div className="text-center py-3">
            <img className="header-img-app" src={parkipaylogo}></img>
          </div>
      </div>
      <div className="nav-app">
        <div className="row-app">
            <div className="row py-3">
              <div className="col-8"></div>
              <div className="col-2 text-center">
                <a className="style-a">Iniciar Sesión</a>
              </div>
              <div className="col-2 text-center">
                <a className="style-a">Registrarse</a>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
