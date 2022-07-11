"use strict";

const bill = document.querySelector(".input-bill");
const tip = document.querySelectorAll(".btn-tip");
const tipCustom = document.querySelector(".custom");
const numPeople = document.querySelector("#people");
const results = document.querySelectorAll(".amount-result");
const btnReset = document.querySelector(".btn-reset");
const errorMessage = document.querySelector(".error-msg");

let billVal = 0.0; //default
numPeople.value = 1;
let peopleVal = 1;
let tipVal = 0.25; //active btn

bill.addEventListener("input", function () {
  billVal = parseFloat(bill.value);
  //   console.log(billVal);
  calculateTip();
});

tip.forEach((btn) => {
  btn.addEventListener("click", clicked);
});

function clicked(e) {
  tip.forEach((btn) => {
    btn.classList.remove("btn-active");

    if (e.target.value === btn.value) {
      btn.classList.add("btn-active");
      tipVal = parseFloat(btn.value) / 100; // decimal numbers
    }
  });
  //   console.log(tipVal);
  tipCustom.value = ""; // clear value
  calculateTip();
}

tipCustom.addEventListener("input", function () {
  tipVal = parseFloat(tipCustom.value / 100);
  //   console.log(tipVal);
  tip.forEach((btn) => {
    btn.classList.remove("btn-active");
  });
  if (tipCustom.value !== "") {
    calculateTip();
  }
});

numPeople.addEventListener("input", function () {
  peopleVal = parseInt(numPeople.value);
  if (peopleVal <= 0) {
    errorMessage.classList.add("show-msg");
    setTimeout(function () {
      errorMessage.classList.remove("show-msg");
    }, 2500);
  }
  //   console.log(peopleVal);
  calculateTip();
});

function calculateTip() {
  if (peopleVal >= 1) {
    let tipAmount = (billVal * tipVal) / peopleVal;
    let total = (billVal * (tipVal + 1)) / peopleVal;
    results[0].innerHTML = "$" + tipAmount.toFixed(2);
    results[1].innerHTML = "$" + total.toFixed(2);
  }
}

btnReset.addEventListener("click", function () {
  bill.value = "";
  tipCustom.value = "";
  numPeople.value = "1";
  results[0].innerHTML = "$ 0";
  results[1].innerHTML = "$ 0";
  tip.forEach((btn) => {
    btn.classList.remove("btn-active");
  });
});
