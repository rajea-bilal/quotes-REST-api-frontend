// Global variables
const defaultQuote = document.querySelector('.quote')
const defaultAuthor = document.querySelector('.author')
const getQuoteBtn = document.querySelector('.getQuoteBtn')
const addQuote = document.querySelector(".addQuote")
const containerBottom = document.querySelector(".containerBottom")

let chosenQuote = document.querySelector('#quote')
let chosenAuthor = document.querySelector('#quote-author')
let chosenCategory = document.querySelector('#quote-cat')
const fetchLink = 'http://localhost:5000';

const searchBtn = document.querySelector('.searchBtn')


function displayToDomMain(quoteObj) {
    defaultQuote.textContent = quoteObj.quote
    defaultAuthor.textContent = quoteObj.author
}


getQuoteBtn.addEventListener("click", async (event) => {
    const response = await fetch(`${fetchLink}/random-quote`)

    if(!response.ok) {
        throw new Error()
    }

    const data = await response.json()
    displayToDomMain(data)
})


function displayToDOMBottom(quoteObject) {
    console.log(quoteObject)
    let displayedQuote;

    let quoteLength = quoteObject.quote.length
    if(quoteLength > 200) {
        displayedQuote = quoteObject.quote.slice(0, 150) + '...'
    } else {
        displayedQuote = quoteObject.quote
    }
    // creating a new quote card for each quote
    const quoteCard = document.createElement('div')
    quoteCard.classList.add('quoteCard')

    // populating the quote card with quote & author 
    const quoteOnCard = document.createElement('p')
    const authorOnCard = document.createElement('h5')
    quoteOnCard.classList.add('addedQuote')
    authorOnCard.classList.add('addedQuoteAuthor')

    quoteOnCard.textContent = displayedQuote
    authorOnCard.textContent = quoteObject.author

    quoteCard.appendChild(quoteOnCard)
    quoteCard.appendChild(authorOnCard)

    // appending the quote card to the container
    containerBottom.appendChild(quoteCard)
}
   
// add a quote
addQuote.addEventListener("click", async (event) => {
    event.preventDefault()

    // construct an object
    const chosenQuoteObject = {
        quote: chosenQuote.value,
        author: chosenAuthor.value,
        category: chosenCategory.value
    }
    // convert the data object to JSON
    const dataJSON = JSON.stringify(chosenQuoteObject)


    try {
        // Make a fetch request to the backend with the constructed object
        const response = await fetch(`${fetchLink}/quotes`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: dataJSON
        });

        if (!response.ok) {
            throw new Error('Failed to add quote.'); // Handle error
        }

        const data = await response.json();

        // emptying out the input fields
        chosenQuote.value = ''
        chosenAuthor.value = ''
        chosenCategory.value = ''


        // Display the quote in the DOM after a successful response
        displayToDOMBottom(data);
    } catch (error) {
        console.error(error); // Handle any errors
    }

   
})


// search functionality

searchBtn.addEventListener('click', async (event) => {
    let searchQuery = document.querySelector('.searchInput').value
    const fullURL = `${fetchLink}/quotes/search?q=${searchQuery}`
console.log(fullURL)
   const response = await fetch(fullURL)
   if(!response.ok) {
    throw new Error()
   }

   const data = await response.json()
   console.log(data)
})

