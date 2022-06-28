
const { Builder, By, Key, until } = require("selenium-webdriver")
require("chromedriver");
var should = require('chai').should();
const dataConstant = require("./dataConstant.js");

async function loginBrowser(driver,user,pass) {
    await driver.get(dataConstant.urlLogin)
    await driver.findElement(By.xpath('//input[@ng-model="loginData.User"]')).sendKeys(user);
    await driver.findElement(By.xpath('//input[@ng-model="loginData.Password"]')).sendKeys(pass);
    await driver.findElement(By.xpath('//button[@ng-click="login(loginData.User,loginData.Password)"]')).sendKeys(Key.ENTER);
    await driver.wait(until.urlContains(dataConstant.urlindex), 5000);
}

async function waitloadend(driver, wait) {
    await driver.sleep(wait)
    try {
        await driver.wait(until.elementIsNotVisible(driver.findElement(By.xpath(`//dp-pageload/div [@aria-hidden="false"]`))), 20000);
    } catch (error) { }
}


module.exports = {
    loginBrowser, waitloadend
}