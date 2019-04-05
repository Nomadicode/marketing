import Firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyDL_o2Mwddh7PqFdPAQXRg5cz8fiJBNsrw',
  authDomain: 'nomadicode-landing.firebaseapp.com',
  databaseURL: 'https://nomadicode-landing.firebaseio.com',
  projectId: 'nomadicode-landing',
  storageBucket: 'nomadicode-landing.appspot.com',
  messagingSenderId: '434664173170'
}

const firebaseApp = Firebase.initializeApp(config)

export const db = firebaseApp.database()
