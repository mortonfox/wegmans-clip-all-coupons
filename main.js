// jshint esversion: 8

function insertButton(btn) {
  let waitForSiteTimer;

  function waitForSite() {
    let elems = document.getElementsByClassName('view shop coupons');
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
  let cells = document.getElementsByClassName('cell-badge coupon');
  console.log(cells.length + ' coupons found');

  let clicked = 0;
  for (let cell of cells) {
    let button = cell.getElementsByTagName('button');
    button[0].click();
    clicked++;
  }

  console.log(clicked + ' coupons clicked');
}

function init() {
  // Make a new button for our action.
  let newbutton = document.createElement('button');
  newbutton.name = 'clip_all_coupons';
  newbutton.id = 'clip_all_coupons';
  newbutton.style.cssText = 'background-color: #E82A24; color: #fff; font-weight: 700; border: none; padding: 6px 10px; cursor: pointer; margin: 5px';
  newbutton.appendChild(document.createTextNode('Clip All Coupons'));
  newbutton.addEventListener('click', runSelect);

  insertButton(newbutton);
}

init();

// -- The End --
