// cominciamo!

// salvo una costante con il nome della chiave, così la scrivo una volta sola ed evito di fare un typo
const localStorageKey = 'notepad-memory'

// prendo un riferimento alla textarea nel documento
const textAreaReference = document.getElementById('text-content')

// ora prendiamo i riferimenti dei tre bottoni
const saveButton = document.getElementById('save-button')
const loadButton = document.getElementById('load-button')
const resetButton = document.getElementById('reset-button')

const save = () => {
  // recupero il contenuto della textarea, e me lo salvo in una variabile
  const content = textAreaReference.value
  // content è una stringa, non dobbiamo fare conversioni strane per salvarne il valore in localStorage
  localStorage.setItem(localStorageKey, content)
  alert('Blocco note salvato!')
}

const load = () => {
  const memory = localStorage.getItem(localStorageKey) // può essere una stringa o null (se non abbiamo salvato niente preced.)
  if (memory) {
    // avevamo salvato un valore nel localStorage e l'abbiamo recuperato! rimettiamo il valore di "memory" nella textarea
    textAreaReference.value = memory
  } else {
    // non è stato salvato niente precedentemente nella chiave 'notepad-memory', informo l'utente!
    alert('Memoria non presente!')
  }
}

const reset = () => {
  // dobbiamo chiedere conferma all'utente, poi svuotare il form e cancellare la memoria in localStorage
  if (window.confirm('ATTENZIONE! Resettare il blocco note?')) {
    // entro qua dentro solamente se clicco OK
    console.log('ora elimino tuttoooo')
    // svuoto la textarea
    textAreaReference.value = ''
    // eliminare la key 'notepad-memory' dal localStorage
    localStorage.removeItem(localStorageKey) // localStorageKey è 'notepad-memory'
  }
}

saveButton.addEventListener('click', save)
loadButton.addEventListener('click', load)
resetButton.addEventListener('click', reset)
