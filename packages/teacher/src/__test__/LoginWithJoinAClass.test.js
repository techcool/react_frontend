import { Config } from './config';
import { HomePage,JoinAClass,LoginPage } from './locator';
import { scrollToBottom, scrollToTop, sleep} from './helper';
const puppeteer = require('puppeteer');
const { async } = require('q');
const pti = require('puppeteer-to-istanbul');

test("Login with join a class", async () => {

  const browser = await puppeteer.launch(Config.launchOptions).then(async browser => {

    const page = await browser.newPage();
    await page.setViewport( { 'width' : 1000, 'height' : 750 } )

    await Promise.all([
      page.coverage.startJSCoverage(),
      page.coverage.startCSSCoverage()
    ]);

    // Go to Page
    await page.goto(HomePage, { waitUntil: 'load', timeout: 0 });

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

    await page.waitForSelector(JoinAClass.step2.secRadio, { visible: true });
    await page.click(JoinAClass.step2.secRadio, {clickCount:1});
    

    await sleep(1000);

    await page.click(JoinAClass.step2.submitBtnId);
    
    await sleep(1000);
    
    // Step 3 Login
    

    await page.waitForSelector(LoginPage.email);
    await sleep(1000);
    await page.type(LoginPage.email, LoginPage.inputValue.student.email);

    await page.waitForSelector(LoginPage.password);
    await sleep(1000);
    await page.type(LoginPage.password, LoginPage.inputValue.student.password);

    await sleep(1000);
    await scrollToBottom(page);

    await page.click(LoginPage.loginButton);
    await sleep(3000);

    // Disable both JavaScript and CSS coverage
    const [jsCoverage, cssCoverage] = await Promise.all([
      page.coverage.stopJSCoverage(),
      page.coverage.stopCSSCoverage(),
      ]);

    pti.write([...jsCoverage, ...cssCoverage], { includeHostname: true, storagePath: './.nyc_output' })

    await browser.close();

  });

}, (500000));