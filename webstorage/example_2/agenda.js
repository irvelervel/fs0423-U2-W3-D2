const localStorageKey = 'agenda-memory'

class Event {
  constructor(_name, _date) {
    this.name = _name
    this.date = _date
  }
}

// prendo i riferimenti degli input name e date
const eventNameReference = document.getElementById('event-name')
const eventDateReference = document.getElementById('event-date')

// prendo il riferimento del pulsante save
const saveButton = document.getElementById('save-button')

const save = () => {
  // usiamo la classe Event per creare un oggetto dotato di proprietà name e date
  const newEvent = new Event(eventNameReference.value, eventDateReference.value)
  console.log(newEvent)
  // ho creato l'evento! ora devo inserirlo nel localStorage nella chiave localStorageKey
  // ...ora però lavoriamo con un oggetto! stringhifizziamolo...
  // localStorage.setItem(localStorageKey, JSON.stringify(newEvent))

  // funziona... ma noi vogliamo salvare questo evento dentro un array di eventi, sempre nel localStorage!
  // recuperiamo prima di tutto quello che GIÀ abbiamo nel localStorage:
  const existingEvents = localStorage.getItem(localStorageKey) // posso ottenere una stringa oppure null
  if (existingEvents) {
    // avevo già degli eventi salvati
    // dobbiamo parsare existingEvents, ottenere quindi un vero array di oggetti, pusharci dentro newEvent
    // e poi risalvare tutto in localStorage (ri-stringhifizzandolo!)
    // 1) parso existingEvents
    const existingEventsAsArray = JSON.parse(existingEvents) // ora è di nuovo un array di oggetti!
    // 2) pusho dentro il mio evento appena creato, aggiungendolo di fatto in fondo all'array
    existingEventsAsArray.push(newEvent)
    // 3) perfetto! ora devo risalvarlo dentro localStorage...
    localStorage.setItem(localStorageKey, JSON.stringify(existingEventsAsArray))
  } else {
    // se entro qui vuol dire che non avevo salvato proprio niente prima!
    // devo innanzitutto creare un array vuoto
    const events = []
    // inserisco il mio primo e unico evento al suo interno
    events.push(newEvent)
    // salvo questo array con un oggetto dentro il localStorage, stringhifizzato!
    localStorage.setItem(localStorageKey, JSON.stringify(events))
    // svuoto il form
  }
  eventNameReference.value = ''
  eventDateReference.value = ''
  generateList()
}

const generateList = () => {
  // questa funzione si occuperà di prelevare tutti gli eventi salvati nel localStorage
  // e generare elementi nella lista (che nasce vuota nell'HTML)
  const savedEvents = localStorage.getItem(localStorageKey) // stringa!!
  // prendiamo un riferimento alla lista vuota
  const bootstrapList = document.getElementById('events-list')
  // svuotiamo la lista prima di tutto... altrimenti aggiungerò pezzi su una lista già parziale!
  bootstrapList.innerHTML = ''
  console.log(savedEvents)
  const savedEventsAsArray = JSON.parse(savedEvents) // array di Events!!
  console.log(savedEventsAsArray)
  // abbiamo ottenuto un array di oggetti!

  if (savedEvents) {
    savedEventsAsArray.forEach((event) => {
      let newLi = document.createElement('li')
      newLi.classList.add('list-group-item') // l'abbiamo reso identico a quelli di Bootstrap
      newLi.innerText = `${event.name} il ${event.date}`
      bootstrapList.appendChild(newLi)
    })
  }
}

saveButton.addEventListener('click', save)

generateList()
