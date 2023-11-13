const prompt = require('prompt-sync')({ sigint: true })
const vara = require('./lager.json')
const kvittens = require('./kvitto.json')
const fs = require('fs')

const varuval = [];

let running = true;

while (running) {
  console.log(`\n\nCYBERSHOPPEN Meny:
----------------------------
1)  Butikens sortiment
2)  Visa varukorg
----------------------------
3)  Lägg till i varukorg
4)  Ta bort vara ur varukorg
5)  Genomför köp
----------------------------
6)  Visa köphistorik
----------------------------
Q)  Avsluta shopping\n`);

  const svar = prompt("Gör ditt menyval: ");

  switch (svar.trim().toUpperCase()) {
    case "1":
      if (vara.length === 0) {
        console.log(`\n\n
---------------------
Varorna är slutsålda.
---------------------
        \n\n\n\n`);
      } else {
        console.log(`\nButikens sortiment:
---------------------`);
        for (let i = 0; i < vara.length; i++) {
          console.log(`${i + 1})  ${vara[i].produkt}    ........ Pris: ${vara[i].pris} kr/st`);
        }
      }
      break;
    case "2":
      if (varuval.length === 0) { console.log("\nVarukorgen är tom."); }
      else {
        console.log((`\nMin varukorg: 
---------------------`));
        for (let i = 0; i < varuval.length; i++) {
          console.log(`${i + 1})  ${varuval[i].produkt}    ........ Pris: ${varuval[i].pris} kr/st`);
        }
      }

      break;
    case "3":
      console.log(`\nLägg till en vara i varukorg:
---------------------`);

      for (let i = 0; i < vara.length; i++) {
        console.log(`${i + 1})  ${vara[i].produkt}    ........ Pris: ${vara[i].pris} kr/st`);
      }
      const index = Number(prompt(`\nSkriv numret på varan du vill lägga till: `).trim());

      if (!isNaN(index) && index >= 1 && index <= vara.length) {
        taBort = vara.splice(index - 1, 1)
        varuval.push(taBort[0])
        console.log(`\nDu har lagt till "${taBort[0].produkt}" för ${taBort[0].pris} kr i varukorgen:\n`);
      }

      break;
    case "4":
      if (varuval.length === 0) {
        console.log("\nVarukorgen är tom.\n");
      }
      else {
        console.log(`\nVarukorgen innehåller: 
---------------------`);
        for (let i = 0; i < varuval.length; i++) {
          console.log(`${i + 1})  ${varuval[i].produkt}    ........ Pris: ${varuval[i].pris} kr/st`);
        }
        const index = Number(prompt(`\nSkriv numret på varan du vill ta bort: `).trim());

        if (!isNaN(index) && index >= 1 && index <= varuval.length) {
          const taBort = varuval.splice(index - 1, 1)
          vara.push(taBort[0])
          console.log(`\n${taBort[0].produkt} för ${taBort[0].pris} kr har tagits bort från varukorgen.`);
        }
      }
      break;
    case "5":
      if (varuval.length === 0) {
        console.log(`\n
-------------------------------
Det finns inga varor att betala
-------------------------------\n`);
      } else {
        console.log(`\n\n----- K V I T T O -----\n`);
        for (let i = 0; i < varuval.length; i++) {
          console.log(`${i + 1})  ${varuval[i].produkt}    ........ Pris: ${varuval[i].pris} kr/st`);
        }
      }
      console.log(`\nTack för ditt köp. Välkommen åter!\n\n`);

      fs.writeFile('./kvitto.json', JSON.stringify(varuval, null, 2), (err) => {
        if (err) throw err; console.log('vara written to file');
      });

      running = false;
      break;
    case "6":
      if (kvittens.length === 0) {
        console.log(`\n\n
-------------------------------
Det finns inga kvitton att visa
-------------------------------\n\n`);
      } else {
        console.log(`\nKÖPHISTORIK
---------------------`);
        for (let i = 0; i < kvittens.length; i++) {
          console.log(`${i + 1})  ${kvittens[i].produkt}    ........ Pris: ${kvittens[i].pris} kr/st`);
        }
      }
      console.log(`\nInga fler köp att visa.\n\n`);
      break;
    case "Q":
      console.log(`\nTack för besöket. Välkommen åter!\n`);
      running = false;
      break;
    default:
      console.log("\nGör ett korrekt val i menyn: \n");
  }
}