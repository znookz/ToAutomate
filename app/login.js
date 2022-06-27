
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

module.exports = {
    loginBrowser
}