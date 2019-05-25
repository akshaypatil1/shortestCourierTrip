"use strict";

const CloudTravel = require('./CloudTravel')

function checkForMinDistance(input){
    let cloudTravel = new CloudTravel(input.latArray, input.longArray, input.canTravelArray, input.start, input.destination);

    cloudTravel.shortestCourierTrip().then((res)=>{
        console.log(res);
    })
}

checkForMinDistance({
    "latArray": [0, 0, 70],
    "longArray": [90, 0, 45],
    "canTravelArray": ["2", "0 2","0 1"],
    "start": 0,
    "destination": 1
});

checkForMinDistance({
    "latArray": [0, 0, 70],
    "longArray": [90, 0, 45],
    "canTravelArray": ["1 2", "0 2","0 1"],
    "start": 0,
    "destination": 1
});

checkForMinDistance({
    "latArray": [0, 30, 60],
    "longArray": [25, -130, 78],
    "canTravelArray": ["1 2", "0 2","1 2"],
    "start": 0,
    "destination": 0
});

checkForMinDistance({
    "latArray": [0,20,55],
    "longArray": [-20,85,42],
    "canTravelArray": ["1", "0","0"],
    "start": 0,
    "destination": 2
});