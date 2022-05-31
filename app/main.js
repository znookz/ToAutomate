const { Builder, By, Key, until } = require("selenium-webdriver")
require("chromedriver");
const should = require('chai').should();
const dataConstant = require("./dataConstant.js")
const modulMain = require('./Module/ModulMain.js');
const moduleScan = require('./Module/ModulScan.js');
const moduleC2C = require('./Module/ModulC2C.js');
const moduleTM = require('./Module/ModulTM.js');



run();

async function run() {
    describe('CASETEST01', async function () {
        var driver = new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        it('LoginPage', async function () {
            await modulMain.loginBrowser(driver);
        });

        let Tm_id = "TMD22050031";
        it('DeliceyCarAndCloseAlertTM', async function () {
            await driver.get(dataConstant.webapi + "tms/assign-delivery-view");
            await modulMain.waitloadend(driver, 2000);
            await moduleTM.DeliceyCarAndCloseAlertTM(driver, Tm_id);
        });
        // placeholder="TMD22050027"


        // it('Close', async function () {
        //     await modulMain.CloseBrowser(driver);
        // });

    });
}

