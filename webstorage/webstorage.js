// Le WEB Storage API nascono con la standardizzazione di HTML5, al fine di permettere allo sviluppatore di salvare
// in modo più o meno "persistente" delle informazioni all'interno del browser e di migliorare una tecnologia precedente (cookies)
// localStorage e sessionStorage permettono di salvare molte più informazioni rispetto ai cookie (circa 5MB)
// entrambi i motori salvano dati a livello di DOMINIO (quindi le informazioni salvate sono a "compartimenti stagni"
// si differenziano in quanto localStorage salva le informazioni fino alla loro esplicita eliminazione (che può avvenire
// svuotando la cache del browser, eliminando a mano le chiavi dagli strumenti di sviluppo oppure utilizzando JS) mentre
// sessionStorage autodistrugge il suo contenuto alla chiusura del tab/finestra del browser.

// nonostante queste due memorie siano gestite dal browser in spazi separati, i metodi JS per la loro interazione sono condivisi:
// - setItem() per salvare una coppia chiave/valore
// - getItem() per leggere un valore salvato
// - removeItem() per rimuovere una coppia chiave/valore
// - clear() per svuotare l'intero contenuto della memoria

// ricordiamoci che queste memorie sono volendo completamente esposte ad un utente esperto, non utilizzatele per salvare
// informazioni sensibili, riservate, o niente che non possiate permettervi di perdere.

localStorage.setItem('benchmarkResult', 80) // salva nel localStorage il valore "80" con il nome "benchmarkResult"
localStorage.setItem('currentUser', 'Stefano')

sessionStorage.setItem('temporaryData', 100)

const result = localStorage.getItem('benchmarkResult') // "80"
console.log('RISULTATO SALVATO', result)

const boh = localStorage.getItem('ciaone') // null
console.log('leggo una proprietà che non esiste', boh)

localStorage.removeItem('benchmarkResult') // elimino benchmarkResult dal localStorage

localStorage.clear() // piallo tutto

// sessionStorage e localStorage riescono a salvare SOLAMENTE STRINGHE!
// setItem salva il valore fornito sotto forma di STRINGA

localStorage.setItem('obj', { firstName: 'Stefano' })
console.log(localStorage.getItem('obj')) // ci torna letteralmente "[object Object]", -> abbiamo perso il dato!

// per convertire correttamente un oggetto/array in una stringa, utilizziamo un metodo dell'oggetto chiamato JSON
localStorage.setItem('correctObj', JSON.stringify({ firstName: 'Stefano' }))

// SE DOVETE SALVARE UN ARRAY O UN OGGETTO NEL LOCAL/SESSION-STORAGE, utilizzate JSON.stringify()
// otterrete così una CORRETTA trasposizione dell'oggetto in una stringa

// ora recuperiamo il valore
const retrievedValue = localStorage.getItem('correctObj')
console.log(retrievedValue) // correctObj ma in formato stringa!
console.log(retrievedValue.firstName) // NON FUNZIONA!!
// abbiamo bisogno di farlo TORNARE in forma oggetto!
// utilizziamo il metodo "speculare" di stringify(), ovvero parse()
const retrievedValueAsObject = JSON.parse(retrievedValue)
console.log(retrievedValueAsObject.firstName)

// utilizziamo JSON.stringify() per convertire ARRAY/OGGETTI in stringhe nel modo corretto!
// utilizziamo JSON.parse() per ri-convertire stringhe salvate nel modo corretto nuovamente in ARRAY/OGGETTI (quelli originari)
