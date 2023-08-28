import { Config } from './config';
import { TeacherSignup ,LoginPage } from './locator';
import { scrollToBottom, scrollToTop, clickByText, clickOnButton,sleep } from './helper';
const puppeteer = require('puppeteer');
const { async } = require('q');
const pti = require('puppeteer-to-istanbul');

test("Teacher Sign up Free Trial", async () => {

  const browser = await puppeteer.launch(Config.launchOptions).then(async browser => {

    const page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 700,deviceScaleFactor: 0.50});
   
    await Promise.all([
      page.coverage.startJSCoverage(),
      page.coverage.startCSSCoverage()
    ]);

    await page.goto(TeacherSignup.url, { waitUntil: 'load', timeout: 0 });

    await sleep(1000)
    const linkHandlers = await page.$x(`//a[contains(text(), "Free Trial")]`);
    await linkHandlers[0].click();

    //Dialog 1

    await page.waitForSelector('.modal', { visible: true });

    const [startAsATeacher] = await page.$x(`//button[contains(text(),"Start As a Teacher")]`);
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
    // Dialog 3
    await scrollToBottom(page);
    await sleep(2000)
    const [joinWithYourEmail] = await page.$x(`//button[contains(text(),"Join With Your Email")]`);
    await joinWithYourEmail.click();
    await sleep(2000)

    //Step 1
    const [continueWithEmail] = await page.$x(`//button[contains(text(),"Continue With Email")]`);
    await scrollToBottom(page);
    await continueWithEmail.click();

    await page.waitForSelector(TeacherSignup.step1.email);
    await page.type(TeacherSignup.step1.email, TeacherSignup.step1.inputValue.email);

    await continueWithEmail.click();
    await sleep(1000)
   
    //step 2
    await scrollToBottom(page);
    await sleep(2000)
    const step2Div = `div[@class='d-flex align-items-center justify-content-between pt-2']`
    const [step2Continue] = await page.$x(`//${step2Div}/button[contains(text(),"Continue")]`);
    await scrollToBottom(page);
    await sleep(500)
    await step2Continue.click();
    await sleep(500);
    await scrollToTop(page)
    await sleep(500);
    await page.waitForSelector(TeacherSignup.step2.firstname);
    await page.type(TeacherSignup.step2.firstname, TeacherSignup.step2.inputValue.firstname);

    await page.waitForSelector(TeacherSignup.step2.lastname);
    await page.type(TeacherSignup.step2.lastname, TeacherSignup.step2.inputValue.lastname);

    
    await scrollToBottom(page);
    await sleep(500)

    await page.waitForSelector(TeacherSignup.step2.username);
    await page.type(TeacherSignup.step2.username, TeacherSignup.step2.inputValue.username);

    await page.waitForSelector(TeacherSignup.step2.password);
    await page.type(TeacherSignup.step2.password, TeacherSignup.step2.inputValue.password);
  
    await page.waitForSelector(TeacherSignup.step2.confirm);
    await page.type(TeacherSignup.step2.confirm, TeacherSignup.step2.inputValue.confirm);
    await scrollToBottom(page);
    await sleep(500)
    await step2Continue.click();
    await sleep(500);

    //step 3:
    await scrollToBottom(page);
    await sleep(2000)
    const step3div = `div[@class='d-flex align-items-center justify-content-between pt-4']`
    const [step3Continue] = await page.$x(`//${step3div}/button[contains(text(),"Continue")]`);
    await scrollToBottom(page);
    await sleep(1000)
    step3Continue.click();
    await sleep(1000)
    await scrollToTop(page);

    await page.waitForSelector(TeacherSignup.step3.grade);
    await page.type(TeacherSignup.step3.grade, TeacherSignup.step3.inputValue.grade);
    page.keyboard.press('Enter');


    await page.type('#react-select-3-input', TeacherSignup.step3.inputValue.hearabout);
    page.keyboard.press('Enter');

    await page.waitForSelector(TeacherSignup.step3.country);
    await page.type(TeacherSignup.step3.country, TeacherSignup.step3.inputValue.country);
    page.keyboard.press('Enter');

    await page.waitForSelector(TeacherSignup.step3.state);
    await page.type(TeacherSignup.step3.state, TeacherSignup.step3.inputValue.state);
    page.keyboard.press('Enter');

    await page.waitForSelector(TeacherSignup.step3.school);
    await page.type(TeacherSignup.step3.school, TeacherSignup.step3.inputValue.school);
    page.keyboard.press('Enter');


    await page.waitForSelector(TeacherSignup.step3.phone);
    await page.type(TeacherSignup.step3.phone, TeacherSignup.step3.inputValue.phone);

    await page.waitForSelector('input[name="terms"]', { visible: true });
    await page.click("input[name='terms']", {clickCount:1});
    await sleep(1000)
    step3Continue.click();
    
    
    //step 4.
    //text-center verify-email
    await sleep(5000)
    // await page.click('#step4-login')
    const continuestep4 = await page.$x(`//a[contains(text(), "Continue")]`);
    await continuestep4[0].click();
    await sleep(4000)
    await page.goto(LoginPage.url, { waitUntil: 'load', timeout: 0 });

    await sleep(1000);
    await scrollToBottom(page);

    await page.click('#submit_btn');

    await scrollToTop(page);

    await page.waitForSelector(LoginPage.email);
    await sleep(1000);
    await page.type(LoginPage.email, TeacherSignup.step1.inputValue.email);

    await page.waitForSelector(LoginPage.password);
    await sleep(1000);
    await page.type(LoginPage.password, TeacherSignup.step2.inputValue.password);

    await sleep(1000);
    await scrollToBottom(page);

    await page.click(LoginPage.loginButton);
    await sleep(6000);

    const [jsCoverage, cssCoverage] = await Promise.all([
      page.coverage.stopJSCoverage(),
      page.coverage.stopCSSCoverage(),
    ]);

    pti.write([...jsCoverage, ...cssCoverage], { includeHostname: true, storagePath: './.nyc_output' })
    
    await browser.close();
    // await browser.close();
  });

}, (500000));