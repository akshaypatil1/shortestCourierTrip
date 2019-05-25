"use strict";

class CloudTravel{
    //constructor
    constructor(latArr, longArr, canTravelArr, start, destination) {
        this.earthRadius = 4000;
        this.latLongArray = this.mapLatLong(latArr, longArr);
        this.canTravelArr = canTravelArr;
        this.start = start;
        this.destination = destination;
        this.paths = []; 
    }
    // returns distance between two airports as per formula
    calcArcLength(location1, location2) {
        return this.earthRadius * Math.acos(Math.sin(location1.lat) * Math.sin(location2.lat) +
        Math.cos(location1.lat) * Math.cos(location2.lat) * Math.cos(location1.long - location2.long));
    }
    findPossibleWays(mapTravelWays,start,path){
        let fromWays = mapTravelWays.filter(item=>item[0]===start);
        fromWays.forEach(element => {
            if(element[1]===this.destination){
                path = `${path},${element[1]}`;
                let distance = 0;
                let way = path.split(','); 
                for(let i=0; i< way.length; i++){
                    let current = way[i];
                    let next = way[i+1]
                    if(i+1 !== way.length){
                        distance += this.calcArcLength(this.latLongArray[current],this.latLongArray[next]);
                    }
                }
                // this.paths.push(new Array(way.join('=>'), distance))
                this.paths.push(distance);
            }else{
                let newFromWays = mapTravelWays.filter(item=>item[0]===element[1]);
                if(newFromWays.length){
                    // recursion to find all possible paths
                    this.findPossibleWays(newFromWays,element[1],`${path},${element[1]}`);
                }
                else{
                    // if path to destination not found
                    this.paths.push(-1);
                }
            }
        });
    }

    // this is the function which will provide result. Returns promise
    shortestCourierTrip(){
        return new Promise((resolve, reject) => {
            if (this.start === this.destination) {
                resolve(0);
            }else{
                this.findPossibleWays(this.mapTravelWays(this.canTravelArr),this.start,this.start);
                resolve(this.paths);
            }
        }).then((res) => {
            if(res){
                let resultArray = res.filter(item=>item>0);
                if(!resultArray.length){
                    // if path not found
                    return -1
                }else{
                    // return min distance
                    return Math.min(...resultArray);
                }
            }else{
                // if start and destination is same
                return 0.0;
            }
          })
    }

    // returns mapped lat-long array.
    mapLatLong(latArr, longArr){
        return latArr.map( function(x, i){
            return {"lat": x, "long": longArr[i]}
        });
    }

    //returns all possible travel ways
    mapTravelWays(canTravelArr){
        let arr = canTravelArr.reduce((finalArray, item, index)=>{
            item.split(" ").map((ele) => {    
                let tmpArr =[]                
                tmpArr.push(index,parseInt(ele));
                finalArray.push(tmpArr);
            });
            return finalArray;
        },[]);
        return arr;
    }
    
}

module.exports = CloudTravel;
