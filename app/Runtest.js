
const chrome = require('selenium-webdriver/chrome');
const { Builder, By, Key, until } = require("selenium-webdriver")
require("chromedriver");
var should = require('chai').should();
const login = require('./Login.js');
const dataConstant = require("./dataConstant.js")
const gr = require("./CreateGR.js")



run();
async function run() {
    describe('Log in', async function () {
        // var driver = new Builder().forBrowser("chrome").build();
        // driver.manage().window().maximize();
        //////// Set Option /////
    var options = new chrome.Options();
    options.addArguments([
         '--start-maximized', // เต็มจอ
        //'--headless', //รัดโดยไม่เปิดเว็ป
    ]);
    //ปิดว่าเปิดด้วย automate
    options.excludeSwitches('enable-automation')
    ////// End Set Option /////

    //เปิด เว็ป
    let driver = new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();
      
        
        it('LoginPage', async function () {
            await login.loginBrowser(driver,"admintest","123456");
            await login.waitloadend(driver, 2000);
        }); 

        
        it('Create GR', async function () {
            const header = {Dcn_No:"A47856", Inv_no:"GMS0201", Owner: "MERCEDES-BENZ", Vendor: "ไม่ระบุ",
            Documenttype: "นำเข้าจากต่างประเทศ(ใบขน0)", Warehouse: "คลังสินค้าเขตปลอดอากร", Vehicletype: "4 ล้อ", Licenseplate: "8กฮ7263"}
            await gr.CreateHeaderGR (driver, header); 
        }); 
     
    });
}



module.exports = {
     run
}