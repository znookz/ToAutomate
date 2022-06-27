
const { Builder, By, Key, until } = require("selenium-webdriver")
require("chromedriver");
var should = require('chai').should();
const login = require('./Login.js');
const dataConstant = require("./dataConstant")
const gr = require("./CreateGR")



run();
async function run() {
    describe('Log in', async function () {
        var driver = new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();
        
        it('LoginPage', async function () {
            await login.loginBrowser(driver,"admintest","123456");
            //await gr.CreatGR (driver);
        }); 

        it('Create GR', async function () {
            await gr.CreatGR (driver);
        }); 
     
    });
}



module.exports = {
     run
}