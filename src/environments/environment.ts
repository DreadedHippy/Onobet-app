// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  mongoDBuri: 'mongodb+srv://Ownere:AhG!denHh28pRZ5@onobet.2q7xj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  api: 'https://api.football-data.org/v2/competitions/CL/matches?status=SCHEDULED',
  pics: 'http://api.football-data.org/v2/teams/',
  xAuthToken: '440244150fc84a82b3174d238d6d6659',
  production: false,
  baseUrl: 'http://localhost:3000',
  firebaseConfig: {
    apiKey: 'AIzaSyAHR5AxshgnLh2kIZM6HmVM-dvdlM4VvcY',
    authDomain: 'onobet-eeab0.firebaseapp.com',
    projectId: 'onobet-eeab0',
    storageBucket: 'onobet-eeab0.appspot.com',
    messagingSenderId: '631994655557',
    appId: '1:631994655557:web:e07158309dc3a23500142c',
    measurementId: 'G-S5ZNSDKHX3'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
