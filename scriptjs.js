'use strict';

import renderWebsite from './render.js';
import {
  closeModal,
  openModal,
  clearForm,
  saveWebsites,
  loadWebsites,
} from '/helpers.js';

const addBtnEl = document.querySelector('.btn--add');
const deleteBtnEl = document.querySelector('.close-modal');
const modalEl = document.querySelector('.modal');
const overlayEl = document.querySelector('.overlay');

const formEl = document.querySelector('.website-form');
const websiteNameEl = document.getElementById('form-website-name');
const websiteUrlEl = document.getElementById('form-website-address');
const websiteDescriptionEl = document.getElementById(
  'form-website-description'
);
const websiteContainerEl = document.querySelector('.website-container');

let websiteList = loadWebsites();
websiteList.forEach(website => {
  renderWebsite(website, websiteContainerEl);
});

class Website {
  constructor(name, address, description) {
    this.name = name;
    this.address = address;
    this.description = description;
    this.id = new Date().valueOf().toString();
  }
  check() {
    console.log(
      `This website is named ${this.name} and is at ${this.address}. It is a website about ${this.description} It has this id ${this.id}`
    );
  }
}

// const test = new Website(
//   'HTAFC',
//   'www.htafc.com',
//   'football team that is poo!'
// );

// test.check();

// showing the modal when the button is clicked

addBtnEl.addEventListener('click', e => {
  openModal(modalEl, overlayEl);
});

deleteBtnEl.addEventListener('click', e => {
  closeModal(modalEl, overlayEl);
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalEl.classList.contains('hidden')) {
    closeModal(modalEl, overlayEl);
  }
});

// getting the information off the form

formEl.addEventListener('submit', function (e) {
  e.preventDefault();
  const newWebsite = new Website(
    websiteNameEl.value,
    websiteUrlEl.value,
    websiteDescriptionEl.value
  );
  //   newWebsite.check();
  websiteList.push(newWebsite);
  renderWebsite(newWebsite, websiteContainerEl);
  saveWebsites(websiteList);
  clearForm(websiteNameEl, websiteUrlEl, websiteDescriptionEl);
});

websiteContainerEl.addEventListener('click', e => {
  if (!e.target.closest('.icon--trash')) return;
  const website = e.target.closest('.website');
  const id = website.dataset.id;
  websiteList = websiteList.filter(website => website.id !== id);
  saveWebsites(websiteList);
  website.remove();
});
