// jshint esversion: 8

function insertButton(btn) {
  let waitForSiteTimer;

  function waitForSite() {
    let elems = document.getElementsByTagName('body');
    if (elems.length) {
      clearInterval(waitForSiteTimer);
      elems[0].insertBefore(btn, elems[0].childNodes[0]);
    }
  }

  // Wait for site to finish loading before inserting button.
  waitForSiteTimer = setInterval(waitForSite, 100);
}

function runSelect(event) {
  event.preventDefault();

  // Click on every coupon button.
  let buttons = document.getElementsByClassName('clip-button');
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

  insertButton(newbutton);
}

init();

// -- The End --
