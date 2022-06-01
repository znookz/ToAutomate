const { Builder, By, Key, until } = require("selenium-webdriver")
require("chromedriver");
const should = require('chai').should();
const dataConstant = require("./dataConstant.js")
const modulMain = require('./Module/ModulMain.js');
const moduleScan = require('./Module/ModulScan.js');
const moduleC2C = require('./Module/ModulC2C.js');
const moduleTM = require('./Module/ModulTM.js');
const modulPlanReserve = require('./Module/ModulPlanReserve.js');



run();

async function run() {
    describe('CASETEST01', async function () {
        var driver = new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        it('LoginPage', async function () {
            await modulMain.loginBrowser(driver);
        });


        let plan_id = "";
        it('Create_PlanReserve', async function () {
            const dtSet = {
                dc: "สำนักงานใหญ่", dcto: "DC ลำปาง", vehicletype: "รถ 4 ล้อ",
                owner: "Lazada", shipto: "357 หมู่ที่ 12 ซ.สุข", number_of_vehicle: 2,
                day: "20", mounth: "July", year: "2022"
            }
            plan_id = await modulPlanReserve.Create_PlanReserve(driver, dtSet);
            await modulMain.waitloadend(driver, 2000);
        });

        it('Approe_PlanReserve', async function () {
            const dtSet = {
                id: plan_id, vehicletype: "รถ 4 ล้อ", number_of_vehicle_approve: 2
            }
            await modulPlanReserve.Approve_PlanReserve(driver, dtSet);
            await modulMain.waitloadend(driver, 2000);
        });

        // it('Close', async function () {
        //     await modulMain.CloseBrowser(driver);
        // });

    });
}

