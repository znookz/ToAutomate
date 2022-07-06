

// const api = "http://localhost:8086/#/";
// const api = http://203.151.136.18/SahaTH_BD_WMS/#/";
//const api = "http://203.151.136.18/SahaTH_FZ_WMS/#/";
const api = "http://203.151.136.18/SahaTH_UAT_WMS/#/";

const webapi = api;

const urlLogin = webapi + "login"
const urlindex = webapi + "wms/index"
const urlGR = webapi + "wms/gr-summary"


module.exports = {
    webapi, urlLogin, urlindex, urlGR
}