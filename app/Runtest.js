
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
      
        
        it('Login Page', async function () {
            await login.loginBrowser(driver,"adminkasco","123456");
            await login.waitloadend(driver, 2000);
        }); 

        
        it('Create GR', async function () {
            const header = {Dcn_No:"A47856", Inv_no:"GMS0201", Owner: "IRONMAN", Vendor: "ไม่ระบุ",DocumentType: "รับสินค้าทั่วไป", 
            Warehouse: "GPO-2", VehicleType: "4 ล้อ", LicensePlate: "ไม่ระบุ", Driver: "ไม่ระบุ", 
            MS_BillofLading: "", H_BillofLading: "", Currency: "USD", ExchangeRate: "35", ContainerSize: "", 
            Container_No: "C10000", Seal_No: "S8000", Vessel_Name: "Vermount", Flight_No: "F4786", PortofOrigin: "", PortofDestination: "",
            CountryOrigin: "", CountryDestination: "", Remark: ""   
            }

            const addItem =[{SKU: "Mercedes-Benz A200", Description: "", Status: "", ExchangeRatePrice: "50", Lot: "A1234", TariffCode: "2021010",
            QtyUnit: "10"
            }];
            await gr.CreateGR (driver, header, addItem); 
            //await gr.CreateGR (driver, header); 
        }); 

    
     
    });
}



module.exports = {
     run
}