
const { Builder, By, Key, until } = require("selenium-webdriver")
require("chromedriver");
var should = require('chai').should();

//desctible
describe("Test Log In", function () {

    //it block
    it("log in Success", async function () {

        //open browser
        let driver = await new Builder().forBrowser("chrome").build();


        //navigate to our browser
        await driver.get("http://203.151.136.18/SahaTH_BD_WMS/#/login")
    });
});
//         //add a todo
//         await driver.findElement(By.id("sampletodotext")).sendKeys("Learn Selenium", Key.RETURN);

//         //assert
//         let todoText = await driver.findElement(By.xpath("//li[last()]")).getText().then(function (value) {
//             return value
//         })

//         //assert using chai should
//         todoText.should.equal("Learn Selenium");


//         //close browser
//         await driver.quit();
// //ghghghghghg

//     });

// });












// ///////////////////////////////////////////////////////////


// // async function example() {

// //     //open browser
// //     let driver = await new Builder().forBrowser("chrome").build();


// //     //navigate to our browser
// //     await driver.get("https://lambdatest.github.io/sample-todo-app/")

// //     //add a todo
// //     await driver.findElement(By.id("sampletodotext")).sendKeys("Learn Selenium", Key.RETURN);

// //     //assert
// //     let todoText = await driver.findElement(By.xpath("//li[last()]")).getText().then(function (value) {
// //         return value
// //     })

// //     //assert using node assertion
// //     assert.strictEqual(todoText, "Learn Selenium");

// //     //assert using chai should
// //     todoText.should.equal("Learn Selenium");


// //     //close browser
// //     await driver.quit();


// // }
