const { Builder, By, Key, until } = require("selenium-webdriver")
require("chromedriver");
const should = require('chai').should();
const modulMain = require('./Module/ModulMain.js');
const moduleScan = require('./Module/ModulScan.js');
const moduleC2C = require('./Module/ModulC2C.js');
// const dataConstant = require("../dataConstant.js")

//////////////

fn_CreateC2C();
//fn_Scan();

///////


async function fn_CreateC2C() {
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

        it('Close', async function () {
            await modulMain.CloseBrowser(driver);
        });

    });
}

async function fn_Scan() {
    describe('Open Scan', async function () {
        var driver = new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        it('LoginPage', async function () {
            await modulMain.loginBrowser(driver);
        });

        const dtScan = [
            "LPW02A0122052700019TG", "LPW02A0122052700020TG"
        ]

        it('scanLoadDc', async function () {
            const dtSet = { dc: "สำนักงานใหญ่" }
            await moduleScan.scanLoadDc(driver, dtScan, dtSet);
        });

        it('scanLoadOutDc', async function () {
            const dtSet = { dc: "สำนักงานใหญ่" }
            await moduleScan.scanLoadOutDc(driver, dtScan, dtSet);
        });

        it('scanLoadDcLastMile', async function () {
            const dtSet = {
                dc: "สำนักงานใหญ่",
                SubRoutelastmail: "ภาคเหนือ"
            }
            await moduleScan.scanLoadDcLastMile(driver, dtScan, dtSet);
        });


        it('Close', async function () {
            await modulMain.CloseBrowser(driver);
        });

    });
}




module.exports = {
    fn_CreateC2C, fn_Scan
}

