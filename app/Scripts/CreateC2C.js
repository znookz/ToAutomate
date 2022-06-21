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
                { name: "บรูส แบรนเนอร์", tel: "0966654471", address: "550/12 รัสเวกัส ถนนโล่ง", province: "กรุงเทพมหานคร", district: "ลาดพร้าว", subDistrict: "จรเข้บัว" },
                // { name: "selenium 2", tel: "888888", address: "88/88", province: "เชียงราย", district: "แม่สาย", subDistrict: "เวียงพางคำ" },
            ];

            const dtAddParcel = [
                { type: "Box", name: "M : กล่อง M", amount: "25", unit: "Box" },
                { type: "Box", name: "M : กล่อง M", amount: "30", unit: "Box" }
            ];

            await moduleC2C.CreateC2C(driver, dtAddJOb, dtAddParcel);
        });

        it('Close', async function () {
            await modulMain.CloseBrowser(driver);
        });

    });
}

module.exports = {
    run
}
