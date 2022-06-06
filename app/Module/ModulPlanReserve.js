const { Builder, By, Key, until } = require("selenium-webdriver")
require("chromedriver");
const should = require('chai').should();
const dataConstant = require("../dataConstant.js")
const modulMain = require('../Module/ModulMain.js');

async function confirmPlan(driver, plan_id) {
    await modulMain.waitloadend(driver, 1000);
    await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(`//button[@ng-click="confirm(data,'confirm')"][@placeholder="` + plan_id + `"]`))), 5000).click();
    //ยืนยันบันทึก confirm และปิด popup สำเร็จ
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Confirm"]/button[@ng-click="ok()"]`)), 10000).click();
    await modulMain.waitloadend(driver, 1000);
    let elee = await driver.wait(until.elementLocated(By.xpath(`//div[@id="body_Alert"]/h3`)), 10000).getText();
    elee.trim().should.equal('สำเร็จ');
    await modulMain.waitloadend(driver, 1000);
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Alert"]/button[@ng-click="ok()"]`)), 10000).click();
}

async function Create_PlanReserve(driver, dtSet) {
    await driver.get(dataConstant.webapi + "tms/PlanReserveSummary");
    await modulMain.waitloadend(driver, 2000);
    await driver.wait(until.elementLocated(By.xpath('//button[@ng-click="create()"]')), 20000).click();
    await driver.wait(until.elementLocated(By.xpath('//input[@id="distributionCenter"]')), 10000).click();
    //เลือกศูนย์ที่ออกแผน
    await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@id="'distributionCenter'"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@id="'distributionCenter'"]/form/ul/li/a[contains(., "` + dtSet.dc + `")]`)), 10000).click();
    //เลือก ศูนย์ปลายทาง (สินค้าเข้า)
    await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@id="'distributionCenterto'"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@id="'distributionCenterto'"]/form/ul/li/a[contains(., "` + dtSet.dcto + `")]`)), 10000).click();
    //เลือก ประเภทรถ
    await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@id="'VehicleType'"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@id="'VehicleType'"]/form/ul/li/a[contains(., "` + dtSet.vehicletype + `")]`)), 10000).click();
    //เลือก รหัสลูกค้า
    await driver.findElement(By.xpath(`//pc-dropdown-api-search[@id="'Owner'"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search[@id="'Owner'"]/form/ul/li/a[contains(., "` + dtSet.owner + `")]`)), 10000).click();
    //เลือก จุกรับสินค้า
    await driver.findElement(By.xpath(`//pc-dropdown-search[@id="'Shipper222222222'"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-search[@id="'Shipper222222222'"]/form/ul/li/a[contains(., "` + dtSet.shipto + `")]`)), 10000).click();
    //เพิ่มจำนวนรถ
    await driver.findElement(By.xpath(`//input[@ng-model="form.number_of_vehicle"]`)).sendKeys(dtSet.number_of_vehicle);
    //เลือกวันที่
    await driver.findElement(By.xpath(`//pc-date-picker-day[@ng-model="form.date_of_use_vehicle"]/div/input[@ng-model="DateShow"]`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-date-picker-day[@ng-model="form.date_of_use_vehicle"]/div/ul/li/div/table/thead/tr/th/button[@ng-click="toggleMode()"]`)), 10000).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-date-picker-day[@ng-model="form.date_of_use_vehicle"]/div/ul/li/div/table/thead/tr/th/button[@ng-click="toggleMode()"]`)), 10000).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-date-picker-day[@ng-model="form.date_of_use_vehicle"]/div/ul/li/div/table/tbody/tr/td/button[span[contains(., ` + dtSet.year + `)]]`)), 10000).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-date-picker-day[@ng-model="form.date_of_use_vehicle"]/div/ul/li/div/table/tbody/tr/td/button[span[contains(., '` + dtSet.mounth + `')]]`)), 10000).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-date-picker-day[@ng-model="form.date_of_use_vehicle"]/div/ul/li/div/table/tbody/tr/td/button[span[contains(., ` + dtSet.day + `)]]`)), 10000).click();

    //กด reserve
    await driver.findElement(By.xpath(`//button[@ng-click="CheckValidateSaveReserve();"]`)).click();

    // เช็คว่า SUCCESS หรือไม่
    await modulMain.waitloadend(driver, 2000);
    let ele = await driver.wait(until.elementLocated(By.xpath(`//div[@id="title_Alert"]/h3`)), 10000).getText();
    ele.trim().should.equal('สำเร็จ');
    let plan_id = await driver.wait(until.elementLocated(By.xpath(`//div[@id="body_Alert"]/h3`)), 10000).getText();
    plan_id = await plan_id.replace("แผนการจองรถ : ", "");
    await modulMain.waitloadend(driver, 1000);
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Alert"]/button[@ng-click="ok()"]`)), 10000).click();
    // await modulMain.waitloadend(driver, 1000);
    // await confirmPlan(driver, plan_id);
    return plan_id

};

async function Approve_PlanReserve(driver, dtSet) {
    await driver.get(dataConstant.webapi + "tms/PlanReserveConfirmSummary");
    await modulMain.waitloadend(driver, 1000);
    await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(`//button[@ng-click="confirm(data,'confirm')"][@placeholder="` + dtSet.id + `"]`))), 5000).click();

    //เลือก ประเภทรถ
    await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.VehicleType_Planner"]/form/span`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.VehicleType_Planner"]/form/ul/li/a[contains(., "` + dtSet.vehicletype + `")]`)), 10000).click();
    //เพิ่มจำนวนรถ
    await driver.findElement(By.xpath(`//input[@ng-model="form.number_of_vehicle_approve"]`)).sendKeys(dtSet.number_of_vehicle_approve);

    //กด reserve
    await driver.findElement(By.xpath(`//button[@ng-click="CheckValidateSaveConfirmReserve();"]`)).click();

    // เช็คว่า SUCCESS หรือไม่
    await modulMain.waitloadend(driver, 2000);
    let ele = await driver.wait(until.elementLocated(By.xpath(`//div[@id="title_Alert"]/h3`)), 10000).getText();
    ele.trim().should.equal('สำเร็จ');
    await modulMain.waitloadend(driver, 2000);
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Alert"]/button[@ng-click="ok()"]`)), 10000).click();
    await modulMain.waitloadend(driver, 1000);

};

module.exports = {
    confirmPlan, Create_PlanReserve, Approve_PlanReserve
}