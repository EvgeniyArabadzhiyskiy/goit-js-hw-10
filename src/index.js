import './css/styles.css';
const debounce = require('lodash.debounce');
import {fetchCountries} from './fetch-countries';
import countriesMarkupTpl from './templates/country-tpl.hbs';
import countryMarkupDataTpl from './templates/country-data-tpl.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countriList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

refs.input.addEventListener('input', debounce(onFetcchCountryInfo,DEBOUNCE_DELAY));

function onFetcchCountryInfo(evt) {
    const searchQuery = evt.target.value.trim()

    if (searchQuery === '') {
        makesCountryMarkup('');
        return
    }

    fetchCountries(searchQuery).then(countries => {

        console.log(countries);
      
        if (countries.length > 10) {
            Notify.info('Too many matches found. Please enter a more specific name.');
            makesCountryMarkup('');
            
        }

        if (countries.length >= 2 && countries.length <= 10) {
            const countryDataFilter = countries.map(getCountriesInfo);
           
            makesCountryMarkup(countriesMarkupTpl(countryDataFilter));
        }

        if (countries.length === 1) {
            const countryDataFilter = countries.map(getCountryDetales);
            
            makesCountryMarkup(countryMarkupDataTpl(countryDataFilter));
            
        }
              
    })
        .catch(e => {
            makesCountryMarkup('');
            console.log(e)
        });   
}


function getCountriesInfo({flags,name}) {
    return {
        flag: flags.svg,
        country: name.official,
    }
}

function getCountryDetales({ flags, name, capital, population,languages }) {        
    return {
        flags,
        name,
        population,
        capital,
        languages: Object.values(languages).join(', '),
    }
}

function makesCountryMarkup(value) {
    refs.countryInfo.innerHTML = value
}
