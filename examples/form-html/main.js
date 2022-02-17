// Get environment variable
import { KONTENBASE_API_KEY } from './env.js'

// Setup HTML DOM elements
const formElement = document.getElementById('name-form')
const listElement = document.getElementById('names-list')

// Setup Kontenbase SDK Client
const kontenbaseClient = new kontenbase.KontenbaseClient({
  apiKey: KONTENBASE_API_KEY,
})

// Submit name field from the form to the API
const submitName = async (event) => {
  event.preventDefault()

  const formData = new FormData(formElement)
  const nameInputValue = formData.get('name')

  if (nameInputValue) {
    const { data, error } = await kontenbaseClient.service('names').create({
      name: nameInputValue,
    })

    if (data) {
      renderNames()
    }
  }
}

// Render all names from the API
const renderNames = async () => {
  listElement.innerHTML = ''

  const { data, error } = await kontenbaseClient.service('names').find()

  if (data) {
    data.forEach((item) => {
      listElement.insertAdjacentHTML('beforeend', `<li>${item.name}</li>`)
    })
  }
}

// Attach function to submit event
formElement.addEventListener('submit', submitName)

// Render once at start
renderNames()
