const { Builder, By, Key, until } = require("selenium-webdriver")
require("chromedriver");
const should = require('chai').should();
const dataConstant = require("../dataConstant.js")
const modulMain = require('../Module/ModulMain.js');

async function DeliceyCarAndCloseAlertTM(driver, Tm_id) {
    await modulMain.waitloadend(driver, 1000);
    await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(`//input[@placeholder="` + Tm_id + `"]`))), 5000).click();
    await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(`//button[@ng-click="releaseTM();"]`))), 5000).click();
    //ยืนยันบันทึก confirm และปิด popup สำเร็จ
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Confirm"]/button[@ng-click="ok()"]`)), 10000).click();
    await modulMain.waitloadend(driver, 2000);
    let elee = await driver.wait(until.elementLocated(By.xpath(`//div[@id="body_Alert"]/h3`)), 10000).getText();
    elee.trim().should.equal('ปล่อยใบคุมรถ เสร็จสิ้น');
    await modulMain.waitloadend(driver, 1000);
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Alert"]/button[@ng-click="ok()"]`)), 10000).click();
}

async function confirmAndCloseAlertTM(driver, Tm_id) {
    await modulMain.waitloadend(driver, 1000);
    await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(`//input[@placeholder="` + Tm_id + `"]`))), 5000).click();
    await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(`//button[@ng-click="ConfirmStatusOnly();"]`))), 5000).click();
    //ยืนยันบันทึก confirm และปิด popup สำเร็จ
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Confirm"]/button[@ng-click="ok()"]`)), 10000).click();
    await modulMain.waitloadend(driver, 2000);
    let elee = await driver.wait(until.elementLocated(By.xpath(`//div[@id="title_Alert"]/h3`)), 10000).getText();
    elee.trim().should.equal('สำเร็จ');
    await modulMain.waitloadend(driver, 1000);
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Alert"]/button[@ng-click="ok()"]`)), 10000).click();
}

async function CreateTM_Lastmile(driver, dtSet) {
    await driver.get(dataConstant.webapi + "tms/transportation-information-tp-lastmile-form");
    await modulMain.waitloadend(driver, 2000);

    //เลือก DC
    await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.DistributionCenter"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.DistributionCenter"]/form/ul/li/a[contains(., "` + dtSet.dc + `")]`)), 10000).click();
    //เลือก ปลายทาง
    await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.DistributionCenterFrom"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.DistributionCenterFrom"]/form/ul/li/a[contains(., "` + dtSet.dcform + `")]`)), 10000).click();
    //เลือก ทะเบียนรถ
    await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.Vehicle"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.Vehicle"]/form/ul/li/a[contains(., "` + dtSet.vehicle + `")]`)), 10000).click();
    //เลือก คนขับ
    await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.Driver1"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.Driver1"]/form/ul/li/a[contains(., "` + dtSet.driver + `")]`)), 10000).click();

    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="saveTM();"]`)), 10000).click();
    await modulMain.waitloadend(driver, 2000);
    let ele = await driver.wait(until.elementLocated(By.xpath(`//div[@id="title_Alert"]/h3`)), 10000).getText();
    ele.trim().should.equal('สำเร็จ');
    let Tm_id = await driver.wait(until.elementLocated(By.xpath(`//div[@id="body_Alert"]/h3`)), 10000).getText();
    Tm_id = Tm_id.replace("บันทึกข้อมูลสำเร็จ เลขที่ใบคุม :", "");

    await modulMain.waitloadend(driver, 2000);
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Alert"]/button[@ng-click="ok()"]`)), 10000).click();
    await modulMain.waitloadend(driver, 1000);
    await confirmAndCloseAlertTM(driver, Tm_id);
    return Tm_id
}

async function CreateTM_LineHaul(driver, dtSet) {
    await driver.get(dataConstant.webapi + "tms/transportation-information-tp-transfer-form");
    await modulMain.waitloadend(driver, 2000);

    //เลือก พื้นที่กระจายปลายทาง 
    await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.Route"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.Route"]/form/ul/li/a[contains(., "` + dtSet.route + `")]`)), 10000).click();
    //เลือก ภูมิภาคที่กระจายปลายทาง
    await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.SubRoute"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.SubRoute"]/form/ul/li/a[contains(., "` + dtSet.subroute + `")]`)), 10000).click();
    //เลือก ศูนย์ที่ออกแผน
    await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.DistributionCenter"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.DistributionCenter"]/form/ul/li/a[contains(., "` + dtSet.dc + `")]`)), 10000).click();
    //เลือก ศูนย์ต้นทาง
    await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.DistributionCenterFrom"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.DistributionCenterFrom"]/form/ul/li/a[contains(., "` + dtSet.dcform + `")]`)), 10000).click();
    //เลือก คนขับ
    await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.Driver1"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.Driver1"]/form/ul/li/a[contains(., "` + dtSet.driver + `")]`)), 10000).click();
    //เลือก ทะเบียนรถ (หัว)
    await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.Vehicle"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.Vehicle"]/form/ul/li/a[contains(., "` + dtSet.vehicle + `")]`)), 10000).click();

    async function fnselectHeadDC() {
        //เลือก ศูนย์ปลายทางหัว selectHeadDC
        for (let headdc of dtSet.head_select) {
            driver.wait(until.elementIsVisible(driver.findElement(By.xpath(`//tbody[@ng-model="selectHeadDC"]/tr/td/div/input[@placeholder="` + headdc + `"]`))), 5000).click();
        }
        // await dtSet.head_select.forEach(element => {
        //     driver.wait(until.elementIsVisible(driver.findElement(By.xpath(`//tbody[@ng-model="selectHeadDC"]/tr/td/div/input[@placeholder="` + element + `"]`))), 5000).click();
        // });
    }

    await fnselectHeadDC();
    await modulMain.waitloadend(driver, 1000);
    //เลือก ทะเบียนรถ (หัว)
    //  await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.Tail"]/form/span`)).click();
    //  await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.Tail"]/form/ul/li/a[contains(., "` + dtSet.tail + `")]`)), 10000).click();
    //เลือก ศูนย์ปลายทางหาง selectTailDC
    //  dtSet.tail_select.forEach(element => {
    //     await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(`//tbody[@ng-model="selectHeadDC"]/tr/td/div/input[@placeholder="` + element + `"]`))), 5000).click();
    // });

    ///// CLICK SAVE TM
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="saveTM();"]`)), 10000).click();
    await modulMain.waitloadend(driver, 2000);
    let ele = await driver.wait(until.elementLocated(By.xpath(`//div[@id="title_Alert"]/h3`)), 10000).getText();
    ele.trim().should.equal('สำเร็จ');
    let Tm_id = await driver.wait(until.elementLocated(By.xpath(`//div[@id="body_Alert"]/h3`)), 10000).getText();
    Tm_id = Tm_id.replace("บันทึกข้อมูลสำเร็จ เลขที่ใบคุม :", "");
    await modulMain.waitloadend(driver, 2000);
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Alert"]/button[@ng-click="ok()"]`)), 10000).click();
    await modulMain.waitloadend(driver, 1000);
    await confirmAndCloseAlertTM(driver, Tm_id);
    return Tm_id
}

async function CreateTM_CollectFormCustomer(driver, dtSet) {
    await driver.get(dataConstant.webapi + "tms/transportation-information-tp-collect-customer-form");
    await modulMain.waitloadend(driver, 2000);

    //เลือก DC
    await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.DistributionCenter"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.DistributionCenter"]/form/ul/li/a[contains(., "` + dtSet.dc + `")]`)), 10000).click();
    //เลือก ปลายทาง
    await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.DistributionCenterFrom"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.DistributionCenterFrom"]/form/ul/li/a[contains(., "` + dtSet.dcform + `")]`)), 10000).click();
    //เลือก ทะเบียนรถ
    await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.Vehicle"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.Vehicle"]/form/ul/li/a[contains(., "` + dtSet.vehicle + `")]`)), 10000).click();
    //เลือก คนขับ
    await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.Driver1"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.Driver1"]/form/ul/li/a[contains(., "` + dtSet.driver + `")]`)), 10000).click();
    //เลือก ลูกค้า
    await driver.findElement(By.xpath(`//pc-dropdown-api-search[@datares="chooseDirective.Owner"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search[@datares="chooseDirective.Owner"]/form/ul/li/a[contains(., "` + dtSet.owner + `")]`)), 10000).click();

    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="saveTM();"]`)), 10000).click();
    await modulMain.waitloadend(driver, 2000);
    let ele = await driver.wait(until.elementLocated(By.xpath(`//div[@id="title_Alert"]/h3`)), 10000).getText();
    ele.trim().should.equal('สำเร็จ');
    let Tm_id = await driver.wait(until.elementLocated(By.xpath(`//div[@id="body_Alert"]/h3`)), 10000).getText();
    Tm_id = Tm_id.replace("บันทึกข้อมูลสำเร็จ เลขที่ใบคุม :", "");

    await modulMain.waitloadend(driver, 2000);
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Alert"]/button[@ng-click="ok()"]`)), 10000).click();
    await modulMain.waitloadend(driver, 1000);
    await confirmAndCloseAlertTM(driver, Tm_id);
    return Tm_id
};

async function CreateTM_CollectFormDC(driver, dtSet) {
    await driver.get(dataConstant.webapi + "tms/transportation-information-tp-collect-form");
    await modulMain.waitloadend(driver, 2000);

    //เลือก DC
    await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.DistributionCenter"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.DistributionCenter"]/form/ul/li/a[contains(., "` + dtSet.dc + `")]`)), 10000).click();
    //เลือก ปลายทาง
    await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.DistributionCenterFrom"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.DistributionCenterFrom"]/form/ul/li/a[contains(., "` + dtSet.dcform + `")]`)), 10000).click();
    //เลือก ทะเบียนรถ
    await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.Vehicle"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.Vehicle"]/form/ul/li/a[contains(., "` + dtSet.vehicle + `")]`)), 10000).click();
    //เลือก คนขับ
    await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.Driver1"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.Driver1"]/form/ul/li/a[contains(., "` + dtSet.driver + `")]`)), 10000).click();

    await modulMain.waitloadend(driver, 1000);
    //เลือก DC
    async function fnselectHeadDC() {
        //เลือก ศูนย์ปลายทางหัว selectHeadDC
        for (let headdc of dtSet.head_select) {
            driver.wait(until.elementIsVisible(driver.findElement(By.xpath(`//tbody[@ng-model="selectHeadDC"]/tr/td/div/input[@placeholder="` + headdc + `"]`))), 5000).click();
        }
    }

    await fnselectHeadDC();
    await modulMain.waitloadend(driver, 1000);

    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="saveTM();"]`)), 10000).click();
    await modulMain.waitloadend(driver, 2000);
    let ele = await driver.wait(until.elementLocated(By.xpath(`//div[@id="title_Alert"]/h3`)), 10000).getText();
    ele.trim().should.equal('สำเร็จ');
    let Tm_id = await driver.wait(until.elementLocated(By.xpath(`//div[@id="body_Alert"]/h3`)), 10000).getText();
    Tm_id = Tm_id.replace("บันทึกข้อมูลสำเร็จ เลขที่ใบคุม :", "");

    await modulMain.waitloadend(driver, 2000);
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Alert"]/button[@ng-click="ok()"]`)), 10000).click();
    await modulMain.waitloadend(driver, 1000);
    await confirmAndCloseAlertTM(driver, Tm_id);
    return Tm_id
};

module.exports = {
    CreateTM_Lastmile, CreateTM_LineHaul, DeliceyCarAndCloseAlertTM, confirmAndCloseAlertTM, CreateTM_CollectFormCustomer, CreateTM_CollectFormDC
}