
const chrome = require('selenium-webdriver/chrome');
const { Builder, By, Key } = require("selenium-webdriver")
const chromedriver = require("chromedriver");
var should = require('chai').should();

//ชื่อหัวข้อใหญ๋ที่ทำการเทส
describe("เพิ่มข้อมูลลงอย่างถูกต้อง", function () {

    //////// Set Option /////
    var options = new chrome.Options();
    options.addArguments([
        // '--start-maximized', // เต็มจอ
        '--headless', //รัดโดยไม่เปิดเว็ป
    ]);
    //ปิดว่าเปิดด้วย automate
    options.excludeSwitches('enable-automation')
    ////// End Set Option /////

    //เปิด เว็ป
    let driver = new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();

    //it คือแยกย่อยของการทำงาน
    it("เปิดเว็ป", async function () {
        //นำ URL ที่ต้องการไปใส่ที่เว็ป
        await driver.get("https://lambdatest.github.io/sample-todo-app/")
    });

    it("เพิ่มข้อมูล", async function () {
        //เพิ่มข้อมูลลงช่อง input แล้ว Enter
        await driver.findElement(By.id("sampletodotext")).sendKeys("Learn Selenium", Key.RETURN);
    });

    it("เช็คว่าข้อมูลที่เพิ่มถูกต้องหรือไม่", async function () {
        //ดึงข้อความของ li สุดท้าย
        let todoText = await driver.findElement(By.xpath("//li[last()]")).getText()
        //เช็คว่า li สุดท้าย ตรงกับคำที่ให้เพิ่มหรือไม่
        todoText.should.equal("Learn Selenium");
    });

    // it("ปิดเว็ป", async function () {
    //     await driver.quit();
    // });

});












///////////////////////////////////////////////////////////


// async function example() {

//     //open browser
//     let driver = await new Builder().forBrowser("chrome").build();


//     //navigate to our browser
//     await driver.get("https://lambdatest.github.io/sample-todo-app/")

//     //add a todo
//     await driver.findElement(By.id("sampletodotext")).sendKeys("Learn Selenium", Key.RETURN);

//     //assert
//     let todoText = await driver.findElement(By.xpath("//li[last()]")).getText().then(function (value) {
//         return value
//     })

//     //assert using node assertion
//     assert.strictEqual(todoText, "Learn Selenium");

//     //assert using chai should
//     todoText.should.equal("Learn Selenium");


//     //close browser
//     await driver.quit();


// }
