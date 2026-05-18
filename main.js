// jshint esversion: 8

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runSelect(event) {
  event.preventDefault();

  // Keep scrolling until all buttons show up.
  let buttons = document.getElementsByClassName('clip-button');
  let btnCount = buttons.length;
  for (;;) {
    buttons[buttons.length-1].scrollIntoView({ block: 'center' });
    await sleep(500);
    buttons = document.getElementsByClassName('clip-button');
    if (buttons.length <= btnCount) break;
    btnCount = buttons.length;
  }

  // Click on every coupon button.
  buttons = document.getElementsByClassName('clip-button');
  console.log(buttons.length + ' coupons found');

  let clicked = 0;
  for (let button of buttons) {
    button.click();
    clicked++;
  }

  alert(`Clicked on ${clicked} coupons`);
}

function init() {
  // Make a new button for our action.
  let newbutton = document.createElement('button');
  newbutton.name = 'clip_all_coupons';
  newbutton.id = 'clip_all_coupons';
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

  // Insert button at top of page.
  let elems = document.getElementsByTagName('body');
  elems[0].insertBefore(newbutton, elems[0].childNodes[0]);
}

init();

// -- The End --
