# react-sambatech-application

A react front-end for my sambatech application. I chose a minimalist responsive approach (as a usually do) with easy interactions. Hope you like it.

## Getting Started

First make sure you meet the requirements below.

### Prerequisites

#### Node

You need to have Node 8.10.0 or later on your local machine to run it. I'm personally using 8.12.0.

#### Firebase credentials

To run this application you must have your own credentials to a Firebase project. It's a 5 minutes job to get one and it will look something like this

```
export default {
  apiKey: "XXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "my-cool-application.firebaseapp.com",
  databaseURL: "https://my-cool-application.firebaseio.com",
  projectId: "my-cool-application",
  storageBucket: "my-cool-application.appspot.com",
  messagingSenderId: "XXXXXXXXXXX"
};
```
_if you have any problems to generate your credential, please contact me so I can help you with that_

Create a **firebase.config.ts** at the path below and place your credentials inside it

```
/src/services/firebase.config.ts
```

### Installing

First, clone this repository.

```
git clone https://github.com/matheuscouto/react-sambatech-application.git
```

Then go into the projects folder and install the dependencies.

```
cd react-sambatech-application
npm install
```

After that, just start the application with:

```
npm start
```

## Running the tests

```
npm run test
```

## Authors

* **Matheus Couto**

