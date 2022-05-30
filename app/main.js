const { Builder, By, Key, until } = require("selenium-webdriver")
require("chromedriver");
const should = require('chai').should();
const dataConstant = require("./dataConstant.js")
const modulMain = require('./Module/ModulMain.js');
const moduleScan = require('./Module/ModulScan.js');
const moduleGetTag = require('./Module/ModulGetTag.js');



run();

async function run() {
    describe('CASETEST01', async function () {
        var driver = new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        it('LoginPage', async function () {
            await modulMain.loginBrowser(driver);
        });

        let TmArray = [];
        it('GetTag', async function () {
            TmArray = await moduleGetTag.GetTag(driver);
        });

        it('scanLoadDc', async function () {
            const dtSet = { dc: "สำนักงานใหญ่" }
            console.log(TmArray);
            // await moduleScan.scanLoadDc(driver, TmArray, dtSet);
            // await driver.sleep(3000)
        });

        // it('Close', async function () {
        //     await modulMain.CloseBrowser(driver);
        // });

    });
}

