
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
    //Owner
    await driver.findElement(By.xpath('//div[@id="tab1"]/div/div/div/div/auto-comple[@ng-model="filterModel.owner_Index"]/div/input')).sendKeys(header.Owner)
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="tab1"]/div/div/div/div/auto-comple[@ng-model="filterModel.owner_Index"]/div/ul/li/a[contains(., "` + header.Owner + `")]`)), 10000).click();
    //Vendor
    if(header.vendor != undefined && header.vendor != ""){
        console.log("Vendor found")
        //await driver.findElement(By.xpath('//div[@id="tab1"]/div/div/div/div/auto-comple[@ng-model="filterModel.owner_Index"]/div/input')).sendKeys(header.Owner)
        //await driver.wait(until.elementLocated(By.xpath(`//div[@id="tab1"]/div/div/div/div/auto-comple[@ng-model="filterModel.owner_Index"]/div/ul/li/a[contains(., "` + header.Owner + `")]`)), 10000).click();
    }
    //DocumenType
    await driver.findElement(By.xpath(`//div[@id="tab1"]/div/div/div/div/select[@ng-model="dropdownDocumentType.model"]`)).click();
   // await driver.wait(until.elementsLocated(By.xpath(`//div[@id="tab1"]/div/div/div/div/select[@ng-model="dropdownDocumentType.model"]/option[@label=`+header.Documenttype+`]`)),10000).click();
    await driver.wait(until.elementsLocated(By.xpath(`//div[@id="tab1"]/div/div/div/div/select[@ng-model="dropdownDocumentType.model"]/option[@label="นำเข้าจากต่างประเทศ(ใบขน0)"]`)),2000).click();
}
module.exports = {
    CreateHeaderGR
}
