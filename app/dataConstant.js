
const isplay = "DEV"
// const apidev = "http://localhost:8086/#/";
const apidev = "http://147.50.152.152:1150/tms-dev/WEB-TMS/#/";

const apiprod = "http://147.50.152.152:1150/tms/WEB-TMS/#/";

const webapi = isplay == "DEV" ? apidev : apiprod;

const urlLogin = webapi + "login"
const urlindex = webapi + "tms/index"


module.exports = {
    webapi, urlLogin, urlindex
}