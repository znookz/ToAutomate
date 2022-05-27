
const { Builder, By, Key, until } = require("selenium-webdriver")
require("chromedriver");
const should = require('chai').should();
const dataConstant = require("../dataConstant.js")

async function waitloadend(driver) {
    try {
        await driver.wait(until.elementIsNotVisible(driver.findElement(By.xpath(`//div[@id="isloadingpageformpc"]`))), 20000);
    } catch (error) { }
}

async function CreateC2C(driver, dtAddJOb, dtAddParcel) {

    //select planReserbe
    await driver.get(dataConstant.webapi + "tms/tms-ordermanagesummaryv2")

    await driver.sleep(2000);
    await waitloadend(driver);

    await driver.wait(until.elementLocated(By.xpath(`//div[@ng-show="!header.advanceSearch"]/form/div/div/div/button[@ng-click="create('v2')"]`)), 20000).click();
    //เลือกใช้ที่อยู่เดียวกับลูกค้า
    await driver.findElement(By.xpath(`//input[@id="isCheckSameOwner"]`)).click();
    await driver.sleep(1000)
    await waitloadend(driver);

    async function AddJOBB() {
        //เพิ่ม JOB
        for (ele_addjob of dtAddJOb) {
            await driver.findElement(By.xpath(`//button[@ng-click="validateAddJobItems()"]`)).click();
            //ชื่อผ้รับ
            await driver.findElement(By.xpath(`//input[@ng-model="itemsJob.Destination_Contact"]`)).sendKeys(ele_addjob.name);
            //เบอร์ผู้ติดต่อปลายทาง
            await driver.findElement(By.xpath(`//input[@ng-model="itemsJob.Destination_ContactTel"]`)).sendKeys(ele_addjob.tel);
            //บ้านเลขที่ปลายทาง
            await driver.findElement(By.xpath(`//input[@ng-model="itemsJob.Destination_Address"]`)).sendKeys(ele_addjob.address);
            //เลือก จังหวัด
            await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@id="'txtDestination_Province'"]/form/span`)).click();
            await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@id="'txtDestination_Province'"]/form/ul/li/a[contains(., "` + ele_addjob.province + `")]`)), 10000).click();
            //เลือก อำเภอ
            await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@datares="itemsJob.select_destination_District"]/form/span`)).click();
            await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@datares="itemsJob.select_destination_District"]/form/ul/li/a[contains(., "` + ele_addjob.district + `")]`)), 10000).click();
            //เลือก ตำบล
            await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@datares="itemsJob.select_destination_subDistrict"]/form/span`)).click();
            await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@datares="itemsJob.select_destination_subDistrict"]/form/ul/li/a[contains(., "` + ele_addjob.subDistrict + `")]`)), 10000).click();
            //เพิ่ม บันทึกปลายทาง
            await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="saveDesTP()"]`)), 10000).click();

            //เพิ่ม สินค้า
            async function AddProduct() {
                for (ele_parcel of dtAddParcel) {
                    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="saveDesTP()"]`)), 10000).click();
                    await driver.findElement(By.xpath(`//button[@ng-click="openAddProduct(itemsJob)"]`)).click();
                    //เลือก ประเภทสินค้า
                    await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@datares="itemsJobTag.select_ProductType"]/form/span`)).click();
                    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@datares="itemsJobTag.select_ProductType"]/form/ul/li/a[contains(., "` + ele_parcel.type + `")]`)), 10000).click();
                    //เลือก ชื่อสินค้า
                    await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@datares="itemsJobTag.select_Product"]/form/span`)).click();
                    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@datares="itemsJobTag.select_Product"]/form/ul/li/a[contains(., "` + ele_parcel.name + `")]`)), 10000).click();
                    //จำนวนสินค้า
                    await driver.findElement(By.xpath(`//input[@ng-model="itemsJobTag.Qty"]`)).sendKeys(ele_parcel.amount);
                    //เลือก หน่วยสินค้า
                    await driver.findElement(By.xpath(`//pc-dropdown-api-search-v2[@datares="itemsJobTag.select_Unit"]/form/span`)).click();
                    await driver.wait(until.elementLocated(By.xpath(`//pc-dropdown-api-search-v2[@datares="itemsJobTag.select_Unit"]/form/ul/li/a[contains(., "` + ele_parcel.unit + `")]`)), 10000).click();
                    //บันทึก สินค้า
                    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="validateParcel()"]`)), 10000).click();

                    await driver.sleep(1000)
                    await waitloadend(driver);
                }

            }
            await AddProduct();
            //บันทึก JOB
            await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="validateTransportOrderJob()"]`)), 10000).click();
            await driver.sleep(2000)
            await waitloadend(driver);
        }
    }
    await AddJOBB();


    //บันทึก TO
    await driver.wait(until.elementLocated(By.xpath(`//button[@ng-click="validateTransportOrder()"]`)), 10000).click();
    //ยืนยันบันทึก TO
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Confirm"]/button[@ng-click="ok()"]`)), 10000).click();
    // เช็คว่า SUCCESS หรือไม่  และปิด alert
    await driver.sleep(3000)
    await waitloadend(driver);
    let ele = await driver.wait(until.elementLocated(By.xpath(`//div[@id="title_Alert"]/h3`)), 10000);
    let foo = await ele.getText();
    foo.trim().should.equal('สำเร็จ');
    await driver.sleep(2000)
    await waitloadend(driver);
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Alert"]/button[@ng-click="ok()"]`)), 10000).click();

    await driver.sleep(1000)
    await waitloadend(driver);
    // กดปุ่ม confirm อันแรกสุดของตลาด
    await driver.findElement(By.xpath(`//order-manage-table-list-new-v2/div/div/div/div/table/tbody/tr/td/div/button[@ng-click="confirm(data,'confirm')"]`)).click();
    //ยืนยันบันทึก confirm
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Confirm"]/button[@ng-click="ok()"]`)), 10000).click();
    // เช็คว่า ยืนยันสำเร็จ หรือไม่ และปิด alert
    await driver.sleep(1000)
    await waitloadend(driver);
    let elee = await driver.wait(until.elementLocated(By.xpath(`//div[@id="body_Alert"]/h3`)), 10000);
    let fooo = await elee.getText();
    fooo.trim().should.equal('ยืนยันสำเร็จ');
    await driver.sleep(1000)
    await waitloadend(driver);
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="btn_Alert"]/button[@ng-click="ok()"]`)), 10000).click();

}


module.exports = {
    CreateC2C
}