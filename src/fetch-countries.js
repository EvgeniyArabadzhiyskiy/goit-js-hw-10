
export  function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        .then(response => {

            if (!response.ok) {
                const message = `Произошла ошибка: ${response.status} (${response.statusText})`;
                throw new Error(message);
            }
            
            return response.json()
        })
}
