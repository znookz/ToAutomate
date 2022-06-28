
const { Builder, By, Key, until } = require("selenium-webdriver")
require("chromedriver");
var should = require('chai').should();
const login = require('./Login.js');
const dataConstant = require("./dataConstant.js")
const gr = require("./CreateGR.js")



run();
async function run() {
    describe('Log in', async function () {
        var driver = new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();
        
        
        it('LoginPage', async function () {
            await login.loginBrowser(driver,"admintest","123456");
            await login.waitloadend(driver, 2000);
        }); 

        
        it('Create GR', async function () {
            const header = {Dcn_No:"A47856", Inv_no:"GMS0201", Owner: "MARSHALL CREEK", Vendor : "",
            Documenttype : "นำเข้าจากต่างประเทศ(ใบขน0)"}
            await gr.CreateHeaderGR (driver, header); 
        }); 
     
    });
}



module.exports = {
     run
}