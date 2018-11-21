import { initializeApp, database } from 'firebase';
import config from './firebase.config';

initializeApp(config);

export { database };