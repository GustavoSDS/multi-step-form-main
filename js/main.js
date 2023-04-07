'use strict'
/* Section sidebar variables and const*/
let sidebarNumber = document.querySelectorAll('.sidebar__number');

/* Section variables for button Next, Back and Confirm */
let btnBack = document.querySelector('.btn-container__btn-back');
let btnNext = document.querySelector('.btn-container__btn-next');
let btnConfirm = document.querySelector('.btn-container__btn-confirm');

/* Section const for cards stpes 1, 2, 3, 4, thanks */
const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const step3 = document.getElementById('step-3');
const step4 = document.getElementById('step-4');
const thanks = document.getElementById('thanks');

/* Step one: variables for inputs */
let name = document.querySelector('#name');
let email = document.querySelector('#email');
let tel = document.querySelector('#tel');

/* Variables for error inputs */
let errorName = document.querySelector("#errorName");
let errorEmail = document.querySelector("#errorEmail");
let errorTel = document.querySelector("#errorTel");

/* Variables for section select yuour plan */
let planArcade = document.querySelector('#arcade');
let planAdvanced = document.querySelector('#advanced');
let planPro = document.querySelector('#pro');
let planSelected = planArcade;
let btnToogle = document.querySelector("#toggle");
let labelMonthly = document.querySelector('#labelMonthly');
let labelYearly = document.querySelector('#labelYearly');
let planPrices = document.querySelectorAll('.select-plan__price');
let textFreeMonths = document.querySelectorAll('.select-plan__free-months');
let planType = "Monthly";
let planName;
let planPrice;

/* Section  add-ons variables for inputs */
const addOns = document.querySelectorAll('.add-ons__service');
const servicesPrices = document.querySelectorAll('.add-ons__price-service');
let selectedServices = [];

/* Section finishing-up for variables  */
const cardPlan = document.querySelector('.finishing-up__container-plan');
const cardAddOns = document.querySelector('.finishing-up__container-add-ons');
const cardPriceTotal = document.querySelector('.finishing-up__total');

/* Event click in button Next */
btnNext.addEventListener('click', () => {
  if (evalStep1()) { }
  else if (evalStep2()) { }
  else if (evalStep3()) { }
  else { return false; }
});
btnConfirm.addEventListener('click', () => {
  evalStep4();
});

btnBack.addEventListener('click', () => {
  if (getDisplay(step2) === 'block') {
    setDisplay(step2, step1);
    setDisplay(btnBack, btnNext);
    addClassList(sidebarNumber[0], 'sidebar__number--active');
    removeClassList(sidebarNumber[1], 'sidebar__number--active');

  } else if (getDisplay(step3) === 'block') {
    setDisplay(step3, step2);
    setDisplay(btnConfirm, btnNext);
    addClassList(sidebarNumber[1], 'sidebar__number--active');
    removeClassList(sidebarNumber[2], 'sidebar__number--active');

  } else if (getDisplay(step4) === 'block') {
    setDisplay(step4, step3);
    setDisplay(btnConfirm, btnNext);
    addClassList(sidebarNumber[2], 'sidebar__number--active');
    removeClassList(sidebarNumber[3], 'sidebar__number--active');

  } else if (getDisplay(thanks) === 'block') {
    console.log("This is thanks");
  }
});

planAdvanced.addEventListener('click', () => {
  togglePlanActive(planAdvanced, [planArcade, planPro]);
});

planPro.addEventListener('click', () => {
  togglePlanActive(planPro, [planArcade, planAdvanced]);
});

planArcade.addEventListener('click', () => {
  togglePlanActive(planArcade, [planAdvanced, planPro]);
});

btnToogle.addEventListener('click', () => {
  if (btnToogle.checked) {
    addClassList(labelYearly, 'select-plan__name-plan--active');
    removeClassList(labelMonthly, 'select-plan__name-plan--active');
    textFreeMonths.forEach(paragraph => paragraph.style.display = "block");
    planPrices.forEach(price => {
      const text = price.textContent;
      price.textContent = text.replace('/mo', '0/yr');
    });
    servicesPrices.forEach(price => {
      const text = price.textContent;
      price.textContent = text.replace('/mo', '0/yr');
    });
    planType = "Yearly";
  } else {
    addClassList(labelMonthly, 'select-plan__name-plan--active');
    removeClassList(labelYearly, 'select-plan__name-plan--active');
    textFreeMonths.forEach(paragraph => paragraph.style.display = "none");
    planPrices.forEach(price => {
      const text = price.textContent;
      price.textContent = text.replace('0/yr', '/mo');
    });
    servicesPrices.forEach(price => {
      const text = price.textContent;
      price.textContent = text.replace('0/yr', '/mo');
    });
    planType = "Monthly";
  }
});

addOns.forEach(addOn => {
  const check = addOn.querySelector('.add-ons__check');
  const name = addOn.querySelector('.add-ons__name-service').textContent;
  const price = addOn.querySelector('.add-ons__price-service').textContent;

  check.addEventListener('change', () => {
    if (check.checked) {
      selectedServices.push({ name, price });
    } else {
      const index = selectedServices.findIndex(service => service.name === name && service.price === price);
      if (index !== -1) {
        selectedServices.splice(index, 1);
      }
    }
  });
});


/* Function for validate steps */
function evalStep1() {
  if (getDisplay(step1) === 'block') {
    let validName = isValidInput(name, errorName);
    let validEmail = isValidInput(email, errorEmail);
    let validTel = isValidInput(tel, errorTel);

    if (validName && validEmail && validTel) {
      addClassList(sidebarNumber[1], 'sidebar__number--active');
      removeClassList(sidebarNumber[0], 'sidebar__number--active');

      setDisplay(step1, step2)
      setDisplay(undefined, btnBack)
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function evalStep2() {
  if (getDisplay(step2) === 'block') {
    setDisplay(step2, step3);
    setDisplay(undefined, btnBack);
    addClassList(sidebarNumber[2], 'sidebar__number--active');
    removeClassList(sidebarNumber[1], 'sidebar__number--active');
    planName = planSelected.querySelector('.select-plan__text').textContent;
    planPrice = planSelected.querySelector('.select-plan__price').textContent;
    return true;
  } else {
    return false;
  }
}

function evalStep3() {
  if (getDisplay(step3) === 'block') {
    setDisplay(step3, step4);
    setDisplay(btnNext, btnConfirm);
    addClassList(sidebarNumber[3], 'sidebar__number--active');
    removeClassList(sidebarNumber[2], 'sidebar__number--active');

    cardAddOns.innerHTML = "";
    cardPlan.innerHTML = `
    <div class="finishing-up__text">
    <span id="plan-selected">${planName}<span id="type-plan">(${planType})</span></span>
    <a href="#" id="change-plan">Change</a>
    </div>
    <p id="price-plan">${planPrice}</p>
    `;
    let priceTotal = getPriceFromString(planPrice);
    selectedServices.forEach(service => {
      let price = service.price;
      priceTotal += getPriceFromString(price);
      cardAddOns.innerHTML += `
        <div class="finishing-up__container">
          <p id="service-selected">${service.name}</p>
          <p class="price-service">${price}</p>
        </div>
      `;
    });

    if (planType === "Monthly") {
      priceTotal += "/mo"
    } else {
      const priceService = document.querySelectorAll(".price-service");
      priceTotal = getPriceFromString(planPrice);
      priceService.forEach(prices => {
        let price = prices.innerHTML;
        prices.innerHTML = getPriceFromString(price) + "0/yr";
        price = prices.innerHTML;
        priceTotal += getPriceFromString(price);
      });
      priceTotal += "/yr"
    }

    cardPriceTotal.innerHTML = `
        <p>Total (per <span id="name-plan">${planType.slice(0, -2)}</span>)</p>
        <p id="price-total">+$${priceTotal}</p>
    `;
    return true;
  } else {
    return false;
  }
}

function evalStep4() {
  if (getDisplay(step4) === 'block') {
    setDisplay(step4, thanks);
    setDisplay(btnConfirm, undefined);
    setDisplay(btnBack, undefined);
    return true;
  } else {
    return false;
  }
}



/* Others functions the utilities */
function togglePlanActive(plan, others) {
  planSelected = plan;
  addClassList(plan, 'select-plan__container--active');
  others.forEach(other => removeClassList(other, 'select-plan__container--active'));
}

function getPriceFromString(priceString) {
  return parseInt(priceString.match(/\d+/));
}

function isValidInput(input, error) {
  if (input.value == "") {
    setDisplay(undefined, error);
    addClassList(input, 'border-error');
    return false;
  } else {
    removeClassList(input, 'border-error');
    setDisplay(error, error);
    return true;
  }
}

function addClassList(element, nameClass) {
  element.classList.add(`${nameClass}`);
}
function removeClassList(element, nameClass) {
  element.classList.remove(`${nameClass}`);
}

function getDisplay(element) {
  const style = window.getComputedStyle(element);
  return style.getPropertyValue('display');
}
function setDisplay(elementOld, elementNow) {
  if (elementOld === undefined) {
    elementNow.style.display = 'block';
  } else if (elementNow == undefined) {
    elementOld.style.display = 'none';
  } else {
    elementNow.style.display = 'block';
    elementOld.style.display = 'none';

  }
}








const serviceDivs = document.querySelectorAll('.add-ons__service');

serviceDivs.forEach(function (div) {
  const checkbox = div.querySelector('.add-ons__check');

  checkbox.addEventListener('change', function () {
    if (this.checked) {
      div.style.border = '1px solid hsl(243, 100%, 62%)';
    } else {
      div.style.border = '1px solid hsl(229, 24%, 87%)';
    }
  });
});

