import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyDtH4TMSwo5EykxfZrkBp1hGOtoZzNjIuk',
    authDomain: 'gumroad-test-db75a.firebaseapp.com',
    projectId: 'gumroad-test-db75a',
    storageBucket: 'gumroad-test-db75a.appspot.com',
    messagingSenderId: '311658241975',
    appId: '1:311658241975:web:a532616157f7636b5ed232',
    measurementId: 'G-47QFMXV1MT'
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('app'));