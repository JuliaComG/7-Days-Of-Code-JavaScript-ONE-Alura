document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems);
});

let numeroUm = 1
let stringUm = '1'
let numeroTrinta = 30
let stringTrinta = '30'
let numeroDez = 10
let stringDez = '10'

console.log('numeroUm = 1')
console.log('stringUm = \'1\'')
console.log('numeroTrinta = 30')
console.log('stringTrinta = \'30\'')
console.log('numeroDez = 10')
console.log('stringDez = \'10\'')
  

if ( (numeroUm == stringUm) && !(numeroUm === stringUm) ) {
  console.log('As variáveis numeroUm e stringUm tem o mesmo valor, mas tipos diferentes')
} else {
  console.log('As variáveis numeroUm e stringUm não tem o mesmo valor')
}

if (numeroTrinta === stringTrinta) {
  console.log('As variáveis numeroTrinta e stringTrinta tem o mesmo valor e mesmo tipo')
} else {
  console.log('As variáveis numeroTrinta e stringTrinta não tem o mesmo tipo')
}

if ( (numeroDez == stringDez) && !(numeroDez === stringDez) ) {
  console.log('As variáveis numeroDez e stringDez tem o mesmo valor, mas tipos diferentes')
} else {
  console.log('As variáveis numeroDez e stringDez não tem o mesmo valor')
}

if ( (typeof numeroUm === typeof numeroTrinta) && (numeroUm != numeroTrinta) ){
    console.log('As variáveis numeroUm e numeroTrinta tem o mesmo tipo, mas valores diferentes')
} else if ( (typeof numeroUm === typeof numeroTrinta) && (numeroUm == numeroTrinta) ){
    console.log('As variáveis numeroUm e numeroTrinta tem o mesmo tipo, mas valores iguais')
} else {
  console.log('As variáveis numeroUm e numeroTrinta não tem o mesmo tipo, nem mesmo valor')
}