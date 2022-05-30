
const { Builder, By, Key, until } = require("selenium-webdriver")
require("chromedriver");
const should = require('chai').should();
const dataConstant = require("../dataConstant.js")


async function loginBrowser(driver) {
    //navigate to our browser
    await driver.get(dataConstant.urlLogin)
    //Login web
    await driver.findElement(By.xpath('//input[@ng-model="loginData.User"]')).sendKeys("ADMIN");
    await driver.findElement(By.xpath('//input[@ng-model="loginData.Password"]')).sendKeys("ADMIN");
    await driver.findElement(By.xpath('//button[@ng-click="login(loginData.User,loginData.Password)"]')).sendKeys(Key.ENTER);
    await driver.wait(until.urlContains(dataConstant.urlindex), 5000);
}

async function CloseBrowser(driver) {
    await driver.quit();
}



async function waitloadend(driver, wait) {
    await driver.sleep(wait)
    try {
        await driver.wait(until.elementIsNotVisible(driver.findElement(By.xpath(`//div[@id="isloadingpageformpc"]`))), 20000);
    } catch (error) { }
}


module.exports = {
    loginBrowser, CloseBrowser, waitloadend
}