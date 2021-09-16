let searchZipCode = document.querySelector('.search-zipCode');
let resultZipCode = document.querySelector('.result-ZipCode');

searchZipCode.addEventListener('input', () => {
    if( searchZipCode.value.length == 5) {
        resultZipCode.innerHTML = ' ' + searchZipCode.value + ' :'; 
    }
    
})
