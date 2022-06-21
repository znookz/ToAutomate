const { Builder, By, Key, until } = require("selenium-webdriver")
require("chromedriver");
const should = require('chai').should();
const modulMain = require('../Module/ModulMain.js');
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
            id:"123456",prefix:"นาง",firstname:"ดอย",lastname:"คำ",idnumber:"1601234428978",tel:"0964455888",status:"Inactive",
            birthdate: { day: "20", mounth: "June", year: "1990" },//ถ้าจะแก้ไขส่วนนี้ต้องไปดูจำนวนการคลิกที่ Modul ด้วย
            startworkingdate: { day: "10", mounth: "June", year: "2022" }
        }

        it('CreateDriver', async function() {

            await modulMaster.CreateDriver(driver,dtAddText);
        });

        // it('Close', async function () {
        //     await modulMain.CloseBrowser(driver);
        // });

    });
}

module.exports = {
    run
}
