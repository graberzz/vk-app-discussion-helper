import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAzbLKtGmP2-HOUH70gSVx8EeN8W4rcaUc",
    authDomain: "discussion-helper.firebaseapp.com",
    databaseURL: "https://discussion-helper.firebaseio.com",
    projectId: "discussion-helper",
    storageBucket: "discussion-helper.appspot.com",
    messagingSenderId: "704104783451"
  };

firebase.initializeApp(config)

const db = firebase.firestore()
const random = (min, max) =>  Math.floor(Math.random() * (max - min +1 )) + min

export const getRandomQuote = async () => {
    const querySnapshot = await db.collection('quotes').get()

    const quotes = []

    querySnapshot.forEach(doc => {
        quotes.push(doc.data().text)
    })

    return quotes[random(0, quotes.length - 1)]
}

export const getFavorite = () => {
    const quotesJSON = localStorage.getItem('quotes')

    if (quotesJSON === null) {
        return []
    }

    return JSON.parse(quotesJSON)
}

export const addToFavorite = (quote) => {
    const quotes = getFavorite()

    quotes.push(quote)

    localStorage.setItem('quotes', JSON.stringify(quotes))
}

export const sendFeedback = ({ message, user }) => {
    return db.collection('feedback').add({
        message, user
    })
}

export const getFeedbacks = async () => {
    const querySnapshot = await db.collection('feedback').get()
    const feedbacks = []

    querySnapshot.forEach(doc => {
        feedbacks.push(doc.data())
    })

    return feedbacks
}


export const addQuote = ({ quote }) => {
    return db.collection('quotes').add({
        text: quote
    })
}