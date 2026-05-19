// jshint esversion: 8

const BUTTON_ID = 'clip_all_coupons';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runSelect(event) {
  event.preventDefault();

  const COUPON_CLASS = 'clip-button';

  // Keep scrolling until all buttons show up.

  let buttons = document.getElementsByClassName(COUPON_CLASS);
  let btnCount = buttons.length;

  for (;;) {
    // scroll to bottom
    window.scrollTo(0, document.body.scrollHeight);
    await sleep(500);

    buttons = document.getElementsByClassName(COUPON_CLASS);
    if (buttons.length <= btnCount) break;
    btnCount = buttons.length;
  }

  // Click on every coupon button.
  buttons = document.getElementsByClassName(COUPON_CLASS);
  console.log(buttons.length + ' coupons found');

  let clicked = 0;
  for (let button of buttons) {
    button.click();
    clicked++;
  }

  alert(`Clicked on ${clicked} coupons`);
}

function makeButton() {
  // Make a new button for our action.
  let newbutton = document.createElement('button');
  newbutton.name = newbutton.id = BUTTON_ID;
  newbutton.style.cssText = 'background-color: #fff; color: #E82A24; font-weight: 700; border: solid #E82A24; padding: 6px 10px; cursor: pointer; margin: 10px; width: 100%';
  newbutton.appendChild(document.createTextNode('Clip All Coupons'));
  newbutton.addEventListener('click', runSelect);

  newbutton.addEventListener('mouseenter',
    () => {
      newbutton.style.color = '#fff';
      newbutton.style.backgroundColor = '#E82A24';
    }
  );

  newbutton.addEventListener('mouseleave',
    () => {
      newbutton.style.color = '#E82A24';
      newbutton.style.backgroundColor = '#fff';
    }
  );

  return newbutton;
}

function init() {
  let btn = document.getElementById(BUTTON_ID);

  // Check if we are on the coupons page.
  if (!/wegmans\.com\/shop\/coupons/i.test(window.location.href)) {
    // If element is there but we are not on the correct page, remove it.
    if (btn) btn.parentNode.removeChild(btn);

    return;
  }

  // Skip if button is already there.
  if (btn) return;

  // Insert button at top of page.
  let body = document.querySelector('body');
  body.insertBefore(makeButton(), body.childNodes[0]);
}

// Run the button inserter the first time and also whenever the URL changes.
// Need this because the website does not always reload when moving between pages.
const observeUrlChange = () => {
  let oldHref = null;
  const body = document.querySelector('body');
  const observer = new MutationObserver(mutations => {
    if (oldHref !== document.location.href) {
      oldHref = document.location.href;
      init();
    }
  });
  observer.observe(body, { childList: true, subtree: true });
};

observeUrlChange();

// -- The End --
