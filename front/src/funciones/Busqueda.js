export default async function Busqueda(busqueda) {
    document.cookie = "busqueda=" + busqueda + ";";
    window.location.href = "/Resultados_de_busqueda";
}
