// changer api pour city
// changer police
// améliorer design des résultats ? + nav header

let searchByZipCode = document.querySelector('.search-zipCode');
let searchByCity = document.querySelector('.search-by-city');
let searchByCityBtn = document.querySelector('.search-by-city-btn');
let resultZipCode = document.querySelector('.result-ZipCode');
let resultCity = document.querySelector('.result-city');
let showSearchZipCode = document.querySelector('.show-search-zipCode');
let showSearchByCity = document.querySelector('.show-search-by-city');
let test = document.querySelector('.test');

console.log('tes' +searchByCity)
console.log('gggg' + searchByCity.value)

let urlZipCode = 'https://geo.api.gouv.fr/communes?codePostal=';
let urlByCity = `https://geo.api.gouv.fr/communes?nom=${searchByCity}&fields=departement&boost=population&limit=5`;
let urlByCityWithZipAndPop = `https://geo.api.gouv.fr/communes?nom=${searchByCity}&fields=code,nom,codesPostaux,departement,population`;
let zipCodeData ;

const fetchZipCode = async() => {
    try {
        return await fetch(`${urlZipCode + searchByZipCode.value + `&fields=code,nom,codesPostaux,departement,population`}`)
            .then(response => response.json())
            //.then(data => zipCodeData = data))
            .catch(err => err)
    } catch (error) {
        console.log('erreur : ' + error);
    }  
};
const fetchByCity = async() => {
    try {
        //return await fetch(`https://geo.api.gouv.fr/communes?nom=${searchByCity.value}&fields=departement&boost=population&limit=5`)
        return await fetch(`https://geo.api.gouv.fr/communes?nom=${searchByCity.value}&fields=code,nom,codesPostaux,departement,population`)
            .then(response => response.json())
            //.then(data => console.log(data))
            .catch(err => err)
    } catch (error) {
        console.log('erreur : ' + error);
    }  
};


searchByZipCode.addEventListener('input', () => {
    resultZipCode.innerHTML = ''; // arrange le code si plusieurs recherches à la suite pour le inserAdjacentHTML

    if( searchByZipCode.value.length == 5) {
        showSearchZipCode.innerHTML = 'Résultat de votre recherche pour ' + searchByZipCode.value + ' :'; 
        const showCity = async() => {
            let zipCode = await fetchZipCode();
            console.log('zip code' + zipCode.value);
            let result = `<ul>`
            for (let city of zipCode) {
                result += `<div class="item-result">
                    <p class="text-uppercase text-center">${city.nom}</p>
                    <p>Codes Postaux : ${city.codesPostaux}</p>
                    <p>Département : ${city.departement.nom}</p>
                    <p>Population : ${city.population} habitants</p>
                </div>`
            };
            result += `</ul>`;
            //resultZipCode.innerHTML = result;
            resultZipCode.insertAdjacentHTML("beforeend", result);
        }
        showCity();
    }
})

searchByCity.addEventListener('input', () => {
    //console.log('data');
    resultCity.innerHTML = ''; // permet de supprimer recherches précédentes
    if( searchByCity.value.length >2) {
        // console.log('data2' + searchByCity.value); // ça marche
        showSearchByCity.innerHTML = 'Résultat de votre recherche pour ' + searchByCity.value + ' :';  // ça marche
        const showZipCode = async() => {
            let zipCode2 = await fetchByCity();
            let result = `<ul>`
            for (let city of zipCode2) {  
                result += `
                <div class="d-flex flex-column justify-content-center align-item-center item-result">
                    <p class="text-uppercase text-center">${city.nom}</p>
                    <p>Département : ${city.departement.nom}</p>
                    <p>Codes postaux : ${city.codesPostaux}</p>
                    <p>Code Insee : ${city.code}</p>
                    <p>Population : ${city.population} habitants</p>         
                </div>        
                `
            };
            result += `</ul>`;
            //resultZipCode.innerHTML = result;
            resultCity.insertAdjacentHTML("beforeend", result);
        }
        showZipCode();
    }
    
});

// test recherche au clic du btn recherche,
searchByCityBtn.addEventListener('click', () => {
    // attention api ne donne ni le cp, ni la population !
    console.log('data');
    resultCity.innerHTML = ''; // à un nouveau clic fait s'effacer le résultat précédent
    let result = ''; // pas d'effet pour retirer recherche précédente
    if( searchByCity.value.length > 2) {
        // console.log('data2' + searchByCity.value); // ça marche
        showSearchByCity.innerHTML = 'Résultat de votre recherche pour ' + searchByCity.value + ' :';  // ça marche
        const showZipCode = async() => {
            let zipCode2 = await fetchByCity();
            result = `<ul>`
            for (let city of zipCode2) { 
                result += `<li>${city.nom}</li>`
            };
            result += `</ul>`;
            //resultZipCode.innerHTML = result;
            resultCity.insertAdjacentHTML("beforeend", result);
        }
        showZipCode();
    }
    
});