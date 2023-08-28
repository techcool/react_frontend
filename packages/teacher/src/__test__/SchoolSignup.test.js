import { Config } from './config';
import { SchoolSignup ,LoginPage } from './locator';
import { scrollToBottom, scrollToTop, clickByText, clickOnButton,sleep } from './helper';
const puppeteer = require('puppeteer');
const { async } = require('q');
const pti = require('puppeteer-to-istanbul');

test("School Signup", async () => {

  const browser = await puppeteer.launch(Config.launchOptions).then(async browser => {

    const page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 700,deviceScaleFactor: 0.50});

    await Promise.all([
      page.coverage.startJSCoverage(),
      page.coverage.startCSSCoverage()
    ]);

    await page.goto(SchoolSignup.url, { waitUntil: 'load', timeout: 0 });

    await sleep(1000)
    const linkHandlers = await page.$x(`//a[contains(text(), "Free Trial")]`);
    await linkHandlers[0].click();

    //Dialog 1

    await page.waitForSelector('.modal', { visible: true });

    const [startAsATeacher] = await page.$x(`//button[contains(text(),"Start As a School")]`);
    await startAsATeacher.click();

    await sleep(2000)

    // Dialog 2
    
    const [Continue] = await page.$x(`//button[contains(text(),"Continue")]`);
    await Continue.click();

    await page.waitForSelector('input[name="library"]', { visible: true });
    await page.click("input[name='library']", {clickCount:1});
    await sleep(1000)

    const [ContinueNext] = await page.$x(`//button[contains(text(),"Continue")]`);
    await ContinueNext.click();

    await sleep(1000)
    //step 1:
    await scrollToBottom(page);
    await sleep(1000)
     const [continueStep1] = await page.$x(`//button[contains(text(),"Continue")]`);
    await continueStep1.click();
    await scrollToTop(page);

    await page.waitForSelector(SchoolSignup.step1.firstname);
    await page.type(SchoolSignup.step1.firstname, SchoolSignup.step1.inputValue.firstname);

    await page.waitForSelector(SchoolSignup.step1.lastname);
    await page.type(SchoolSignup.step1.lastname, SchoolSignup.step1.inputValue.lastname);

    await page.waitForSelector(SchoolSignup.step1.email);
    await page.type(SchoolSignup.step1.email, SchoolSignup.step1.inputValue.email);

    await page.waitForSelector(SchoolSignup.step1.username);
    await page.type(SchoolSignup.step1.username, SchoolSignup.step1.inputValue.username);

    await page.waitForSelector(SchoolSignup.step1.hearabout)
    await page.type(SchoolSignup.step1.hearabout, SchoolSignup.step1.inputValue.hearabout);
    page.keyboard.press('Enter');

    await page.waitForSelector(SchoolSignup.step1.role)
    await page.type(SchoolSignup.step1.role, SchoolSignup.step1.inputValue.role);
    page.keyboard.press('Enter');

    await page.waitForSelector(SchoolSignup.step1.country)
    await page.type(SchoolSignup.step1.country, SchoolSignup.step1.inputValue.country);
    page.keyboard.press('Enter');

    await page.waitForSelector(SchoolSignup.step1.state)
    await page.type(SchoolSignup.step1.state, SchoolSignup.step1.inputValue.state);
    page.keyboard.press('Enter');

    await page.waitForSelector(SchoolSignup.step1.school)
    await page.type(SchoolSignup.step1.school, SchoolSignup.step1.inputValue.school);

    await page.waitForSelector(SchoolSignup.step1.phone)
    await page.type(SchoolSignup.step1.phone, SchoolSignup.step1.inputValue.phone);

    await page.waitForSelector(SchoolSignup.step1.message)
    await page.type(SchoolSignup.step1.message, SchoolSignup.step1.inputValue.message);
    
    await scrollToBottom(page);
    await sleep(1000)

    await page.waitForSelector('input[name="terms"]', { visible: true });
    await page.click("input[name='terms']", {clickCount:1});

    await continueStep1.click();
    await sleep(1000)
    const [continueStep2] = await page.$x(`//button[contains(text(),"Continue")]`);
    await continueStep2.click();
    await page.waitForSelector(SchoolSignup.step2.password)
    await page.type(SchoolSignup.step2.password, SchoolSignup.step2.inputValue.password);

    await page.waitForSelector(SchoolSignup.step2.confirm)
    await page.type(SchoolSignup.step2.confirm, SchoolSignup.step2.inputValue.confirm);

    await continueStep2.click();
    

  

    await page.waitForSelector(LoginPage.email);
    await sleep(1000);
    await page.type(LoginPage.email, SchoolSignup.step1.inputValue.email);

    await page.waitForSelector(LoginPage.password);
    await sleep(1000);
    await page.type(LoginPage.password, SchoolSignup.step2.inputValue.password);

    await sleep(1000);
    await scrollToBottom(page);

    await page.click(LoginPage.loginButton);
    await sleep(6000);
     // Disable both JavaScript and CSS coverage
     const [jsCoverage, cssCoverage] = await Promise.all([
      page.coverage.stopJSCoverage(),
      page.coverage.stopCSSCoverage(),
    ]);

    pti.write([...jsCoverage, ...cssCoverage], { includeHostname: true, storagePath: './.nyc_output' })

    await browser.close();
  });

}, (500000));