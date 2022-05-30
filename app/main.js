const { Builder, By, Key, until } = require("selenium-webdriver")
require("chromedriver");
const should = require('chai').should();
const dataConstant = require("./dataConstant.js")
const modulMain = require('./Module/ModulMain.js');

async function waitloadend(driver) {
    try {
        await driver.wait(until.elementIsNotVisible(driver.findElement(By.xpath(`//div[@id="isloadingpageformpc"]`))), 20000);
    } catch (error) { }
}

async function GetTag(driver, dtScan, dtSet) {

    await driver.get(dataConstant.webapi + "tms/tms-ordermanagesummaryv2");
    await driver.sleep(2000);
    await waitloadend(driver);
    // await driver.sleep(2000);

    //ติ๊กเลือก อันแรก

    await driver.wait(until.elementIsVisible(driver.findElement(By.id(`grd1-0`))), 5000).click();
    await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(`//button[@ng-click="PrintTrackingNo()"]`))), 5000).click();


}

run();

async function run() {
    describe('CASETEST01', async function () {
        var driver = new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        it('LoginPage', async function () {
            await modulMain.loginBrowser(driver);
        });


        it('GetTag', async function () {

            await GetTag(driver);

        });



        // it('Close', async function () {
        //     await modulMain.CloseBrowser(driver);
        // });

    });
}



module.exports = {
    GetTag
}