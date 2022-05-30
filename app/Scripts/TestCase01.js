const { Builder, By, Key, until } = require("selenium-webdriver")
require("chromedriver");
const should = require('chai').should();
const modulMain = require('../Module/ModulMain.js');
const moduleC2C = require('../Module/ModulC2C.js');

run();

async function run() {
    describe('Create C2C', async function () {
        var driver = new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        it('LoginPage', async function () {
            await modulMain.loginBrowser(driver);
        });

        it('Create C2C', async function () {

            const dtAddJOb = [
                { name: "selenium 1", tel: "888888", address: "88/88", province: "เชียงราย", district: "แม่สาย", subDistrict: "เวียงพางคำ" },
                // { name: "selenium 2", tel: "888888", address: "88/88", province: "เชียงราย", district: "แม่สาย", subDistrict: "เวียงพางคำ" },
            ];

            const dtAddParcel = [
                { type: "ตู้เย็น", name: "10Q", amount: "1", unit: "ตู้" },
                { type: "ตู้เย็น", name: "10Q", amount: "1", unit: "ตู้" }
            ];

            await moduleC2C.CreateC2C(driver, dtAddJOb, dtAddParcel);
        });



        await driver.sleep(3000)





        // it('Close', async function () {
        //     await modulMain.CloseBrowser(driver);
        // });

    });
}

module.exports = {
    run
}
