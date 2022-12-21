
const { Builder, By, Key, until, WebElement } = require("selenium-webdriver")
require("chromedriver");
var should = require('chai').should();
const dataConstant = require("./dataConstant.js");
const login = require('./Login.js');



async function CreateGR (driver, header, addItem) {
//async function CreateGR (driver, header) {
    await driver.get(dataConstant.urlGR)
    await login.waitloadend(driver, 2000);
    //Create Button
    await driver.wait(until.elementLocated(By.xpath('//button[@ng-click="$vm.triggerCreate()"]')), 20000).click();

    //Declaration No
    await driver.findElement(By.xpath('//input[@ng-model="filterModel.declaration_No"]')).sendKeys(header.Dcn_No)
    //Invoice No
    await driver.findElement(By.xpath('//input[@ng-model="filterModel.invoice_No"]')).sendKeys(header.Inv_no);
    //AutoComplete Owner
    await driver.findElement(By.xpath('//div[@id="tab1"]/div/div/div/div/auto-comple[@ng-model="filterModel.owner_Index"]/div/input')).sendKeys(header.Owner)
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="tab1"]/div/div/div/div/auto-comple[@ng-model="filterModel.owner_Index"]/div/ul/li`)), 10000).click();
    //AutoComplete Vendor
    if(header.Vendor != undefined && header.Vendor != ""){
        await driver.findElement(By.xpath('//div[@id="tab1"]/div/div/div/div/auto-comple[@ng-model="filterModel.vendor_Index"]/div/input')).sendKeys(header.Vendor)
        await driver.wait(until.elementLocated(By.xpath(`//div[@id="tab1"]/div/div/div/div/auto-comple[@ng-model="filterModel.vendor_Index"]/div/ul/li`)), 10000).click();
    }
    //Drop Down Document Type
    await driver.findElement(By.xpath(`//div[@id="tab1"]/div/div/div/div/select[@ng-model="dropdownDocumentType.model"]`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="tab1"]/div/div/div/div/select[@ng-model="dropdownDocumentType.model"]/option[@label="`+header.DocumentType+`"]`)),10000).click();
    //Drop Down Warehouse
    await driver.findElement(By.xpath(`//div[@id="tab1"]/div/div/div/div/select[@ng-model="dropdownwarehouse.model"]`)).click();
    await driver.wait(until.elementLocated(By.xpath(`//div[@id="tab1"]/div/div/div/div/select[@ng-model="dropdownwarehouse.model"]/option[@label="`+header.Warehouse+`"]`)),10000).click();
    //Drop Down Vehicle Type
    if(header.VehicleType != undefined && header.VehicleType != ""){
        await driver.findElement(By.xpath(`//div[@id="tab1"]/div/div/div/div/select[@ng-model="dropdownVehicleType.model"]`)).click();
        await driver.wait(until.elementLocated(By.xpath(`//div[@id="tab1"]/div/div/div/div/select[@ng-model="dropdownVehicleType.model"]/option[@label="`+header.VehicleType+`"]`)),10000).click();
    }
    //AutoComplete License Plate
    if(header.LicensePlate != undefined && header.LicensPlate != ""){
        await driver.findElement(By.xpath('//div[@id="tab1"]/div/div/div/div/div/auto-comple[@ng-model="filterModel.licensePlate_Index"]/div/input')).sendKeys(header.LicensePlate)
        await driver.wait(until.elementLocated(By.xpath(`//div[@id="tab1"]/div/div/div/div/div/auto-comple[@ng-model="filterModel.licensePlate_Index"]/div/ul/li`)), 10000).click();
    }
    //AutoComplete Driver
    if(header.Driver != undefined && header.Driver != ""){
        await driver.findElement(By.xpath('//div[@id="tab1"]/div/div/div/div/div/auto-comple[@ng-model="filterModel.driver_Index"]/div/input')).sendKeys(header.Driver)
        await driver.wait(until.elementLocated(By.xpath(`//div[@id="tab1"]/div/div/div/div/div/auto-comple[@ng-model="filterModel.driver_Index"]/div/ul/li`)), 10000).click();
    }

    //Import Information Click
    await driver.wait(until.elementLocated(By.xpath('//a[@ng-click="clickTab(2)"]')), 20000).click();

    //AutoComplete Master Bill of Lading/Airway
    if(header.MS_BillofLading != undefined && header.MS_BillofLading != ""){
        await driver.findElement(By.xpath('//div[@id="tab2"]/div/div/div/div/auto-comple[@ng-model="filterModel.master_Bill_Lading_Index"]/div/input')).sendKeys(header.MS_BillofLading)
        await driver.wait(until.elementLocated(By.xpath(`//div[@id="tab2"]/div/div/div/div/auto-comple[@ng-model="filterModel.master_Bill_Lading_Index"]/div/ul/li`)), 10000).click();
    }
    //AutoComplete House Bill of Lading/Airway
    if(header.H_BillofLading != undefined && header.H_BillofLading != ""){
        await driver.findElement(By.xpath('//div[@id="tab2"]/div/div/div/div/auto-comple[@ng-model="filterModel.house_Bill_Lading_Index"]/div/input')).sendKeys(header.H_BillofLading)
        await driver.wait(until.elementLocated(By.xpath(`//div[@id="tab2"]/div/div/div/div/auto-comple[@ng-model="filterModel.house_Bill_Lading_Index"]/div/ul/li`)), 10000).click();
    }
    //Drop Down Currency
    if(header.Currency != undefined && header.Currency != ""){
        await driver.findElement(By.xpath(`//div[@id="tab2"]/div/div/div/div/select[@ng-model="dropdownCurrency.model"]`)).click();
        await driver.wait(until.elementLocated(By.xpath(`//div[@id="tab2"]/div/div/div/div/select[@ng-model="dropdownCurrency.model"]/option[@label="`+header.Currency+`"]`)),10000).click();
    }
    //Exchange Rate
    if(header.ExchangeRate != undefined && header.ExchangeRate != ""){
    await driver.findElement(By.xpath('//input[@ng-model="filterModel.exchange_Rate"]')).sendKeys(header.ExchangeRate)
    }
    //AutoComplete Container Size
    if(header.ContainerSize != undefined && header.ContainerSize != ""){
        await driver.findElement(By.xpath('//div[@id="tab2"]/div/div/div/div/auto-comple[@ng-model="filterModel.container_Rate_Index"]/div/input')).sendKeys(header.ContainerSize)
        await driver.wait(until.elementLocated(By.xpath(`//div[@id="tab2"]/div/div/div/div/auto-comple[@ng-model="filterModel.container_Rate_Index"]/div/ul/li`)), 20000).click();
    }
    //Container Number
    if(header.Container_No != undefined && header.Container_No != ""){
        await driver.findElement(By.xpath('//input[@ng-model="filterModel.container_Size"]')).sendKeys(header.Container_No)
    }
    //Seal No
    if(header.Seal_No != undefined && header.Seal_No != ""){
        await driver.findElement(By.xpath('//div[@id="tab2"]/div/div/div/div/auto-comple[@ng-model="filterModel.seal_No"]/div/input')).sendKeys(header.Seal_No)
        //await driver.wait(until.elementLocated(By.xpath(`//div[@id="tab2"]/div/div/div/div/auto-comple[@ng-model="filterModel.seal_No"]/div/ul/li/a[contains(., "` + header.Seal_No + `")]`)), 10000).click();
    }
    //Vessel Name
    if(header.Vessel_Name != undefined && header.Vessel_Name != ""){
        await driver.findElement(By.xpath('//input[@ng-model="filterModel.vessel_Name"]')).sendKeys(header.Vessel_Name)
    }
    //Flight No
    if(header.Flight_No != undefined && header.Flight_No != ""){
        await driver.findElement(By.xpath('//input[@ng-model="filterModel.flight_No"]')).sendKeys(header.Flight_No)
    }
    //AutoComplete Port of Origin
    if(header.PortofOrigin != undefined && header.PortofOrigin != ""){
        await driver.findElement(By.xpath('//div[@id="tab2"]/div/div/div/div/auto-comple[@ng-model="filterModel.port_Origin_Index"]/div/input')).sendKeys(header.PortofOrigin)
        await driver.wait(until.elementLocated(By.xpath(`//div[@id="tab2"]/div/div/div/div/auto-comple[@ng-model="filterModel.port_Origin_Index"]/div/ul/li`)), 15000).click();
    }
    //AutoComplete Port of Destination
    if(header.PortofDestination != undefined && header.PortofDestination != ""){
        await driver.findElement(By.xpath('//div[@id="tab2"]/div/div/div/div/auto-comple[@ng-model="filterModel.port_Destination_Index"]/div/input')).sendKeys(header.PortofDestination)
        await driver.wait(until.elementLocated(By.xpath(`//div[@id="tab2"]/div/div/div/div/auto-comple[@ng-model="filterModel.port_Destination_Index"]/div/ul/li`)), 15000).click();
    }
    //AutoComplete Country Origin
    if(header.CountryOrigin != undefined && header.CountryOrigin != ""){
        await driver.findElement(By.xpath('//div[@id="tab2"]/div/div/div/div/auto-comple[@ng-model="filterModel.country_Origin_Index"]/div/input')).sendKeys(header.CountryOrigin)
        await driver.wait(until.elementLocated(By.xpath(`//div[@id="tab2"]/div/div/div/div/auto-comple[@ng-model="filterModel.country_Origin_Index"]/div/ul/li`)), 15000).click();
    }
     //AutoComplete Country Destination
     if(header.CountryDestination != undefined && header.CountryDestination != ""){
        await driver.findElement(By.xpath('//div[@id="tab2"]/div/div/div/div/auto-comple[@ng-model="filterModel.country_Destination_Index"]/div/input')).sendKeys(header.CountryDestination)
        await driver.wait(until.elementLocated(By.xpath(`//div[@id="tab2"]/div/div/div/div/auto-comple[@ng-model="filterModel.country_Destination_Index"]/div/ul/li`)), 15000).click();
    }
    //Remark
    if(header.Remark != undefined && header.Remark != ""){
        await driver.findElement(By.xpath('//input[@ng-model="filterModel.document_Remark"]')).sendKeys(header.Remark)
    }
    //Add Item Button
    await driver.wait(until.elementLocated(By.xpath('//button[@ng-click="addDetailItem.onClick(filterModel)"]')), 20).click();

    async function AddItem() {
        for (item of addItem){
            if(item.SKU != undefined && item.SKU != ""){
            //AutoComplete SKU
            await driver.findElement(By.xpath('//auto-comple-id[@ng-model="filterItemModel.product_Index"]/div/input')).sendKeys(item.SKU)
            //await driver.wait(until.elementLocated(By.xpath(`//auto-comple-id[@ng-model="filterItemModel.product_Index"]/div/input[contains(., "` + item.SKU + `")]`)), 15000).sendKeys(Key.ENTER);
            await driver.wait(until.elementLocated(By.xpath(`//auto-comple-id[@ng-model="filterItemModel.product_Index"]/div/ul/li`)), 15000).click();
            }
            // await login.waitloadend(driver, 2000);
            //AutoComplete Description
            // if(item.Description != undefined && item.Description != ""){
            // await driver.findElement(By.xpath('//auto-comple[@ng-model="filterItemModel.product_Index"]/div/input')).sendKeys(item.Description , Key.RETURN)
            // await driver.wait(until.elementLocated(By.xpath(`//auto-comple[@ng-model="filterItemModel.product_Index"]/div/ul/li[@ng-click="selectMatch($index, $event)"]`)), 15000).click();
            // await driver.wait(until.elementLocated(By.xpath(`//auto-comple[@ng-model="filterItemModel.product_Index"]/div/ul/li[@ng-click="selectMatch($index, $event)"]`)), 15000).select();
            // }

            //Drop Down Status
            if(item.Status != undefined && item.Status != ""){
                await driver.findElement(By.xpath(`//select[@ng-model="dropdownItemStatus.model"]`)).click();
                await driver.wait(until.elementLocated(By.xpath(`//select[@ng-model="dropdownItemStatus.model"]/option[@label="`+item.Status+`"]`)),15000).click();
            }

            //Exchange Rate Price
            if(item.ExchangeRatePrice != undefined && item.ExchangeRatePrice != ""){
            await driver.findElement(By.xpath('//input[@ng-model="filterItemModel.totalPrice_Foreign_Currency"]')).sendKeys(item.ExchangeRatePrice)
            }

            //Lot
            if(item.Lot != undefined && item.Lot != ""){
            await driver.findElement(By.xpath('//input[@ng-model="filterItemModel.product_Lot"]')).clear()
            await driver.findElement(By.xpath('//input[@ng-model="filterItemModel.product_Lot"]')).sendKeys(item.Lot)
            }

            //Tariff Code
            if(item.TariffCode != undefined && item.TariffCode != ""){
                await driver.findElement(By.xpath('//input[@ng-model="filterItemModel.tariff"]')).sendKeys(item.TariffCode)
            }

            //Qty Unit
            if(item.QtyUnit != undefined && item.QtyUnit != ""){
            await driver.findElement(By.xpath('//input[@ng-model="filterItemModel.qty "]')).sendKeys(item.QtyUnit)
            }





        }

    }
    await AddItem();




}

module.exports = {
    CreateGR
}
