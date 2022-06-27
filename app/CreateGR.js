
const { Builder, By, Key, until } = require("selenium-webdriver")
require("chromedriver");
var should = require('chai').should();
const dataConstant = require("./dataConstant.js");
const login = require('./Login.js');

console.log(dataConstant)

async function CreatGR (driver) {
    await driver.get(dataConstant.urlGR)
    // await Login.waitloadend(driver, 2000);
}

module.exports = {
    CreatGR
}
