const { Builder, By, Key, until } = require("selenium-webdriver")
require("chromedriver");
const should = require('chai').should();
const modulMain = require('../Module/ModulMain.js');
const moduleC2C = require('../Module/ModulC2C.js');
const moduleScan = require('../Module/ModulScan.js');
const moduleTM = require('../Module/ModulTM.js');
const dataConstant = require("../dataConstant.js")

// 1.สร้าง order คองสาน -> ลาดพร้าว
// 2.สแกน เข้าพื้นรับ สำนักงานใหญ่  
// 3.สแกนออก  สำนักงานใหญ่  
// 4.สแกนเข้าพื้นที่กระจาย สำนักงานใหญ่ ภาค กรุงเทพ
// 5.สร้างผน line haul ปลายทางกรุง ภาค กรุงเทพ   เลือก ลาดพร้าว ยืนยันแผน
// 6.สแกนขึ้น line haul
// 7.ปล่อยรถ
// 8.สแกนลงศูนย์ปลายทาง
// 9.สร้างแผน last mine ศูกรการจายเป็น ลาดพร้าว  รถขนส่งบริษัท  4กว  59013210
// 10.สแกนขึ้นรถ last mine

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
            const dtAddTo = { name: "selenium owner", tel: "888888", address: "88/88", province: "กรุงเทพมหานคร", district: "คลองสาน", subDistrict: "คลองสาน" };
            const dtAddJOb = [
                { name: "selenium 1", tel: "888888", address: "88/88", province: "กรุงเทพมหานคร", district: "ลาดพร้าว", subDistrict: "ลาดพร้าว" },
            ];

            const dtAddParcel = [
                { type: "ผ้ากิ๊บ", name: "SP01 : ผ้ากิ๊บเล็ก", amount: "1", unit: "ผ้ากิ๊บ" },
                { type: "ผ้ากิ๊บ", name: "SP02 : ผ้ากิ๊บใหญ่", amount: "1", unit: "ผ้ากิ๊บ" }
            ];

            const dtoption = { sameowneraddress: false }

            TO_id = await moduleC2C.CreateC2C(driver, dtAddJOb, dtAddParcel, dtoption, dtAddTo);
            await modulMain.waitloadend(driver, 1000);
        });

        let dtScan = [];
        it('GetTag', async function () {
            dtScan = await moduleC2C.GetTag(driver, TO_id);
            await modulMain.waitloadend(driver, 1000);
        });

        it('scanLoadDc', async function () {
            const dtSet = { dc: "สำนักงานใหญ่" }
            await moduleScan.scanLoadDc(driver, dtScan, dtSet);
            await modulMain.waitloadend(driver, 2000);
        });

        it('scanLoadOutDc', async function () {
            const dtSet = { dc: "สำนักงานใหญ่" }
            await moduleScan.scanLoadOutDc(driver, dtScan, dtSet);
            await modulMain.waitloadend(driver, 2000);
        });

        it('scanLoadDcLastMile', async function () {
            const dtSet = {
                dc: "สำนักงานใหญ่",
                SubRoutelastmail: "กรุงเทพและปริมณฑล"
            }
            await moduleScan.scanLoadDcLastMile(driver, dtScan, dtSet);
            await modulMain.waitloadend(driver, 2000);
        });


        let Tm_id = "";
        it('CreateTM_LineHaul', async function () {
            const dtSet = {
                dc: "สำนักงานใหญ่", dcform: "สำนักงานใหญ่", route: "กรุงเทพและปริมณฑล",
                subroute: "กรุงเทพและปริมณฑล", driver: "บักเก่ง แอบนอน", vehicle: "4กว4665", head_select: ["DC ลาดพร้าว"]
            }
            //  vehicleowner: "รถบริษัท"
            Tm_id = await moduleTM.CreateTM_LineHaul(driver, dtSet);
            await modulMain.waitloadend(driver, 2000);
        });

        it('scanLoadLineHaul', async function () {
            const dtSet = { tm: Tm_id }
            await moduleScan.scanLoadLineHaul(driver, dtScan, dtSet);
            await modulMain.waitloadend(driver, 2000);
        });

        it('DeliceyCarAndCloseAlertTM', async function () {
            await driver.get(dataConstant.webapi + "tms/assign-delivery-view");
            await modulMain.waitloadend(driver, 1000);
            await modulMain.waitloadend(driver, 1000);
            await moduleTM.DeliceyCarAndCloseAlertTM(driver, Tm_id);
        });

        it('scanLoadOutTm', async function () {
            const dtSet = { tm: Tm_id }
            await moduleScan.scanLoadOutTm(driver, dtScan, dtSet);
            await modulMain.waitloadend(driver, 2000);
        });

        let Tm_id2 = "";
        it('CreateTM_Lastmile', async function () {
            const dtSet = { dc: "สำนักงานใหญ่", dcform: "DC ลาดพร้าว", driver: "บักเก่ง แอบนอน", vehicle: "4กว4665" }
            Tm_id2 = await moduleTM.CreateTM_Lastmile(driver, dtSet);
            await modulMain.waitloadend(driver, 2000);
        });

        it('scanLoadLastMile', async function () {
            const dtSet = { tm: Tm_id2 }
            await moduleScan.scanLoadLastMile(driver, dtScan, dtSet);
            await modulMain.waitloadend(driver, 2000);
        });

        it('Close', async function () {
            await modulMain.CloseBrowser(driver);
        });

    });
}

module.exports = {
    run
}
