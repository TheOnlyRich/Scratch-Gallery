// Create the script in a file (e.g., openChrome.js):

const puppeteer = require('puppeteer');
let browser;
(async () => {
    // Launch a browser instance
    browser = await puppeteer.launch({
        headless: false, // Set to false to see the browser UI
        userDataDir: 'C:\Users\chuan\AppData\Local\Google\Chrome\User Data\Profile 7' // Change this path
        // args: ['--auto-open-devtools-for-tabs'], // Automatically open DevTools
    });

    // Open a new page
    const page = await browser.newPage();

    // Navigate to the desired URL
    await page.goto('https://scratch.mit.edu');
    const signInElement = await page.$('#frc-username-1088');
    if (signInElement) {
        const signInSelector = '.ignore-react-onclickoutside';
        await page.waitForSelector(signInSelector);
        await page.click(signInSelector);



        // pwd
        //frc-password-1088
        // gogo123
        const signInPwd = '#frc-password-1088';
        await page.waitForSelector(signInPwd, { delay: 100 });
        await page.click(signInPwd, { delay: 100 });
        await page.keyboard.type('gogo123', { delay: 100 });
        // await page.keyboard.press('Enter');


        // id
        //frc-username-1088
        // gogo_scratch123
        const signInId = '#frc-username-1088';
        await page.waitForSelector(signInId, { delay: 100 });
        await page.click(signInId, { delay: 100 });
        await page.keyboard.type('gogo_scratch123', { delay: 100 });

        // press submit button
        const EnterSelector = '.submit-button';
        await page.waitForSelector(EnterSelector, { delay: 100 });
        await page.click(EnterSelector, { delay: 100 });

    }




    // Execute a script in the console
    await page.evaluate(() => {
        setTimeout(() => {
            console.log("fetching started"); // Display an alert with the document title
            async function fetchAndDownloadJson() {
                var jsonData = "";
                var apiUrl = `https://scratch.mit.edu/site-api/projects/all/?page=${page}&ascsort=&descsort=`;
                try {
                    const response = await fetch(apiUrl);

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    jsonData = await response.json();


                    // Convert JSON data to a string
                    const jsonString = JSON.stringify(jsonData, null, 2); // Pretty-print with 2 spaces

                    // Create a Blob from the JSON string
                    const blob = new Blob([jsonString], { type: 'application/json' });

                    // Create a temporary anchor element
                    const a = document.createElement('a');
                    a.href = URL.createObjectURL(blob);
                    a.download = `page_${page}.json`; // File name for download

                    // Trigger the download
                    a.click();

                    // Clean up the object URL
                    URL.revokeObjectURL(a.href);
                } catch (error) {
                    console.error('Error fetching or downloading JSON data:', error);
                }

                console.log(new Date().toString() + "   page:" + page);
                page++;
                if (jsonData.length >= 40) {
                    setTimeout(fetchAndDownloadJson, 10 * 1000);
                } else {
                   
                }
            }


            // Call the function
            var page = 1;
            setTimeout(fetchAndDownloadJson, 10 * 1000);


        }, 10 * 1000);

    });


setTimeout(() => {
    // Close the browser
     browser.close(); 
}, 60*1000);




})();
