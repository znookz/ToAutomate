const { Builder, By, Key, until } = require("selenium-webdriver")
require("chromedriver");
const should = require('chai').should();
const modulMain = require('../Module/ModulMain.js');
const moduleC2C = require('../Module/ModulC2C.js');
const moduleScan = require('../Module/ModulScan.js');
const moduleTM = require('../Module/ModulTM.js');
const dataConstant = require("../dataConstant.js")

// 1.ผู้ส่ง คลองสาน ปลาย ลาดพร้าว eta ตามที่กำหนด
// 2.สแกนเข้าพื้นที่รับ ลาดพร้าว

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
                {
                    name: "บรูส แบรนเนอร์", tel: "0966654471", address: "550/12 รัสเวกัส ถนนโล่ง",
                    province: "กรุงเทพมหานคร", district: "ลาดพร้าว", subDistrict: "ลาดพร้าว",
                    eta: { day: "30", mounth: "June", year: "2022" }
                },
            ];

            const dtAddParcel = [
                { type: "Box", name: "M : กล่อง M", amount: "25", unit: "Box" },
                // { type: "ผ้ากิ๊บ", name: "SP02 : ผ้ากิ๊บใหญ่", amount: "1", unit: "ผ้ากิ๊บ" }
            ];

            const dtoption = { sameowneraddress: false }

            const dtAddTo = { name: "โทนี่ สตาร์ค", tel: "0966654472", address: "550/13 สตาร์คทาว์น ถนนติด", province: "กรุงเทพมหานคร", district: "คลองสาน", subDistrict: "คลองสาน" };

            TO_id = await moduleC2C.CreateC2C(driver, dtAddJOb, dtAddParcel, dtoption, dtAddTo);
            await modulMain.waitloadend(driver, 1000);
        });

        let dtScan = [];
        it('GetTag', async function () {
            dtScan = await moduleC2C.GetTag(driver, TO_id);
            await modulMain.waitloadend(driver, 1000);

            console.log("TO : ", TO_id, " - วันที่ : 10");
            console.log("TAG : ", dtScan.toString());
        });

        it('scanLoadDc', async function () {
            const dtSet = { dc: "ลาดพร้าว" }
            await moduleScan.scanLoadDc(driver, dtScan, dtSet);
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
