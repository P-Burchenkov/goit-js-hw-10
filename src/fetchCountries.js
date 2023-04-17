import { Notify } from 'notiflix/build/notiflix-notify-aio';
const URL = 'https://restcountries.com/v3.1/';

export function fetchCountries(name) {
  return fetch(
    `${URL}name/${name}?fields=name,flags,capital,population,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(() => {
      Notify.failure('Oops, there is no country with that name');
    });
}
