const { Builder, By, Key, until } = require("selenium-webdriver")
require("chromedriver");
const should = require('chai').should();
const dataConstant = require("../dataConstant.js")

async function waitloadend(driver) {
    try {
        await driver.wait(until.elementIsNotVisible(driver.findElement(By.xpath(`//div[@id="isloadingpageformpc"]`))), 20000);
    } catch (error) { }
}

async function scanLoadDc(driver, dtScan, dtSet) {
    //goto
    await driver.get(dataConstant.webapi + "tms/tms.scanLoadDc")

    //เลือก DC
    await driver.findElement(By.xpath(`//pc-dropdown-search[@datares="DistributionCenter_Current"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-search[@datares="DistributionCenter_Current"]/form/ul/li/a[contains(., "` + dtSet.dc + `")]`)), 10000).click();
    //กด เริ่มสแแกน
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="checkScan(1);"]`)), 10000).click();
    await driver.sleep(1000);

    async function loopscan() {
        for (let x in dtScan) {
            await driver.findElement(By.xpath(`//input[@ng-model="item.barcodeTag"]`)).sendKeys(dtScan[x], Key.ENTER);
            await driver.sleep(1000);
            await waitloadend(driver);
        }
    }
    await loopscan();

    //กด จบสแแกน
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="checkScan(2);"]`)), 10000).click();
    //ยืนยันบันทึก confirm
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Confirm"]/button[@ng-click="ok()"]`)), 10000).click();
    // เช็คว่า SUCCESS หรือไม่  และปิด alert
    await driver.sleep(1000)
    await waitloadend(driver);
    let ele = await driver.wait(until.elementLocated(By.xpath(`//div[@id="title_Alert"]/h3`)), 10000);
    let foo = await ele.getText();
    foo.trim().should.equal('สำเร็จ');
    await driver.sleep(2000)
    await waitloadend(driver);
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Alert"]/button[@ng-click="ok()"]`)), 10000).click();


}

async function scanLoadOutDc(driver, dtScan, dtSet) {


    //goto
    await driver.get(dataConstant.webapi + "tms/tms.scanLoadOutDc")
    await driver.sleep(1000);
    await waitloadend(driver);
    //เลือก DC
    await driver.findElement(By.xpath(`//pc-dropdown-search[@datares="DistributionCenter_Current"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-search[@datares="DistributionCenter_Current"]/form/ul/li/a[contains(., "` + dtSet.dc + `")]`)), 10000).click();
    //กด เริ่มสแแกน
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="checkScan(1);"]`)), 10000).click();
    await driver.sleep(1000);

    async function loopscan() {
        for (let x in dtScan) {
            await driver.findElement(By.xpath(`//input[@ng-model="item.barcodeTag"]`)).sendKeys(dtScan[x], Key.ENTER);
            await driver.sleep(1000);
            await waitloadend(driver);
        }
    }
    await loopscan();

    //กด จบสแแกน
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="checkScan(2);"]`)), 10000).click();
    //ยืนยันบันทึก confirm
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Confirm"]/button[@ng-click="ok()"]`)), 10000).click();
    // เช็คว่า SUCCESS หรือไม่  และปิด alert
    await driver.sleep(1000)
    await waitloadend(driver);
    let elee = await driver.wait(until.elementLocated(By.xpath(`//div[@id="title_Alert"]/h3`)), 10000);
    let fooo = await elee.getText();
    fooo.trim().should.equal('สำเร็จ');
    await driver.sleep(2000)
    await waitloadend(driver);
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Alert"]/button[@ng-click="ok()"]`)), 10000).click();



}

async function scanLoadDcLastMile(driver, dtScan, dtSet) {


    //goto
    await driver.get(dataConstant.webapi + "tms/tms.scanLoadDcLastMile")

    //เลือก DC
    await driver.findElement(By.xpath(`//pc-dropdown-search[@datares="DistributionCenter_Current"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-search[@datares="DistributionCenter_Current"]/form/ul/li/a[contains(., "` + dtSet.dc + `")]`)), 10000).click();
    //เลือก SubRoute
    await driver.findElement(By.xpath(`//pc-dropdown-search[@datares="SubRouteResult"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-search[@datares="SubRouteResult"]/form/ul/li/a[contains(., "` + dtSet.SubRoutelastmail + `")]`)), 10000).click();
    //กด เริ่มสแแกน
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="checkScan(1);"]`)), 10000).click();
    await driver.sleep(1000);

    async function loopscan() {
        for (let x in dtScan) {
            await driver.findElement(By.xpath(`//input[@ng-model="item.barcodeTag"]`)).sendKeys(dtScan[x], Key.ENTER);
            await driver.sleep(1000);
            await waitloadend(driver);
        }
    }
    await loopscan();

    //กด จบสแแกน
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="checkScan(2);"]`)), 10000).click();
    //ยืนยันบันทึก confirm
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Confirm"]/button[@ng-click="ok()"]`)), 10000).click();
    // เช็คว่า SUCCESS หรือไม่  และปิด alert
    await driver.sleep(1000)
    await waitloadend(driver);
    let eleee = await driver.wait(until.elementLocated(By.xpath(`//div[@id="title_Alert"]/h3`)), 10000);
    let foooo = await eleee.getText();
    foooo.trim().should.equal('สำเร็จ');
    await driver.sleep(2000)
    await waitloadend(driver);
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Alert"]/button[@ng-click="ok()"]`)), 10000).click();

}

module.exports = {
    scanLoadDc, scanLoadOutDc, scanLoadDcLastMile
}