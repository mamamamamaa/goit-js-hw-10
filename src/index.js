import './css/styles.css';
import fetchCountry from './fetchApi';

// === libraries ===
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const debounce = require('lodash.debounce');

// === styles ===
import 'notiflix/dist/notiflix-3.2.5.min.css';

// === consts ===
const DEBOUNCE_DELAY = 300;

// === code

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  box: document.querySelector('.country-info'),
};

refs.input.addEventListener(
  'input',
  debounce(e => {
    refs.list.innerHTML = '';
    if (e.target.value.trim() === '') {
      return;
    }
    fetchCountry(e.target.value.trim())
      .then(data => {
        if (data.length >= 10) {
          return Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (data.length >= 2) {
          const country = data.reduce((acc, el) => {
            return (acc += `
              <li class='list-item'>
                <img class="country-flag" src="${el.flags.svg}" alt="${el.name.official}" width="25">
                <span class="country-name">${el.name.official}</span>
              </li>`);
          }, '');
          refs.list.innerHTML += country;
        } else if (data.length === 1) {
          const [
            {
              name: { official: name },
              capital,
              population,
              flags: { svg },
              languages,
            },
          ] = data;
          console.log(languages);
          refs.list.innerHTML = `
           <div class="name-container">
              <img class="country-flag" src="${svg}" alt="${name}" width="9%"/>
              <h2>${name}</h2>
           </div>
            <ul class="info-list">
              <li>Capital: <span>${capital}</span></li>
              <li>Population: <span>${population}</span></li>
              <li>languages: <span>${Object.values(languages).join(
                ', '
              )}</span></li>
            </ul>
          `;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, DEBOUNCE_DELAY)
);
