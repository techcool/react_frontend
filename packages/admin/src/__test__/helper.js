export async function scrollToBottom(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

export async function scrollToTop(page) {
  // await page.evaluate( () => {
  //   window.scrollBy(0, window.innerHeight);

  // });
  await page.evaluate(() => window.scrollTo(0, 50));
}

export async function waitForDelay(time) {
  await setTimeout(function () {
    return true;
  }, time);
}

const escapeXpathString = str => {
  const splitedQuotes = str.replace(/'/g, "', \"'\", '");
  return `concat('${splitedQuotes}', '')`;
};

export const clickByText = async (page, text) => {
  const escapedText = escapeXpathString(text);
  const linkHandlers = await page.$x(`//a[contains(text(), ${escapedText})]`);
  console.log("text",text);
  console.log("linkHandlers",linkHandlers);
  if (linkHandlers.length > 0) {
    await linkHandlers[0].click();
  } else {
    throw new Error(`Link not found: ${text}`);
  }
};

export const clickOnButton = async (page, text) => {
  const escapedText = escapeXpathString(text);
  const linkHandlers = await page.$x(`//button[contains(text(), ${escapedText})]`);

  if (linkHandlers.length > 0) {
    await linkHandlers[0].click();
  } else {
    throw new Error(`Button not found: ${text}`);
  }
};

export const sleep =(ms) => {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
};
