const fs = require('fs')

const array = [
  { "vara": "Aaa", "pris": 100 },
  { "vara": "Bbb", "pris": 200 },
  { "vara": "Ccc", "pris": 300 }];

console.log(array);

const d = new Date().toLocaleDateString()
const t = new Date().toLocaleTimeString()

const when = [{ "datum": "Datum: " + d +", Kl."+ t }]

array.push(when[0])

console.log(array);

fs.writeFileSync('./kastas.json', JSON.stringify(array, null, 2), (err) => {
  if (err) throw err; console.log('vara written to file');
});




// const d = new Date().toLocaleDateString()

// const t = new Date().toLocaleTimeString()

// const event = new Date()


// console.log(`    Datum: ${d}`)
// console.log(`Klockslag: ${t}`)

