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

        it('Validate', async function () {
            await driver.get(dataConstant.webapi + "tms/transportation-information-tp-collect-customer-form");
            await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="saveTM();"]`)), 10000).click();
            await modulMain.waitloadend(driver, 1000);
            let sss = await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.DistributionCenterFrom"][@class="ng-isolate-scope validate-error"]`)), 10000);
            console.log(sss)
            await modulMain.SubModul.ValidateIsRed(driver);
        });

        // it('Create C2C', async function () {

        //     const dtAddJOb = [
        //         { name: "selenium 1", tel: "888888", address: "88/88", province: "เชียงราย", district: "แม่สาย", subDistrict: "เวียงพางคำ" },
        //         // { name: "selenium 2", tel: "888888", address: "88/88", province: "เชียงราย", district: "แม่สาย", subDistrict: "เวียงพางคำ" },
        //     ];

        //     const dtAddParcel = [
        //         { type: "ผ้ากิ๊บ", name: "SP01 : ผ้ากิ๊บเล็ก", amount: "1", unit: "ผ้ากิ๊บ" },
        //         { type: "ผ้ากิ๊บ", name: "SP02 : ผ้ากิ๊บใหญ่", amount: "1", unit: "ผ้ากิ๊บ" }
        //     ];

        //     await moduleC2C.CreateC2C(driver, dtAddJOb, dtAddParcel);
        // });

        // let plan_id = "";
        // it('Create_PlanReserve', async function () {
        //     const dtSet = {
        //         dc: "สำนักงานใหญ่", dcto: "DC ลำปาง", vehicletype: "รถ 4 ล้อ",
        //         owner: "Lazada", shipto: "357 หมู่ที่ 12 ซ.สุข", number_of_vehicle: 2,
        //         day: "20", mounth: "July", year: "2022"
        //     }
        //     plan_id = await modulPlanReserve.Create_PlanReserve(driver, dtSet);
        //     await modulMain.waitloadend(driver, 2000);
        // });

        // it('Approe_PlanReserve', async function () {
        //     const dtSet = {
        //         id: plan_id, vehicletype: "รถ 4 ล้อ", number_of_vehicle_approve: 2
        //     }
        //     await modulPlanReserve.Approve_PlanReserve(driver, dtSet);
        //     await modulMain.waitloadend(driver, 2000);
        // });

        // it('Close', async function () {
        //     await modulMain.CloseBrowser(driver);
        // });

        // });

        // describe("Test Login Web Site", function () {

        //     var driver;
        //     const urlSite = "http://147.50.152.152:1150/tms/WEB-TMS/#/"

        //     var dtfaill = [
        //         { user: 'asdasd', password: 'erwerw' },
        //         { user: 'ADMIN', password: 'erwerw' },
        //         { user: 'asdasd', password: 'ADMIN' },
        //     ]

        //     beforeEach(function () {
        //         //open browser
        //         driver = new Builder().forBrowser("chrome").build();
        //     })

        //     afterEach(async function () {
        //         //close browser
        //         await driver.quit();
        //     })

        //     dtfaill.forEach(({ user, password }) => {
        //         //it block
        //         it(`Test login fail user:${user} pass:${password}`, async function () {

        //             //navigate to our browser
        //             await driver.get(urlSite)

        //             //add a todo
        //             await driver.findElement(By.xpath('//input[@ng-model="loginData.User"]')).sendKeys(user);
        //             await driver.findElement(By.xpath('//input[@ng-model="loginData.Password"]')).sendKeys(password);

        //             await driver.findElement(By.xpath('//button[@ng-click="login(loginData.User,loginData.Password)"]')).sendKeys(Key.ENTER);

        //             let ele = await driver.wait(until.elementLocated(By.xpath("//div[@class='modal-body ng-scope']/h3")), 5000);
        //             let foo = await ele.getText();
        //             foo.should.equal('Login Fail "');


        //         });
        //     });

        //     it(`TEST Login PASS user: ADMIN , Pass: ADMIN`, async function () {

        //         //navigate to our browser
        //         await driver.get(urlSite)

        //         //add a todo
        //         await driver.findElement(By.xpath('//input[@ng-model="loginData.User"]')).sendKeys("ADMIN");
        //         await driver.findElement(By.xpath('//input[@ng-model="loginData.Password"]')).sendKeys("ADMIN");

        //         await driver.findElement(By.xpath('//button[@ng-click="login(loginData.User,loginData.Password)"]')).sendKeys(Key.ENTER);
        //         await driver.wait(until.urlContains('http://localhost:8086/#/tms/index'), 5000);


        //     });

    });

}

