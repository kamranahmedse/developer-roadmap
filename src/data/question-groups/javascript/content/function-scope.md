Function scope refers to the scope of variables defined within a function. You can only access variable values within the scope and not outside. It helps to avoid having the same variable names and keeps your JavaScript code clean.

```javascript
function myStudyPlan() { 

var studyPlanOne = "Top JavaScript interview questions for web developers";

let studyPlanTwo = "Top JavaScript interview questions for web developers";

const studyPlanThree = "Top JavaScript interview questions for web developers"; 



console.log(studyPlanOne); 

console.log(studyPlanTwo);  

console.log(studyPlanThree); 

} 

myStudyPlan(); // Calls the function 