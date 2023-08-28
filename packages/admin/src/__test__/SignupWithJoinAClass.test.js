import { Config } from "./config";
import { scrollToBottom, scrollToTop, sleep } from "./helper";
import { HomePage,JoinAClass } from "./locator";
const puppeteer = require("puppeteer");
const pti = require("puppeteer-to-istanbul");
const { async } = require("q");

test("Sign up with join a class", async () => {

  const browser = await puppeteer.launch(Config.launchOptions).then(async browser => {

    const page = await browser.newPage();
    await page.setViewport( { "width" : 1000, "height" : 750 } );
    await Promise.all([
      page.coverage.startJSCoverage(),
      page.coverage.startCSSCoverage()
    ]);

    // Go to Page
    await page.goto(HomePage, { waitUntil: "load", timeout: 0 });

    // Click on join a class menu
    await sleep(1000);
    const [linkHandlers] = await page.$x(JoinAClass.menu);
    await linkHandlers.click();
    await sleep(1000);
    
    await scrollToBottom(page);

    //Step 1
    await page.click(JoinAClass.step1.submitBtnId);
    await sleep(1000);


    await page.waitForSelector(JoinAClass.step1.classCode);

    await sleep(1000);
    
    await page.type(JoinAClass.step1.classCode, JoinAClass.step1.inputValue.classCode);

    await page.click(JoinAClass.step1.submitBtnId);
   
    await sleep(2000);

    // Step 2
    
    await scrollToBottom(page);
    
    await page.click(JoinAClass.step2.submitBtnId);
    await sleep(1000);

    await page.waitForSelector(JoinAClass.step2.firstRadio, { visible: true });
    await page.click(JoinAClass.step2.firstRadio, { clickCount:1 });
    

    await sleep(1000);

    await page.click(JoinAClass.step2.submitBtnId);
    
    await sleep(1000);
    
    // Step 3 student Sign up 
    
    await scrollToBottom(page);
    
    await sleep(1000);
    
    await page.click(JoinAClass.step3.submitBtnId);

    await sleep(1000);

    await scrollToTop(page);

    await sleep(1000);

    await page.waitForSelector(JoinAClass.step3.firstname);
    await page.type(JoinAClass.step3.firstname,JoinAClass.step3.inputValue.firstname);
    
    await page.waitForSelector(JoinAClass.step3.lastname);
    await page.type(JoinAClass.step3.lastname,JoinAClass.step3.inputValue.lastname);
    
    await page.waitForSelector(JoinAClass.step3.username);
    await page.type(JoinAClass.step3.username,JoinAClass.step3.inputValue.username);
    
    // await page.waitForSelector(JoinAClass.step3.aboutUs);
    await page.type("#react-select-2-input", JoinAClass.step3.inputValue.aboutUs);
    await page.keyboard.press("Enter");
    // await page.waitForSelector(JoinAClass.step3.grade);
    await page.type("#react-select-3-input", JoinAClass.step3.inputValue.grade);
    await page.keyboard.press("Enter");
    await page.waitForSelector(JoinAClass.step3.email);
    await page.type(JoinAClass.step3.email, JoinAClass.step3.inputValue.email);
    
    await page.waitForSelector(JoinAClass.step3.password);
    await page.type(JoinAClass.step3.password, JoinAClass.step3.inputValue.password);
    
    await page.waitForSelector(JoinAClass.step3.confirm);
    await page.type(JoinAClass.step3.confirm, JoinAClass.step3.inputValue.confirm);

    await page.click(JoinAClass.step3.submitBtnId);

    await sleep(2000);

    // Disable both JavaScript and CSS coverage
    const [jsCoverage, cssCoverage] = await Promise.all([
      page.coverage.stopJSCoverage(),
      page.coverage.stopCSSCoverage()
    ]);

    pti.write([...jsCoverage, ...cssCoverage], { includeHostname: true, storagePath: "./.nyc_output" });


    await browser.close();

  });

}, (500000));
