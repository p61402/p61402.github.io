$(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBHilMTYff_qSPY1CkbiAZNTN_Cfpk5IGw",
        authDomain: "qoo-s-blog.firebaseapp.com",
        databaseURL: "https://qoo-s-blog.firebaseio.com",
        projectId: "qoo-s-blog",
        storageBucket: "qoo-s-blog.appspot.com",
        messagingSenderId: "494555390835"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
    var oriUrl = window.location.host;
    var curUrl = oriUrl + window.location.pathname;
    function readVisits(url, selector) {
    var db_key = decodeURI(url.replace(new RegExp('\\/|\\.', 'g'), "_"));
        database.ref(db_key).once("value").then(function (result) {
            var count = parseInt(result.val() || 0) + 1;
            database.ref(db_key).set(count);
            if (selector.length > 0) {
                selector.html(count);
            };
        });
    }
    readVisits(oriUrl, $("#visits .count"));
    if (curUrl && curUrl != "_") {
        readVisits("page/" + curUrl, $("#pageviews .count"));
    }
});