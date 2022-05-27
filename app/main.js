
const { Builder, By, Key } = require("selenium-webdriver")
require("chromedriver");
var should = require('chai').should();

//desctible
describe("add todo test", function () {

    //it block
    it("Successfully adds a todo o application", async function () {

        //open browser
        let driver = await new Builder().forBrowser("chrome").build();


        //navigate to our browser
        await driver.get("https://lambdatest.github.io/sample-todo-app/")

        //add a todo
        await driver.findElement(By.id("sampletodotext")).sendKeys("Learn Selenium", Key.RETURN);

        //assert
        let todoText = await driver.findElement(By.xpath("//li[last()]")).getText().then(function (value) {
            return value
        })

        //assert using chai should
        todoText.should.equal("Learn Selenium");


        //close browser
        await driver.quit();


    });

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
