
const { Builder, By, Key, until } = require("selenium-webdriver")
require("chromedriver");
var should = require('chai').should();
const login = require('./Login.js');
const dataConstant = require("./dataConstant")

run();
async function run() {
    describe('Log in', async function () {
        var driver = new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        it('LoginPage', async function () {
            await login.loginBrowser(driver,"admintest","123456");
        });  
    });
}



module.exports = {
     run
}