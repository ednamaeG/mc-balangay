// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
    firebaseConfig : {
      apiKey: "AIzaSyB9BWSxFOq9CJA4n1zTk-q75qp8IzvVeKM",
      authDomain: "e-learning-ab57e.firebaseapp.com",
      databaseURL: "https://e-learning-ab57e-default-rtdb.firebaseio.com",
      projectId: "e-learning-ab57e",
      storageBucket: "e-learning-ab57e.appspot.com",
      messagingSenderId: "326558500876",
      appId: "1:326558500876:web:6d46fcf1fa6cd00ed7c629",
      measurementId: "G-BZKH9WLPW1"
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
