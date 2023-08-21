console.log(1 === 0);

let go = true;
let stop = false;

console.log(go !== stop);

//logical operators "or" ||

let condition1 = true;
let condition2 = false;

const logicalExpression = condition1 || condition2;
console.log(!logicalExpression || logicalExpression);

let isLoanApproved = true;
let cash = 30000;
let cost = 40000;
const isCarBought = isLoanApproved || cash > cost;
console.log(isCarBought);

let isLoadRejected = false;
const isLoanGranted = !isLoadRejected;
console.log(isLoanGranted);

let cloudStorage = 4;
let systemStorage = 8;
let fileSize = 5;

const result = cloudStorage > fileSize || systemStorage > fileSize;
console.log("Saved? : " + result);

let mainSubject = 43;
let extraCurricular = 12;
const result1 = mainSubject > 35 && extraCurricular > 40;

console.log(result1);

let testRun = false;
let outputShows = true;

const result2 = testRun || outputShows;
console.log(result2);
