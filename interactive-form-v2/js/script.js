document.getElementById("name").focus()

// Showing and hiding the other job title input field

const otherInput = document.getElementById("other-title")
const jobSelect = document.getElementById("title")
const basicInfoFieldSet = otherInput.parentNode

jobSelect.addEventListener('change', (e)=>{
    jobOther()
})
function jobOther(){
    otherInput.remove()
    if (jobSelect.selectedIndex === 5){
        basicInfoFieldSet.appendChild(otherInput)
    }
}




// Color and Design select Stuff

const colorSelect = document.getElementById("color")
const jsPuns = [
    colorSelect.options[0],
    colorSelect.options[1],
    colorSelect.options[2]
]
const heartJs = [
    colorSelect.options[3],
    colorSelect.options[4],
    colorSelect.options[5]
]
const designSelect = document.getElementById("design")
designSelect.addEventListener('change', (e)=>{
    designChange()
})

const activityLabels = document.querySelectorAll(".activities label")
activityLabels.forEach((label) => {
    label.querySelector("input").addEventListener('change', (e)=>{
        selectActivity()
    })
})

const activitiesFieldSet = document.querySelector(".activities")

function designChange(){
    for(let i=0; i < 6; i++){
        colorSelect.remove(0)
    } 
    if(designSelect.selectedIndex === 0){
        const selectTheme = new Option("Please select a T-shirt theme")
        colorSelect.add(selectTheme)
    }else if(designSelect.selectedIndex === 1){
        for(let option of jsPuns){
            colorSelect.add(option)
        }
    }else if(designSelect.selectedIndex === 2){
        for(let option of heartJs){
            colorSelect.add(option)
        }
    }
}





// Activity Selection Stuff

function selectActivity(){
    const checkedInput = document.querySelectorAll(".activities label input:checked")
    const pricesArray = Array.from(checkedInput).map((checked)=>checked.getAttribute("data-cost"))
    let price = 0
    for(let p of pricesArray){
        price+=parseInt(p)
    }
    let tpElement = document.querySelector(".activities p")
    if(!tpElement){
        tpElement = document.createElement("p")
        activitiesFieldSet.appendChild(tpElement)
    }
    if(price === 0){
        activitiesFieldSet.removeChild(tpElement)
    }
    tpElement.innerHTML = `Total: $${price}`
    
    const allInput = document.querySelectorAll(".activities label input:not(:checked)")
    const dayAndTimeArray = Array.from(checkedInput).map((checked)=>checked.getAttribute("data-day-and-time"))
    for(let input of allInput){
        const dt = input.getAttribute("data-day-and-time")
        if(!dt){
            continue
        }
        input.disabled = dayAndTimeArray.includes(dt)
        input.parentNode.style.color = input.disabled ? "grey": "black"
    }
}






// Payment Stuff

const cc = document.getElementById("credit-card")
const pp = document.getElementById("paypal")
const bc = document.getElementById("bitcoin")
const paymentFieldSet = cc.parentNode
const paymentSelect = document.getElementById("payment")

paymentSelect.addEventListener('change', (e)=>{
    paymentType()
})

function paymentType(){
    cc.remove()
    pp.remove()
    bc.remove()
    if(paymentSelect.selectedIndex === 1){
        paymentFieldSet.appendChild(cc)
    }
    if(paymentSelect.selectedIndex === 2){
        paymentFieldSet.appendChild(pp)
    }
    if(paymentSelect.selectedIndex === 3){
        paymentFieldSet.appendChild(bc)
    }
}





// Form VALIDATION

const nameInput = document.getElementById("name")
const notValidName = document.createElement("span")
notValidName.style.display ="none"
notValidName.innerHTML = "Not a Valid Entry. Try Again"
nameInput.insertAdjacentElement("afterend", notValidName)

const emailInput = document.getElementById("mail")
const notValidEmail = document.createElement("p")
notValidEmail.style.display = "none"
notValidEmail.innerHTML = "Must be in email format (example@mail.com)"
emailInput.insertAdjacentElement("afterend", notValidEmail)



function isValidName(name){
    return /^[a-z]+$/.test(name)
}
function isValidEmail(email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email)
}


function showOrHideTip(show, element) {
    // show element when show is true, hide when false
    if (show) {
      element.style.display = "inherit";
    } else {
      element.style.display = "none";
    }
  }
function createListener(validator) {
    return e => {
      const text = e.target.value;
      const valid = validator(text);
      const showTip = text!== "" && !valid;
      const tooltip = e.target.nextElementSibling;
      showOrHideTip(showTip, tooltip);
    };
  }



nameInput.addEventListener("input", createListener(isValidName));
emailInput.addEventListener("input", createListener(isValidEmail));




jobOther()
paymentType()
designChange()