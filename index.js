const Graph = require('./Graph.js');
const Vector = require('./Vector.js');

// Absolute Häufigkeit
Array.prototype.absoluteAmount = function(x)  {
    let occ = 0;
    for(item of this) {
        if(item === x) {
            occ++;
        }
    }
    return occ;
}

// Relative Häufigkeit
Array.prototype.relativeAmount = function(x) {
    return this.absoluteAmount(x) / this.length;
}

// Median
Array.prototype.median = function() {
    this.sort(function(a,b) {return a-b});
    if(this.length % 2 === 1) {
        return this[(this.length+1) / 2-1];
    } else {
        return (this[this.length/2-1] + this[this.length/2]) / 2;
    }
}

// Durchschnitt
Array.prototype.average = function() {
    let sum = 0;
    for(obj of this) {
        if(typeof obj === "number") {
            sum += obj;
        }
    }
    return sum / this.length;
}

// N. Wurzel aus Number
Math.nthrt = function(Number, n) {
    return Math.pow(Number, 1/n);
}

// Geometrischer Median
Array.prototype.geometricMedian = function() {
    this.sort(function(a,b) {return a-b});
    let sum = 0;
    let product = 1;
    for(obj of this) {
        if(typeof obj === "number") {
            sum++;
            product *= obj;
        }
    }
    console.log(product, 1/sum)
    return Math.nthrt(product, sum);
}

// Modalwert
Array.prototype.modalValue = function() {
    const cache = new Map();
    for(obj of this) {
        const lastValue = cache.get(obj);
        const n = lastValue ? lastValue + 1 : 1
        cache.set(obj, n)
    }
    let highest = cache.entries().next().value[0];
    let multipleResults = false;
    let potentialResults = [];
    for([key, value] of cache) {
        if(value > cache.get(highest)) {
            multipleResults = false;
            potentialResults = [];
            highest = key
        } else if(value === cache.get(highest)) {
            multipleResults = true;
            potentialResults.push(key);
        }
    }
    if(multipleResults) {
        return potentialResults;
    } else {
        return highest;
    }
   
}

// Empirische Varianz
Array.prototype.avgVariance = function() {
    let sum = 0;
    const median = this.median();
    for(const obj of this) {
        if(typeof obj === "number") {
            const variance = obj - median
            sum += variance * variance
        }
    }
    return sum / (this.length - 1)
}

// Standardabweichung
Array.prototype.defaultVariance = function() {
    return Math.sqrt(this.avgVariance());
}

// Regression
Graph.prototype.regression = function() {
    let sumOfXSquare = 0;
    let sumOfYSquare = 0;
    let sumOfXYSquare = 0;
    const avgX = this.x.average();
    const avgY = this.y.average();
    console.log("avgX",avgX+"\navgY", avgY)
    for(const point of this.points) {

        sumOfXSquare += Math.pow(point.x - avgX, 2);
        sumOfYSquare += Math.pow(point.y - avgY, 2);

        sumOfXYSquare += (point.x - avgX) * (point.y - avgY)
    }
    console.log("Sxx",sumOfXSquare+"\nSyy",sumOfYSquare+"\nSxy",sumOfXYSquare)

    // Nach Y
    const m = sumOfXYSquare / sumOfXSquare;

    // Nach X
    //const m = sumOfXYSquare / sumOfYSquare;

    const b = avgY - m * avgX;

    // y = m * x + b
    // f(x) = incrase * x + b
    console.log("f(x) =",m,"* x","+",b)
    console.log(m>0?"Steigung:":"Fall:",m)
    console.log("Y-Achse:",b)
    return {
        m: m,
        b: b,
        Sx: sumOfXSquare,
        Sy: sumOfYSquare,
        Sxy: sumOfXYSquare
    }
}

// Korrelationskoeffizient
Graph.prototype.correlation = function() {
    let { m, b, Sx, Sy, Sxy } = this.regression();

    Sx *= 1/(this.x.length-1)
    Sy *= 1/(this.y.length-1)
    Sxy *= 1/(this.points.length-1)
    
    const r = Sxy / (Math.sqrt(Sx) * Math.sqrt(Sy))
    console.log("Korrelation:",r)
    return r;
}

// Kurzform um Elemente N-Mal zu einem Array hinzuzufügen
function add(arr, obj, n) {
    while(n > 0) {
        arr.push(obj)
        n--
    } 
}

// Shortcut for creating a Vector
function V(x, y) {
    return new Vector(x, y);
}

// Beispiel
const graph = new Graph([
    V(22, 19),
    V(25, 22),
    V(26, 21),
    V(26, 23),
    V(27, 23),
    V(28, 24),
    V(30, 29),
    V(30, 27),
    V(35, 33),
    V(41, 29)
]);

