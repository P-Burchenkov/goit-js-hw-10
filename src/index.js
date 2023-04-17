import './css/styles.css';
import { fetchCountries } from './fetchCountries';
const debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.getElementById('search-box'),
  countries: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
  removeMarkup();
  const value = evt.target.value.trim();
  if (!value) {
    return;
  }
  fetchCountries(value).then(pickAction);
}

function pickAction(responce) {
  if (!responce) {
    return;
  }
  if (responce.length === 1) {
    makeCardMarkup(...responce);
    console.log('Делаю карточку');
  } else if (responce.length > 2 && responce.length <= 10) {
    console.log('Делаю таблицу');
    makeListMarkup(responce);
  } else if (responce.length > 10) {
    console.log('Набери больше символов!');
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
}

function makeCardMarkup(country) {
  const markUp = `<h2 clas="card-title">
              <svg width="40" height="40">
                <use href="${country.flags.svg}"></use>
            </svg>
            <span> ${country.name.official}</span>
        </h2>
        <p><span class="property">Capital:</span><span class="value">${
          country.capital
        }</span</p>
        <p><span class="property">Population:</span><span class="value">${
          country.population
        }</span></p>
        <p><span class="property">Languages:</span><span class="value">${Object.values(
          country.languages
        )}</span></p>`;
  refs.info.insertAdjacentHTML('beforeend', markUp);
}
function makeListMarkup(countries) {
  const markUp = countries.reduce((acc, country) => {
    return (
      acc +
      `<li>
            <svg width = "40" height = "40">
                <use  href="${country.flags.svg}"></use>
            </svg>
            <span>${country.name.official}</span>
        </li>`
    );
  }, '');
  refs.countries.insertAdjacentHTML('beforeend', markUp);
}
function removeMarkup() {
  refs.countries.innerHTML = '';
  refs.info.innerHTML = '';
}
