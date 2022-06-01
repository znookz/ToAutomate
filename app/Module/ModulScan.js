const { Builder, By, Key, until } = require("selenium-webdriver")
require("chromedriver");
const should = require('chai').should();
const dataConstant = require("../dataConstant.js")
const modulMain = require('../Module/ModulMain.js');

async function scanLoadCollectOwner(driver, dtScan, dtSet) {
    //goto
    await driver.get(dataConstant.webapi + "tms/tms.scanLoadCollectOwner")
    await modulMain.waitloadend(driver, 1000);
    //กรอก TM
    await driver.findElement(By.xpath(`//input[@ng-model="item.TransportManifest_No"]`)).sendKeys(dtSet.tm, Key.ENTER);
    await modulMain.waitloadend(driver, 2000);
    //กด เริ่มสแแกน
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="checkScan(1);"]`)), 10000).click();
    await modulMain.waitloadend(driver, 1000);

    async function loopscan() {
        for (let x in dtScan) {
            await driver.findElement(By.xpath(`//input[@ng-model="item.barcodeTag"]`)).sendKeys(dtScan[x], Key.ENTER);
            await modulMain.waitloadend(driver, 2000);
        }
    }
    await loopscan();

    //กด จบสแแกน
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="checkScan(2);"]`)), 10000).click();
    //ยืนยันบันทึก confirm
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Confirm"]/button[@ng-click="ok()"]`)), 10000).click();
    // เช็คว่า SUCCESS หรือไม่  และปิด alert
    await modulMain.waitloadend(driver, 1000);
    let eleee = await driver.wait(until.elementLocated(By.xpath(`//div[@id="title_Alert"]/h3`)), 10000);
    let foooo = await eleee.getText();
    foooo.trim().should.equal('สำเร็จ');
    await modulMain.waitloadend(driver, 2000);
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Alert"]/button[@ng-click="ok()"]`)), 10000).click();
}

async function scanLoadCollectDc(driver, dtScan, dtSet) {
    //goto
    await driver.get(dataConstant.webapi + "tms/tms.scanLoadCollectDc")
    await modulMain.waitloadend(driver, 1000);
    //กรอก TM
    await driver.findElement(By.xpath(`//input[@ng-model="item.TransportManifest_No"]`)).sendKeys(dtSet.tm, Key.ENTER);
    await modulMain.waitloadend(driver, 2000);
    //กด เริ่มสแแกน
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="checkScan(1);"]`)), 10000).click();
    await modulMain.waitloadend(driver, 1000);

    async function loopscan() {
        for (let x in dtScan) {
            await driver.findElement(By.xpath(`//input[@ng-model="item.barcodeTag"]`)).sendKeys(dtScan[x], Key.ENTER);
            await modulMain.waitloadend(driver, 2000);
        }
    }
    await loopscan();

    //กด จบสแแกน
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="checkScan(2);"]`)), 10000).click();
    //ยืนยันบันทึก confirm
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Confirm"]/button[@ng-click="ok()"]`)), 10000).click();
    // เช็คว่า SUCCESS หรือไม่  และปิด alert
    await modulMain.waitloadend(driver, 1000);
    let eleee = await driver.wait(until.elementLocated(By.xpath(`//div[@id="title_Alert"]/h3`)), 10000);
    let foooo = await eleee.getText();
    foooo.trim().should.equal('สำเร็จ');
    await modulMain.waitloadend(driver, 2000);
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Alert"]/button[@ng-click="ok()"]`)), 10000).click();
}

async function scanLoadDc(driver, dtScan, dtSet) {
    //goto
    await driver.get(dataConstant.webapi + "tms/tms.scanLoadDc")
    await modulMain.waitloadend(driver, 1000);
    //เลือก DC
    await driver.findElement(By.xpath(`//pc-dropdown-search[@datares="DistributionCenter_Current"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-search[@datares="DistributionCenter_Current"]/form/ul/li/a[contains(., "` + dtSet.dc + `")]`)), 10000).click();
    //กด เริ่มสแแกน
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="checkScan(1);"]`)), 10000).click();
    await modulMain.waitloadend(driver, 1000);

    async function loopscan() {
        for (let x in dtScan) {
            await driver.findElement(By.xpath(`//input[@ng-model="item.barcodeTag"]`)).sendKeys(dtScan[x], Key.ENTER);
            await modulMain.waitloadend(driver, 2000);
        }
    }
    await loopscan();

    //กด จบสแแกน
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="checkScan(2);"]`)), 10000).click();
    //ยืนยันบันทึก confirm
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Confirm"]/button[@ng-click="ok()"]`)), 10000).click();
    await modulMain.waitloadend(driver, 2000);
    let ele = await driver.wait(until.elementLocated(By.xpath(`//div[@id="title_Alert"]/h3`)), 10000);
    let foo = await ele.getText();
    foo.trim().should.equal('สำเร็จ');
    await modulMain.waitloadend(driver, 2000);
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Alert"]/button[@ng-click="ok()"]`)), 10000).click();


}

async function scanLoadOutDc(driver, dtScan, dtSet) {


    //goto
    await driver.get(dataConstant.webapi + "tms/tms.scanLoadOutDc")
    await modulMain.waitloadend(driver, 1000);
    //เลือก DC
    await driver.findElement(By.xpath(`//pc-dropdown-search[@datares="DistributionCenter_Current"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-search[@datares="DistributionCenter_Current"]/form/ul/li/a[contains(., "` + dtSet.dc + `")]`)), 10000).click();
    //กด เริ่มสแแกน
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="checkScan(1);"]`)), 10000).click();
    await modulMain.waitloadend(driver, 1000);

    async function loopscan() {
        for (let x in dtScan) {
            await driver.findElement(By.xpath(`//input[@ng-model="item.barcodeTag"]`)).sendKeys(dtScan[x], Key.ENTER);
            await modulMain.waitloadend(driver, 1000);
        }
    }
    await loopscan();

    //กด จบสแแกน
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="checkScan(2);"]`)), 10000).click();
    //ยืนยันบันทึก confirm
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Confirm"]/button[@ng-click="ok()"]`)), 10000).click();
    // เช็คว่า SUCCESS หรือไม่  และปิด alert
    await modulMain.waitloadend(driver, 1000);
    let elee = await driver.wait(until.elementLocated(By.xpath(`//div[@id="title_Alert"]/h3`)), 10000);
    let fooo = await elee.getText();
    fooo.trim().should.equal('สำเร็จ');
    await modulMain.waitloadend(driver, 2000);
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Alert"]/button[@ng-click="ok()"]`)), 10000).click();



}

async function scanLoadDcLastMile(driver, dtScan, dtSet) {


    //goto
    await driver.get(dataConstant.webapi + "tms/tms.scanLoadDcLastMile")
    await modulMain.waitloadend(driver, 1000);
    //เลือก DC
    await driver.findElement(By.xpath(`//pc-dropdown-search[@datares="DistributionCenter_Current"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-search[@datares="DistributionCenter_Current"]/form/ul/li/a[contains(., "` + dtSet.dc + `")]`)), 10000).click();
    //เลือก SubRoute
    await driver.findElement(By.xpath(`//pc-dropdown-search[@datares="SubRouteResult"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-search[@datares="SubRouteResult"]/form/ul/li/a[contains(., "` + dtSet.SubRoutelastmail + `")]`)), 10000).click();
    //กด เริ่มสแแกน
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="checkScan(1);"]`)), 10000).click();
    await modulMain.waitloadend(driver, 1000);

    async function loopscan() {
        for (let x in dtScan) {
            await driver.findElement(By.xpath(`//input[@ng-model="item.barcodeTag"]`)).sendKeys(dtScan[x], Key.ENTER);
            await modulMain.waitloadend(driver, 1000);
        }
    }
    await loopscan();

    //กด จบสแแกน
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="checkScan(2);"]`)), 10000).click();
    //ยืนยันบันทึก confirm
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Confirm"]/button[@ng-click="ok()"]`)), 10000).click();
    // เช็คว่า SUCCESS หรือไม่  และปิด alert
    await modulMain.waitloadend(driver, 1000);
    let eleee = await driver.wait(until.elementLocated(By.xpath(`//div[@id="title_Alert"]/h3`)), 10000);
    let foooo = await eleee.getText();
    foooo.trim().should.equal('สำเร็จ');
    await modulMain.waitloadend(driver, 2000);
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Alert"]/button[@ng-click="ok()"]`)), 10000).click();

}

async function scanLoadTm(driver, dtScan, dtSet) {
    //goto
    await driver.get(dataConstant.webapi + "tms/tms.scanLoadTm")
    await modulMain.waitloadend(driver, 1000);
    //กรอก TM
    await driver.findElement(By.xpath(`//input[@ng-model="item.TransportManifest_No"]`)).sendKeys(dtSet.tm, Key.ENTER);
    await modulMain.waitloadend(driver, 2000);
    //กด เริ่มสแแกน
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="checkScan(1);"]`)), 10000).click();
    await modulMain.waitloadend(driver, 1000);

    async function loopscan() {
        for (let x in dtScan) {
            await driver.findElement(By.xpath(`//input[@ng-model="item.barcodeTag"]`)).sendKeys(dtScan[x], Key.ENTER);
            await modulMain.waitloadend(driver, 2000);
        }
    }
    await loopscan();

    //กด จบสแแกน
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="checkScan(2);"]`)), 10000).click();
    //ยืนยันบันทึก confirm
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Confirm"]/button[@ng-click="ok()"]`)), 10000).click();
    // เช็คว่า SUCCESS หรือไม่  และปิด alert
    await modulMain.waitloadend(driver, 1000);
    let eleee = await driver.wait(until.elementLocated(By.xpath(`//div[@id="title_Alert"]/h3`)), 10000);
    let foooo = await eleee.getText();
    foooo.trim().should.equal('สำเร็จ');
    await modulMain.waitloadend(driver, 2000);
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Alert"]/button[@ng-click="ok()"]`)), 10000).click();
}

async function scanLoadOutTm(driver, dtScan, dtSet) {

    //goto
    await driver.get(dataConstant.webapi + "tms/tms.scanLoadOutTm")
    await modulMain.waitloadend(driver, 1000);
    //กรอก TM
    await driver.findElement(By.xpath(`//input[@ng-model="item.TransportManifest_No"]`)).sendKeys(dtSet.tm, Key.ENTER);
    await modulMain.waitloadend(driver, 2000);
    //กด เริ่มสแแกน
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="checkScan(1);"]`)), 10000).click();
    await modulMain.waitloadend(driver, 1000);

    async function loopscan() {
        for (let x in dtScan) {
            await driver.findElement(By.xpath(`//input[@ng-model="item.barcodeTag"]`)).sendKeys(dtScan[x], Key.ENTER);
            await modulMain.waitloadend(driver, 2000);
        }
    }
    await loopscan();

    //กด จบสแแกน
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="checkScan(2);"]`)), 10000).click();
    //ยืนยันบันทึก confirm
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Confirm"]/button[@ng-click="ok()"]`)), 10000).click();
    // เช็คว่า SUCCESS หรือไม่  และปิด alert
    await modulMain.waitloadend(driver, 1000);
    let eleee = await driver.wait(until.elementLocated(By.xpath(`//div[@id="title_Alert"]/h3`)), 10000);
    let foooo = await eleee.getText();
    foooo.trim().should.equal('สำเร็จ');
    await modulMain.waitloadend(driver, 2000);
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Alert"]/button[@ng-click="ok()"]`)), 10000).click();
}

async function scanLoadLastMile(driver, dtScan, dtSet) {


    //goto
    await driver.get(dataConstant.webapi + "tms/tms.scanLoadLastMile")
    await modulMain.waitloadend(driver, 1000);
    //กรอก TM
    await driver.findElement(By.xpath(`//input[@ng-model="item.TransportManifest_No"]`)).sendKeys(dtSet.tm, Key.ENTER);
    await modulMain.waitloadend(driver, 2000);
    //กด เริ่มสแแกน
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="checkScan(1);"]`)), 10000).click();
    await modulMain.waitloadend(driver, 1000);

    async function loopscan() {
        for (let x in dtScan) {
            await driver.findElement(By.xpath(`//input[@ng-model="item.barcodeTag"]`)).sendKeys(dtScan[x], Key.ENTER);
            await modulMain.waitloadend(driver, 2000);
        }
    }
    await loopscan();

    //กด จบสแแกน
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="checkScan(2);"]`)), 10000).click();
    //ยืนยันบันทึก confirm
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Confirm"]/button[@ng-click="ok()"]`)), 10000).click();
    // เช็คว่า SUCCESS หรือไม่  และปิด alert
    await modulMain.waitloadend(driver, 1000);
    let eleee = await driver.wait(until.elementLocated(By.xpath(`//div[@id="title_Alert"]/h3`)), 10000);
    let foooo = await eleee.getText();
    foooo.trim().should.equal('สำเร็จ');
    await modulMain.waitloadend(driver, 2000);
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Alert"]/button[@ng-click="ok()"]`)), 10000).click();


}

async function scanLoadLineHaul(driver, dtScan, dtSet) {

    //goto
    await driver.get(dataConstant.webapi + "tms/tms.scanLoadLineHaul")
    await modulMain.waitloadend(driver, 1000);
    //กรอก TM
    await driver.findElement(By.xpath(`//input[@ng-model="item.TransportManifest_No"]`)).sendKeys(dtSet.tm, Key.ENTER);
    await modulMain.waitloadend(driver, 2000);
    //กด เริ่มสแแกน
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="checkScan(1);"]`)), 10000).click();
    await modulMain.waitloadend(driver, 1000);

    async function loopscan() {
        for (let x in dtScan) {
            await driver.findElement(By.xpath(`//input[@ng-model="item.barcodeTag"]`)).sendKeys(dtScan[x], Key.ENTER);
            await modulMain.waitloadend(driver, 2000);
        }
    }
    await loopscan();

    //กด จบสแแกน
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="checkScan(2);"]`)), 10000).click();
    //ยืนยันบันทึก confirm
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Confirm"]/button[@ng-click="ok()"]`)), 10000).click();
    // เช็คว่า SUCCESS หรือไม่  และปิด alert
    await modulMain.waitloadend(driver, 1000);
    let eleee = await driver.wait(until.elementLocated(By.xpath(`//div[@id="title_Alert"]/h3`)), 10000);
    let foooo = await eleee.getText();
    foooo.trim().should.equal('สำเร็จ');
    await modulMain.waitloadend(driver, 2000);
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Alert"]/button[@ng-click="ok()"]`)), 10000).click();
}


module.exports = {
    scanLoadDc, scanLoadOutDc, scanLoadDcLastMile, scanLoadLastMile, scanLoadLineHaul, scanLoadOutTm, scanLoadCollectOwner, scanLoadCollectDc, scanLoadTm
}