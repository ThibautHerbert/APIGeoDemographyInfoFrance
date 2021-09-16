let searchZipCode = document.querySelector('.search-zipCode');
let resultZipCode = document.querySelector('.result-ZipCode');

let urlZipCode = 'https://geo.api.gouv.fr/communes?codePostal=';

const fetchZipCode = async() => {
    try {
        return await fetch(`${urlZipCode + searchZipCode.value}`)
            .then(response => response.json()
            .then(data => console.log(data)))
    } catch (error) {
        console.log('erreur : ' + error);
    }  
};

searchZipCode.addEventListener('input', () => {
    if( searchZipCode.value.length == 5) {
        resultZipCode.innerHTML = ' ' + searchZipCode.value + ' :'; 
        let zipCode = fetchZipCode();
        console.log(zipCode);
    }
    
})
