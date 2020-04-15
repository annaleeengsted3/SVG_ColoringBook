"use strict";
let svg = {};
let svg2 = {};
const selected = document.querySelector(".selected");
const colorPicker = document.querySelector("#color_picker");
let objectClicked;
let color = "#8a77f1";
let bool = true;
//to save:
let saved = localStorage.getItem("savedHTMLData1");

window.addEventListener("load", init);

function init() {
  console.log("init");
  selected.style.setProperty("--selected", "#8a77f1");
  fetchSVG1();
}

async function fetchSVG1() {
  let url = "skullman.svg";
  let svgData = await fetch(url);
  svg = await svgData.text();
  fetchSVG2();
}
async function fetchSVG2() {
  let url = "skull.svg";
  let svgData = await fetch(url);
  svg2 = await svgData.text();
  showSVG();
}

function showSVG() {
  console.log(bool);
  document.querySelector("#theSVG").innerHTML = "";
  if (bool == true) {
    document.querySelector("#theSVG").innerHTML = svg;
  } else {
    document.querySelector("#theSVG").innerHTML = svg2;
  }
  //to save:
  if (saved) {
    console.log("getting saved data");
    document.querySelector("body").innerHTML = saved;
  }
  colorPicker.addEventListener("input", function() {
    color = event.target.value;
    colorPicker.value = color;
    selected.style.setProperty("--selected", color);
    document.querySelector("p").textContent = color;
  });
  document.querySelector("body").addEventListener("click", clickController);
  document.querySelectorAll("#fills > *").forEach(shape => {
    shape.dataset.type = "shape";
  });
}

function clickController() {
  let element = event.target;
  if (element.getAttribute("data-type") == "swatch") {
    clickedSwatch(element);
  } else if (element.getAttribute("data-type") == "shape") {
    clickedShape(element);
  } else if (element.getAttribute("data-type") == "switch") {
    switchSVG();
  } else if (element.getAttribute("data-type") == "save") {
    save();
  } else if (element.getAttribute("data-type") == "add_swatch") {
    addSwatch();
  }
}

function switchSVG() {
  if (bool == true) {
    bool = false;
  } else {
    bool = true;
  }
  showSVG();
}

function addSwatch() {
  const dest = document.querySelector(".palette-grid");
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  copy.querySelector("div").style.backgroundColor = color;
  // copy.querySelector(".delete").addEventListener("click", () => {
  //   deleteIt(swatch._id);
  // });
  dest.prepend(copy);
  selected.style.setProperty("--selected", color);
  document.querySelector("p").textContent = color;
}

function clickedSwatch(element) {
  color = getComputedStyle(element).backgroundColor;
  selected.style.setProperty("--selected", color);
  document.querySelector("p").textContent = color;
}

function clickedShape(element) {
  element.style.fill = color;
}

function save() {
  console.log("saving");
  localStorage.setItem("savedHTMLData1", document.querySelector("body").innerHTML);
}
