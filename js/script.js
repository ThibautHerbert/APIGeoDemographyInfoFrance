let searchZipCode = document.querySelector('.search-zipCode');
let resultZipCode = document.querySelector('.result-ZipCode');
let showSearchZipCode = document.querySelector('.show-search-zipCode');

let urlZipCode = 'https://geo.api.gouv.fr/communes?codePostal=';
let zipCodeData ;

const fetchZipCode = async() => {
    try {
        return await fetch(`${urlZipCode + searchZipCode.value}`)
            .then(response => response.json()
            .then(data => zipCodeData = data))
            .catch(err => err)
    } catch (error) {
        console.log('erreur : ' + error);
    }  
};

searchZipCode.addEventListener('input', () => {
    if( searchZipCode.value.length == 5) {
        showSearchZipCode.innerHTML += 'Résultat de votre recherche pour ' + searchZipCode.value + ' :'; 
        const showCity = async() => {
            let zipCode = await fetchZipCode();
            //console.log('zip code' + zipCode.value);
            let result = `<ul>`
            for (let city of zipCode) {
                result += `<li>${city.nom}</li>`
            };
            result += `</ul>`;
            //resultZipCode.innerHTML = result;
            resultZipCode.insertAdjacentHTML("beforeend", result);
        }
        showCity();
        
    }
    
})
