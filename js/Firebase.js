var firebaseConfig = {
    apiKey: "AIzaSyDInOn4LQmMA5euu3p_wPpphFltOwRxb2Q",
    authDomain: "space2-25d32.firebaseapp.com",
    databaseURL: "https://space2-25d32.firebaseio.com",
    projectId: "space2-25d32",
    storageBucket: "space2-25d32.appspot.com",
    messagingSenderId: "436507230093",
    appId: "1:436507230093:web:cec0afde9b7762faf187c4",
    measurementId: "G-JQB4B4WXHV"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

dbHandle = firebase.firestore();

const resultsCollection = 'Results';

async function getScores() {
    let results = await this.dbHandle.collection(resultsCollection)
        .orderBy('points', 'desc')
        .limit(10)
        .get();
        
    return results.docs.map(doc => doc.data());
}

async function setScore(nick, points) {
    this.dbHandle.collection(resultsCollection)
        .doc(nick)
        .set({
            'nick': nick,
            'points': points
        });
}

async function getData() {
    getScores().then(highScores => {
        highScores.forEach(entry => {
            document.getElementById("highScoresContentDiv").style.color = "white";
            document.getElementById("highScoresContentDiv").innerHTML +=  entry["nick"];
            document.getElementById("highScoresContentDiv").innerHTML +=  ":";
            document.getElementById("highScoresContentDiv").innerHTML +=  entry["points"] + "\n";
            // console.log(entry);
        })
        // console.log("-- " + highScores);
    });
}