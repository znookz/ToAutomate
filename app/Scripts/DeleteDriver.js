const { Builder, By, Key, until } = require("selenium-webdriver")
require("chromedriver");
const should = require('chai').should();
const modulMain = require('../Module/ModulMain.js');
const dataConstant = require("../dataConstant.js")
const modulMaster = require('../Module/ModulMaster.js');

run();

async function run() {
    describe('Create C2C', async function () {
        var driver = new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        it('LoginPage', async function () {
            await modulMain.loginBrowser(driver);
        });

        const dtAddText = {
            id:"123456",status:"Inactive" //เปลี่ยน id ที่จะต้องการลบ
        }

        it('DeleteDriver', async function() {
            var i = 1 //เพิ่มจำนวนรอบ
            for (let index = 0; index < i; index++) {
            await modulMaster.DeleteDriver(driver,dtAddText);
            }
        });

        it('Close', async function () {
            await modulMain.CloseBrowser(driver);
        });

    });
}

module.exports = {
    run
}
