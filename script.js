// Get the viewport width
let viewportWidth = window.innerWidth;

// Define the media query
let mediaQuery = window.matchMedia("(max-width: 600px)");

containerTranslate = "translateX(-250px)"
resultTranslate = "translateX(400px)"

if (mediaQuery.matches) {
    containerTranslate ="translateY(-200px)"
    resultTranslate = "translateY(500px) translateX(-125px)"
}





submitButton = document.querySelector(".submit-button")
currentGradeInput = document.querySelector(".grade-input")
targetGradeInput = document.querySelector(".target-input")
weightInput = document.querySelector(".weight-input")

gradeHeader = document.querySelector(".grade-input-h")
targetHeader = document.querySelector(".target-input-h")
weightHeader = document.querySelector(".weight-input-h")

container = document.querySelector(".container");

resultSection = document.querySelector(".result");

outputGrade = document.getElementById("result-grade-value")
outputGrade2 = document.getElementById("result-grade-value2")
outputCurrentGrade = document.getElementById("result-current-grade-value")
outputTargetGrade = document.getElementById("result-target-grade-value")

// Handle all non-valid inputs. 
currentGradeInput.addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9.]/g, ""); 
  if (this.value.indexOf(".") !== this.value.lastIndexOf(".")) { 
    this.value = this.value.slice(0, -1); 
  }
});
targetGradeInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9.]/g, ""); 
    if (this.value.indexOf(".") !== this.value.lastIndexOf(".")) { 
      this.value = this.value.slice(0, -1); 
    }
});

weightInput.addEventListener("input", function() {
    this.value = this.value.replace(/[^0-9.]/g, ""); 
    if (this.value.indexOf(".") !== this.value.lastIndexOf(".")) { 
      this.value = this.value.slice(0, -1); 
    }
});



function isValid(num) {
    return num > 0 && num <= 150
}

function calculateRequiredGrade(currentGrade, targetGrade, examWeight) {
    weightFraction = examWeight / 100


    return ((targetGrade - (1 - weightFraction) * currentGrade) / weightFraction).toFixed(2)
}

submitButton.addEventListener("click", () => {
    invalid = false
    submitButton.style.animation = "none"
    if (isValid(Number(currentGradeInput.value)) == false || currentGradeInput.value == "") {
        currentGradeInput.style.border = "2px solid #ff8a8a"
        invalid = true
    }
    if (isValid(Number(targetGradeInput.value)) == false || targetGradeInput.value == "") {
        targetGradeInput.style.border = "2px solid #ff8a8a"
        invalid = true
    }
    if (isValid(Number(weightInput.value)) == false || weightInput.value == "") {
        weightInput.style.border = "2px solid #ff8a8a"
        invalid = true
    }
    if (invalid) {
        requestAnimationFrame(()=>{
            submitButton.style.animation = "shake 0.8s cubic-bezier(.36,.07,.19,.97) both"
        });
        // return; 
    }
    // container.style.transform = "translateX(-250px)"
    container.style.transform = containerTranslate
    resultSection.style.display = "inline-block"
    requestAnimationFrame(()=>{ 
        // resultSection.style.transform = "translateX(400px)"
        resultSection.style.transform = resultTranslate
    });

    outputCurrentGrade.innerHTML = Number(currentGradeInput.value).toFixed(2)
    outputTargetGrade.innerHTML = Number(targetGradeInput.value).toFixed(2)
    
    requiredGrade = calculateRequiredGrade(Number(currentGradeInput.value), Number(targetGradeInput.value), Number(weightInput.value))
    
    console.log(requiredGrade)

    outputGrade2.innerHTML = requiredGrade

    if (requiredGrade < 0) {
        requiredGrade = "<0.00"
    }
    if (requiredGrade > 110) {
        requiredGrade = ">110.0"
    }

    outputGrade.innerHTML =  requiredGrade

    currentGradeInput.style.border = "2px solid #8d8d8dfa"
    targetGradeInput.style.border = "2px solid #8d8d8dfa"
    weightInput.style.border = "2px solid #8d8d8dfa"
    
   
})