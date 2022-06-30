/////
const { Builder, By, Key, until } = require("selenium-webdriver")
require("chromedriver");
const should = require('chai').should();
const dataConstant = require("../dataConstant.js")
const modulMain = require('../Module/ModulMain.js');

async function CreateDriver(driver,dtAddText) {
    //เปิดหน้า Master Driver
    await driver.get(dataConstant.webapi + "tms/tms-mdriver")
    //รอ 2 วิ
    await modulMain.waitloadend(driver, 1000);
    //กดปุ่ม +
    await driver.findElement(By.xpath(`//button[@ng-click="create()"]`)).click();
    //กรอก รหัสพนักงาน
    await driver.findElement(By.xpath(`//input[@ng-model="item.Driver_Id"]`)).sendKeys(dtAddText.id);
    //เลือก คำนำหน้า
    await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.Prefix"]/form/span`)).click();
    await modulMain.waitloadend(driver, 500);
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@datares="chooseDirective.Prefix"]/form/ul/li/a[contains(., "`+dtAddText.prefix+`")]`)), 10000).click();
    //กรอก ชื่อ
    await driver.findElement(By.xpath(`//input[@ng-model="item.First_Name"]`)).sendKeys(dtAddText.firstname);
    //กรอก นามสกุล
    await driver.findElement(By.xpath(`//input[@ng-model="item.Last_Name"]`)).sendKeys(dtAddText.lastname);
    //รหัสประจำตัวประชาชน
    await driver.findElement(By.xpath(`//input[@ng-model="item.IDCard_Number"]`)).sendKeys(dtAddText.idnumber);
    //วัน เดือน ปีเกิด
    await driver.findElement(By.xpath(`//pc-date-picker-day[@ng-model="item.BirthDay_Date"]/div/input[@ng-model="DateShow"]`)).click();
    await modulMain.waitloadend(driver, 500);
    await driver.wait(until.elementLocated(By.xpath(`//pc-date-picker-day[@ng-model="item.BirthDay_Date"]/div/ul/li/div/table/thead/tr/th/button[@ng-click="toggleMode()"]`)), 10000).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-date-picker-day[@ng-model="item.BirthDay_Date"]/div/ul/li/div/table/thead/tr/th/button[@ng-click="toggleMode()"]`)), 10000).click();
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="move(-1)"]`)), 10000).click();
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="move(-1)"]`)), 10000).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-date-picker-day[@ng-model="item.BirthDay_Date"]/div/ul/li/div/table/tbody/tr/td/button[span[contains(., '` + dtAddText.birthdate.year + `')]]`)), 10000).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-date-picker-day[@ng-model="item.BirthDay_Date"]/div/ul/li/div/table/tbody/tr/td/button[span[contains(., '` + dtAddText.birthdate.mounth + `')]]`)), 10000).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-date-picker-day[@ng-model="item.BirthDay_Date"]/div/ul/li/div/table/tbody/tr/td/button[span[contains(., '` + dtAddText.birthdate.day + `')]]`)), 10000).click();
    //วันที่เริ่มงาน
    await driver.findElement(By.xpath(`//pc-date-picker-day[@ng-model="item.StartWorking_Date"]/div/input[@ng-model="DateShow"]`)).click();
    await modulMain.waitloadend(driver, 500);
    await driver.wait(until.elementLocated(By.xpath(`//pc-date-picker-day[@ng-model="item.StartWorking_Date"]/div/ul/li/div/table/thead/tr/th/button[@ng-click="toggleMode()"]`)), 10000).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-date-picker-day[@ng-model="item.StartWorking_Date"]/div/ul/li/div/table/thead/tr/th/button[@ng-click="toggleMode()"]`)), 10000).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-date-picker-day[@ng-model="item.StartWorking_Date"]/div/ul/li/div/table/tbody/tr/td/button[span[contains(., '` + dtAddText.startworkingdate.year + `')]]`)), 10000).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-date-picker-day[@ng-model="item.StartWorking_Date"]/div/ul/li/div/table/tbody/tr/td/button[span[contains(., '` + dtAddText.startworkingdate.mounth + `')]]`)), 10000).click();
    await driver.wait(until.elementLocated(By.xpath(`//pc-date-picker-day[@ng-model="item.StartWorking_Date"]/div/ul/li/div/table/tbody/tr/td/button[span[contains(., '` + dtAddText.startworkingdate.day + `')]]`)), 10000).click();
    //มือถือ
    await driver.findElement(By.xpath(`//input[@ng-model="item.Mobile"]`)).sendKeys(dtAddText.tel);
    //อัพโหลดรูป
    await driver.findElement(By.xpath(`//input[@id="TruckPicture"]`)).sendKeys("C:/Users/uSeR/Pictures/ดาวน์โหลด.jpg");
    await modulMain.waitloadend(driver, 500);

    //กดบันทึก
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="validateForm()"]`)), 10000).click();
    //เช็คว่า ยืนยันสำเร็จ หรือไม่ และปิด alert
    let elee = await driver.wait(until.elementLocated(By.xpath(`//div[@id="body_Alert"]/h3`)), 10000).getText();
    elee.trim().should.equal('บันทึกสำเร็จ');
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Alert"]/button[@ng-click="ok()"]`)), 10000).click();
    await modulMain.waitloadend(driver, 500);
} 

async function DeleteDriver(driver,dtAddText) {
    //เปิดหน้า Master Driver
    await driver.get(dataConstant.webapi + "tms/tms-mdriver")
    await modulMain.waitloadend(driver, 1000);
    //กรอก ID ที่ช่องค้นหา
    await driver.findElement(By.xpath(`//div[@class="typeahead-demo"]/input[@ng-model="value"]`)).sendKeys(dtAddText.id);
    //กดค้นหา
    await driver.findElement(By.xpath(`//button[@ng-click="filter()"]`)).click();
    await modulMain.waitloadend(driver, 500);
    //กดปุ่มแก้ไข
    await driver.findElement(By.xpath(`//button[@ng-click="edit(row)"]`)).click();
    await modulMain.waitloadend(driver, 500);
    //กดหาสถานะ inactive
    await driver.findElement(By.xpath(`//pc-dropdown-search[@datares="chooseDirective.dtStatus"]/form/span`)).click();
    await modulMain.waitloadend(driver, 500);
    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-search[@datares="chooseDirective.dtStatus"]/form/ul/li/a[contains(., "`+dtAddText.status+`")]`)), 10000).click();

    //กดบันทึก
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="validateForm()"]`)), 10000).click();
    // เช็คว่า ยืนยันสำเร็จ หรือไม่ และปิด alert
    let fsave = await driver.wait(until.elementLocated(By.xpath(`//div[@id="body_Alert"]/h3`)), 10000).getText();
    fsave.trim().should.equal('บันทึกสำเร็จ');
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Alert"]/button[@ng-click="ok()"]`)), 10000).click();
    await modulMain.waitloadend(driver, 500);
    //กรอก ID ที่ช่องค้นหา
    await driver.findElement(By.xpath(`//div[@class="typeahead-demo"]/input[@ng-model="value"]`)).sendKeys(dtAddText.id);
    //กดค้นหา
    await driver.findElement(By.xpath(`//button[@ng-click="filter()"]`)).click();
    await modulMain.waitloadend(driver, 500);
    //กดปุ่มลบ
    await driver.findElement(By.xpath(`//button[@ng-click="validateDelete(row,$index)"]`)).click();
    await modulMain.waitloadend(driver, 500);
    //กดปุ่มตกลง
    await driver.findElement(By.xpath(`//div[@id="btn_Confirm"]/button[@ng-click="ok()"]`)).click();
    await modulMain.waitloadend(driver, 5000); //เปลี่ยนให้ต่ำกว่านี้ไม่ได้ อนิเมชั่นโหลดไม่ทัน กด
    await driver.findElement(By.xpath(`//div[@id="btn_Alert"]/button[@ng-click="ok()"]`)).click();
    await modulMain.waitloadend(driver, 500);
}

module.exports = {
    CreateDriver,
    DeleteDriver
}