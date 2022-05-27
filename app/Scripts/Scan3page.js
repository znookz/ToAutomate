

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
            "LPW02A0122052700044TG", "LPW02A0122052700045TG"
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
    run
}