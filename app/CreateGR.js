
const { Builder, By, Key, until } = require("selenium-webdriver")
require("chromedriver");
var should = require('chai').should();
const dataConstant = require("./dataConstant.js");


async function CreatGR (driver) {
    await driver.get(dataConstant.urlGR)
    await driver.findElement(By.xpath('//input[@ng-model="loginData.User"]')).sendKeys("admintest");
    await driver.findElement(By.xpath('//input[@ng-model="loginData.Password"]')).sendKeys("123456");
    await driver.findElement(By.xpath('//button[@ng-click="login(loginData.User,loginData.Password)"]')).sendKeys(Key.ENTER);
    await driver.wait(until.urlContains(dataConstant.urlindex), 5000);
}

module.exports = {
    loginBrowser
}
