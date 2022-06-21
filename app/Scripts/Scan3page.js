

const { Builder, By, Key, until } = require("selenium-webdriver")
require("chromedriver");
const should = require('chai').should();
const modulMain = require('../Module/ModulMain.js');
const moduleScan = require('../Module/ModulScan.js');

run();

async function run() {

    describe('Open Scan', async function () {
        var driver = new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        it('LoginPage', async function () {
            await modulMain.loginBrowser(driver);
        });

        const dtScan = [
            "LPW02A0122062100001TG", "LPW02A0122062100002TG"
        ]

        it('scanLoadDc', async function () {
            const dtSet = { dc: "สำนักงานใหญ่" }
            await moduleScan.scanLoadDc(driver, dtScan, dtSet);
            await driver.sleep(3000)
        });

        it('scanLoadOutDc', async function () {
            const dtSet = { dc: "สำนักงานใหญ่" }
            await moduleScan.scanLoadOutDc(driver, dtScan, dtSet);
            await driver.sleep(3000)
        });

        it('scanLoadDcLastMile', async function () {
            const dtSet = {
                dc: "สำนักงานใหญ่",
                SubRoutelastmail: "ภาคเหนือ"
            }
            await moduleScan.scanLoadDcLastMile(driver, dtScan, dtSet);
            await driver.sleep(3000)
        });


        it('Close', async function () {
            await modulMain.CloseBrowser(driver);
        });

    });
}



module.exports = {
    run
}