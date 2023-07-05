import puppeteer from "puppeteer-core";

async function run() {
  let browser;
  try {
    const auth = 'brd-customer-hl_a8440a2a-zone-scraping_browser:kc6h726qvqyt';
    browser = await puppeteer.connect({
      browserWSEndpoint: `wss://${auth}@brd.superproxy.io:9222`
    });

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(3 * 60 * 1000);
    await page.goto('https://www.westerncalendar.uwo.ca/Modules.cfm?ModuleID=21123&SelectedCalendar=Live&ArchiveID=');

    const coursesSelector = '#ModuleInformationDiv a[href^="Courses.cfm"]';

    await page.waitForSelector(coursesSelector);

    const courses = await page.evaluate((coursesSelector) => {
      const courseElements = Array.from(document.querySelectorAll(coursesSelector));

      return courseElements.map((element) => {
        const courseName = element.textContent.trim();

        return courseName;
      });
    }, coursesSelector);

    console.log('Courses:', courses);
  } catch (e) {
    console.log('Error:', e);
  } finally {
    await browser?.close();
  }
}

run();


//#CourseInformationDiv > div:nth-child(7) > div
//#CourseInformationDiv > div:nth-child(7) > div
//#CourseInformationDiv > div:nth-child(7) > div
//#CourseInformationDiv > div:nth-child(7) > div