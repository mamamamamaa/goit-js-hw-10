import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

export default function fetchCountries(name) {
  const errorMessage = 'Oops, there is no country with that name';
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw Notify.failure(errorMessage);
      }
      return response.json();
    })
    .catch(() => errorMessage);
}
