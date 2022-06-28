
const { Builder, By, Key, until } = require("selenium-webdriver")
require("chromedriver");
var should = require('chai').should();
const dataConstant = require("./dataConstant.js");
const login = require('./Login.js');

console.log(dataConstant)

async function CreateHeaderGR (driver,header) {
    await driver.get(dataConstant.urlGR)
    await login.waitloadend(driver, 2000);
    await driver.wait(until.elementLocated(By.xpath('//button[@ng-click="$vm.triggerCreate()"]')), 20000).click();

    //Declaration No
    await driver.findElement(By.xpath('//input[@ng-model="filterModel.declaration_No"]')).sendKeys(header.Dcn_No)
    //Invoice No
    await driver.findElement(By.xpath('//input[@ng-model="filterModel.invoice_No"]')).sendKeys(header.Inv_no);
    //AutoComplete Owner
    await driver.findElement(By.xpath('//div[@id="tab1"]/div/div/div/div/auto-comple[@ng-model="filterModel.owner_Index"]/div/input')).sendKeys(header.Owner)
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="tab1"]/div/div/div/div/auto-comple[@ng-model="filterModel.owner_Index"]/div/ul/li/a[contains(., "` + header.Owner + `")]`)), 10000).click();
    //AutoComplete Vendor
    if(header.Vendor != undefined && header.Vendor != ""){
        await driver.findElement(By.xpath('//div[@id="tab1"]/div/div/div/div/auto-comple[@ng-model="filterModel.vendor_Index"]/div/input')).sendKeys(header.Vendor)
        await driver.wait(until.elementLocated(By.xpath(`//div[@id="tab1"]/div/div/div/div/auto-comple[@ng-model="filterModel.vendor_Index"]/div/ul/li/a[contains(., "` + header.Vendor + `")]`)), 10000).click();
    }
    //Drop Down Document Type
    await driver.findElement(By.xpath(`//div[@id="tab1"]/div/div/div/div/select[@ng-model="dropdownDocumentType.model"]`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="tab1"]/div/div/div/div/select[@ng-model="dropdownDocumentType.model"]/option[@label="`+header.Documenttype+`"]`)),10000).click();
    //Drop Down Warehouse
    await driver.findElement(By.xpath(`//div[@id="tab1"]/div/div/div/div/select[@ng-model="dropdownwarehouse.model"]`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="tab1"]/div/div/div/div/select[@ng-model="dropdownwarehouse.model"]/option[@label="`+header.Warehouse+`"]`)),10000).click();
    //Drop Down Vehicle Type
    if(header.Vehicletype != undefined && header.Vehicletype != ""){
        await driver.findElement(By.xpath(`//div[@id="tab1"]/div/div/div/div/select[@ng-model="dropdownVehicleType.model"]`)).click();
        await driver.wait(until.elementLocated(By.xpath(`//div[@id="tab1"]/div/div/div/div/select[@ng-model="dropdownVehicleType.model"]/option[@label="`+header.Vehicletype+`"]`)),10000).click();
    }
    //AutoComplete License Plate
    if(header.Licenseplate != undefined && header.Licenseplate != ""){
        await driver.findElement(By.xpath('//div[@id="tab1"]/div/div/div/div/auto-comple[@ng-model="filterModel.licensePlate_Index"]/div/input')).sendKeys(header.Licenseplate)
        await driver.wait(until.elementLocated(By.xpath(`//div[@id="tab1"]/div/div/div/div/auto-comple[@ng-model="filterModel.licensePlate_Index"]/div/ul/li/a[contains(., "` + header.Licenseplate + `")]`)), 10000).click();
    }
}

module.exports = {
    CreateHeaderGR
}
