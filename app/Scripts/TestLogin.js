// ไว้ลองเล่นเฉยๆ npm test
const { Builder, By, Key, until } = require("selenium-webdriver")
require("chromedriver");
var should = require('chai').should();


/////// TEST CASE  ///////////
//
//  1.กรอก user passs มั่วๆ ต้องแจ้งเตือน Login Fail
//  2.กรอก user ถูก pass ผิด ต้องแจ้งเตือน Login Fail
//  3.กรอก user ผิด pass ถูก ต้องแจ้งเตือน Login Fail
//  4.กรอก user ถูก pass ถูก ต้องเข้าเว็ปได้
//
///////////////////////////

describe("Test Login Web Site", function () {

    var driver;
    // http://147.50.152.152:1150/tms-dev/WEB-TMS/#/
    const urlSite = "http://localhost:8086/#/login"

    var dtfaill = [
        { user: 'asdasd', password: 'erwerw' },
        { user: 'ADMIN', password: 'erwerw' },
        { user: 'asdasd', password: 'ADMIN' },
    ]

    beforeEach(function () {
        //open browser
        driver = new Builder().forBrowser("chrome").build();
    })

    afterEach(async function () {
        //close browser
        await driver.quit();
    })

    dtfaill.forEach(({ user, password }) => {
        //it block
        it(`Test login fail user:${user} pass:${password}`, async function () {

            //navigate to our browser
            await driver.get(urlSite)

            //add a todo
            await driver.findElement(By.xpath('//input[@ng-model="loginData.User"]')).sendKeys(user);
            await driver.findElement(By.xpath('//input[@ng-model="loginData.Password"]')).sendKeys(password);

            await driver.findElement(By.xpath('//button[@ng-click="login(loginData.User,loginData.Password)"]')).sendKeys(Key.ENTER);

            let ele = await driver.wait(until.elementLocated(By.xpath("//div[@class='modal-body ng-scope']/h3")), 5000);
            let foo = await ele.getText();
            foo.should.equal('Login Fail "');


        });
    });

    it(`TEST Login PASS user: ADMIN , Pass: ADMIN`, async function () {

        //navigate to our browser
        await driver.get(urlSite)

        //add a todo
        await driver.findElement(By.xpath('//input[@ng-model="loginData.User"]')).sendKeys("ADMIN");
        await driver.findElement(By.xpath('//input[@ng-model="loginData.Password"]')).sendKeys("ADMIN");

        await driver.findElement(By.xpath('//button[@ng-click="login(loginData.User,loginData.Password)"]')).sendKeys(Key.ENTER);
        await driver.wait(until.urlContains('http://localhost:8086/#/tms/index'), 5000);


    });

});

