import { Config } from "./config";
import { clickByText, clickOnButton, scrollToBottom, scrollToTop,sleep } from "./helper";
import { FreeTrial, HomePage, LoginPage, StudentSignup } from "./locator";
const puppeteer = require("puppeteer");
const pti = require("puppeteer-to-istanbul");
const { async } = require("q");

test("Student Sign up Free Trial", async () => {

  const browser = await puppeteer.launch(Config.launchOptions).then(async browser => {

    const page = await browser.newPage();
    await page.setViewport({ width: 1000, height: 700,deviceScaleFactor: 0.50 });
    await Promise.all([
      page.coverage.startJSCoverage(),
      page.coverage.startCSSCoverage()
    ]);
    await page.goto(HomePage, { waitUntil: "load", timeout: 0 });

    await sleep(1000);
    const linkHandlers = await page.$x(FreeTrial.menu);
    await linkHandlers[0].click();

    //Dialog 1

    await page.waitForSelector(".modal", { visible: true });

    const [startAsATeacher] = await page.$x(FreeTrial.StudentRoleButtton);
    await startAsATeacher.click();

    await sleep(2000);

    // Dialog 2
    
    const [Continue] = await page.$x(FreeTrial.LibraryDialogSubmit);
    await Continue.click();

    await page.waitForSelector(FreeTrial.Library, { visible: true });
    await page.click(FreeTrial.Library, { clickCount:1 });
    await sleep(1000);

    const [ContinueNext] = await page.$x(FreeTrial.LibraryDialogSubmit);
    await ContinueNext.click();

    await sleep(2000);

    // Student Sign up

    await scrollToBottom(page);
    
    await sleep(1000);

    await page.click(StudentSignup.submitBtnId);

    await sleep(1000);

    await scrollToTop(page);

    await sleep(1000);

    await page.waitForSelector(StudentSignup.firstname);
    await page.type(StudentSignup.firstname,StudentSignup.inputValue.firstname);
    
    await page.waitForSelector(StudentSignup.lastname);
    await page.type(StudentSignup.lastname,StudentSignup.inputValue.lastname);
    
    await page.waitForSelector(StudentSignup.username);
    await page.type(StudentSignup.username,StudentSignup.inputValue.username);
    
    await page.type(StudentSignup.aboutUs, StudentSignup.inputValue.aboutUs);
    await page.keyboard.press("Enter");

    await page.type(StudentSignup.grade, StudentSignup.inputValue.grade);
    await page.keyboard.press("Enter");

    await page.waitForSelector(StudentSignup.email);
    await page.type(StudentSignup.email, StudentSignup.inputValue.email);
    
    await page.waitForSelector(StudentSignup.password);
    await page.type(StudentSignup.password, StudentSignup.inputValue.password);
    
    await page.waitForSelector(StudentSignup.confirm);
    await page.type(StudentSignup.confirm, StudentSignup.inputValue.confirm);

    await page.click(StudentSignup.submitBtnId);

    await sleep(2000);

    await page.waitForSelector(StudentSignup.email);
    await sleep(1000);
    await page.type(StudentSignup.email, StudentSignup.inputValue.email);

    await page.waitForSelector(LoginPage.password);
    await sleep(1000);
    await page.type(StudentSignup.password, StudentSignup.inputValue.password);

    await sleep(1000);
    await scrollToBottom(page);

    await page.click(LoginPage.loginButton);
    await sleep(1000);

    // Disable both JavaScript and CSS coverage
    const [jsCoverage, cssCoverage] = await Promise.all([
      page.coverage.stopJSCoverage(),
      page.coverage.stopCSSCoverage()
    ]);

    pti.write([...jsCoverage, ...cssCoverage], { includeHostname: true, storagePath: "./.nyc_output" });


    await browser.close();
  });

}, (500000));
