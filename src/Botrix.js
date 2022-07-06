const Botrix = function (browser, page) {
  this.addtext = async function (selct, time) {
    let i = true;
    let t = 0;
    let element;
    let text;

    while (i) {
      try {
        if (typeof (time) == 'object') {
          element = await page.$(selct);
          text = await page.evaluate(el => el.textContent, element);
          i = false;
          time.e = true;
          time.m = text;
        } else {
          element = await page.$(selct);
          text = await page.evaluate(el => el.textContent, element);
          return text;
          i = false;
        }

      } catch (e) {

      }
      await page.waitFor(100);
      if (typeof (time) != 'object') {
        t = 100 + t;
        if (t > time) {
          return false;
        }
      }
    }


  };
  this.click = async function (selct, time) {
    let i = true;
    let t = 0;
    while (i) {
      try {
        if (time) {
          await page.click(selct);
          i = false;
        } else {
          await page.click(selct);
          return true;
          i = false;
        }

      } catch (e) {

      }
      await page.waitFor(100);
      if (typeof (time) != 'object') {
        t = 100 + t;
        if (t > time) {
          return false;
        }
      }
    }
  };
  this.inputPress = async function (select, str, time) {
    let i = true;
    let t = 0;
    while (i) {
      try {
        console.log(typeof (time));
        if (time) {
          console.log('ok1');
          const inputValue = await page.$eval(select, el => el.value);
          console.log(inputValue);
          for (let i = 0; i < inputValue.length; i++) {
            // await page.keyboard.press('Backspace');
            await (await page.$(select)).press('Backspace');
          }
          for (let i in str) {
            console.log(str[i]);
            await (await page.$(select)).press(str[i]);
          }
          i = false;
        } else {
          const inputValue = await page.$eval(select, el => el.value);
          for (let i = 0; i < inputValue.length; i++) {
            await (await page.$(select)).press('Backspace');
          }
          for (let i in str) {
            await (await page.$(select)).press(str[i]);
          }
          return true;
          i = false;
        }

      } catch (e) {
        console.log(e);
      }
      await page.waitFor(100);
      if (typeof (time) != 'object') {
        t = 100 + t;
        if (t > time) {
          return false;
        }
      }
    }
  };
  this.inputvalues = async function (select, str, time) {
    let i = true;
    let t = 0;
    while (i) {
      try {
        if (typeof (time) == 'object') {
          await page.$eval(select, el => el.value = str);
          i = false;
          time.e = true;
        } else {
          await page.$eval(select, el => el.value = str);
          return true;
          i = false;
        }

      } catch (e) {

      }
      await page.waitFor(100);
      if (typeof (time) != 'object') {
        t = 100 + t;
        if (t > time) {
          return false;
        }
      }
    }
  };
};
exports.Botrix = Botrix;
