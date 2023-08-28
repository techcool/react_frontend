import { Config } from './config';
import { LoginPage, AddATeacher } from './locator';
import { scrollToBottom, scrollToTop, sleep} from './helper';
const puppeteer = require('puppeteer');
const { async } = require('q');
const pti = require('puppeteer-to-istanbul');

test("School Add Teacher", async () => {

  const browser = await puppeteer.launch(Config.launchOptions).then(async browser => {

    const page = await browser.newPage();

    await Promise.all([
      page.coverage.startJSCoverage(),
      page.coverage.startCSSCoverage()
    ]);

    await page.goto(LoginPage.url, { waitUntil: 'load', timeout: 0 });

    await sleep(1000);
    await scrollToBottom(page);

    await page.click(LoginPage.loginButton);

    await scrollToTop(page);

    await page.waitForSelector(LoginPage.email);
    await sleep(1000);
    await page.type(LoginPage.email, LoginPage.inputValue.school.email);

    await page.waitForSelector(LoginPage.password);
    await sleep(1000);
    await page.type(LoginPage.password, LoginPage.inputValue.school.password);

    await sleep(1000);
    await scrollToBottom(page);

    await page.click(LoginPage.loginButton);
    await sleep(2000);

  
    await page.waitForSelector(AddATeacher.menu);
    await page.click(AddATeacher.menu);
    await sleep(1000);
    
    await page.waitForSelector(AddATeacher.submenu);
    await page.click(AddATeacher.submenu);
    await sleep(1000);
    
    await page.waitForSelector('.modal', { visible: true });
    await sleep(1000);

    await page.click(AddATeacher.sendInviteSubmit);
    await sleep(1000);
    

    await page.waitForSelector(AddATeacher.firstname);
    await sleep(1000);
    await page.type(AddATeacher.firstname, AddATeacher.inputValue.firstname);
  
    await page.waitForSelector(AddATeacher.lastname);
    await sleep(1000);
    await page.type(AddATeacher.lastname, AddATeacher.inputValue.lastname);
    
    await page.waitForSelector(AddATeacher.email);
    await sleep(1000);
    await page.type(AddATeacher.email, AddATeacher.inputValue.email);


    await page.waitForSelector(AddATeacher.country);
    await page.type(AddATeacher.country, AddATeacher.inputValue.country);
    await page.keyboard.press('Enter');


    await page.waitForSelector(AddATeacher.state);
    await page.type(AddATeacher.state, AddATeacher.inputValue.state);
    await page.keyboard.press('Enter');

    await page.waitForSelector(AddATeacher.school);
    await sleep(1000);
    await page.type(AddATeacher.school, AddATeacher.inputValue.school);
    
    await page.waitForSelector(AddATeacher.phone);
    await sleep(1000);
    await page.type(AddATeacher.phone, AddATeacher.inputValue.phone);
    
    await page.waitForSelector(AddATeacher.grade);
    await page.type(AddATeacher.grade, AddATeacher.inputValue.grade);
    await page.keyboard.press('Enter');

    await page.click(AddATeacher.sendInviteSubmit);
    await sleep(2000);
    
    await page.waitForSelector('.modal', { visible: true });
    await page.waitForSelector(AddATeacher.continue);
    await page.click(AddATeacher.continue);

    const [jsCoverage, cssCoverage] = await Promise.all([
      page.coverage.stopJSCoverage(),
      page.coverage.stopCSSCoverage(),
    ]);

    pti.write([...jsCoverage, ...cssCoverage], { includeHostname: true, storagePath: './.nyc_output' })

    await browser.close();

  });

}, (500000));