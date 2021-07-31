// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
    firebaseConfig : {
    apiKey: "AIzaSyBZgc_-e-SAXe3qAuwI_xLrtdbSlRmdGqw",
    authDomain: "e-learning-ab57e.firebaseapp.com",
    databaseURL: "https://e-learning-ab57e-default-rtdb.firebaseio.com",
    projectId: "e-learning-ab57e",
    storageBucket: "e-learning-ab57e.appspot.com",
    messagingSenderId: "326558500876",
    appId: "1:326558500876:web:4095efa18255682cd7c629",
    measurementId: "G-1PJ0MWM4EN"
  }
};


export const apiUrl = environment.production ? "" : "http://192.168.100.11:8000/api"
export const BASE_URL = environment.production ? "" : "http://192.168.100.11:8000"


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
