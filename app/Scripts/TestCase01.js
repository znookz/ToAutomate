const { Builder, By, Key, until } = require("selenium-webdriver")
require("chromedriver");
const should = require('chai').should();
const modulMain = require('../Module/ModulMain.js');
const moduleC2C = require('../Module/ModulC2C.js');
const moduleScan = require('../Module/ModulScan.js');
const moduleTM = require('../Module/ModulTM.js');
const dataConstant = require("../dataConstant.js")

run();
async function run() {
    describe('Create C2C', async function () {
        var driver = new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        it('LoginPage', async function () {
            await modulMain.loginBrowser(driver);
        });

        let TO_id = "";
        it('Create C2C', async function () {

            const dtAddJOb = [
                { name: "selenium 1", tel: "888888", address: "88/88", province: "เชียงราย", district: "แม่สาย", subDistrict: "เวียงพางคำ" },
                // { name: "selenium 2", tel: "888888", address: "88/88", province: "เชียงราย", district: "แม่สาย", subDistrict: "เวียงพางคำ" },
            ];

            const dtAddParcel = [
                { type: "ตู้เย็น", name: "10Q", amount: "1", unit: "ตู้" },
                { type: "ตู้เย็น", name: "10Q", amount: "1", unit: "ตู้" }
            ];

            TO_id = await moduleC2C.CreateC2C(driver, dtAddJOb, dtAddParcel);
            await modulMain.waitloadend(driver, 2000);
        });


        let dtScan = [];
        it('GetTag', async function () {
            dtScan = await moduleC2C.GetTag(driver, TO_id);
            await modulMain.waitloadend(driver, 2000);
        });


        it('scanLoadDc', async function () {
            const dtSet = { dc: "เชียงราย" }
            await moduleScan.scanLoadDc(driver, dtScan, dtSet);
            await modulMain.waitloadend(driver, 2000);
        });

        let Tm_id = "";
        it('CreateTM_Lastmile', async function () {
            const dtSet = { dc: "สำนักงานใหญ่", dcto: "DC เชียงราย", driver: "ชัชชาติ", vehicle: "4กว4444" }
            Tm_id = await moduleTM.CreateTM_Lastmile(driver, dtSet);
            await modulMain.waitloadend(driver, 2000);
        });

        it('scanLoadLastMile', async function () {
            const dtSet = { tm: Tm_id }
            await moduleScan.scanLoadLastMile(driver, dtScan, dtSet);
            await modulMain.waitloadend(driver, 2000);
        });

        it('DeliceyCarAndCloseAlertTM', async function () {
            await driver.get(dataConstant.webapi + "tms/assign-delivery-view");
            await modulMain.waitloadend(driver, 2000);
            await moduleTM.DeliceyCarAndCloseAlertTM(driver, Tm_id);
        });

        it('Close', async function () {
            await modulMain.CloseBrowser(driver);
        });

    });
}

module.exports = {
    run
}
