const { Builder, By, Key, until } = require("selenium-webdriver")

async function CheckBoxIsRed(driver, xpath) {
    try {
        await driver.wait(until.elementLocated(By.xpath(xpath.toString())), 5000);
        return true
    } catch (error) {
        return false
    }
}

module.exports = {
    CheckBoxIsRed
}