document.getElementById("name").focus()
/* ******************************************
Showing and hiding the Other job title field
******************************************** */
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


/* ******************************
Color and Design Selection Stuff
******************************* */
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
    showColor()
})

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

const colorField = document.getElementById("shirt-colors")
colorField.style.display = "none"
function showColor(){
    colorField.style.display = designSelect.selectedIndex > 0 ? "block" : "none"
}


/* ***********************
Activity Selection Stuff
************************ */
const activitiesFieldSet = document.querySelector(".activities")
const activityLabels = document.querySelectorAll(".activities label")
activityLabels.forEach((label) => {
    label.querySelector("input").addEventListener('change', (e)=>{
        selectActivity()
    })
})

function getTotalPrice(){
    const checkedInput = document.querySelectorAll(".activities label input:checked")
    const pricesArray = Array.from(checkedInput).map((checked)=>checked.getAttribute("data-cost"))
    let price = 0
    for(let p of pricesArray){
        price+=parseInt(p)
    }
    return price
}

function selectActivity(){
    const checkedInput = document.querySelectorAll(".activities label input:checked")
    const price = getTotalPrice()
    let tpElement = document.querySelector(".activities p")
    if(!tpElement){
        tpElement = document.createElement("p")
        activitiesFieldSet.appendChild(tpElement)
    }
    tpElement.className = "activities"
    if(price === 0){
        activitiesFieldSet.removeChild(tpElement)
    }
    tpElement.innerHTML = `Total: $${price}`
    
    const allInput = document.querySelectorAll(".activities label input:not(:checked)")
    const dayAndTimeArray = Array.from(checkedInput).map((checked)=>checked.getAttribute("data-day-and-time"))
    for(let input of allInput){
        const daytime = input.getAttribute("data-day-and-time")
        if(!daytime){
            continue
        }
        input.disabled = dayAndTimeArray.includes(daytime)
        input.parentNode.style.color = input.disabled ? "grey": "black"
    }
    activitiesValidator(price)
}
function activitiesValidator(price){
    //The code below will show if you've not checked off a box
    const activityNotice = document.createElement("p")
    activityNotice.className = "validator"
    if(price === 0){
        activityNotice.innerHTML = "You must select at least 1 option"
        activitiesFieldSet.appendChild(activityNotice)
    }
    if (price > 0 && activityNotice === true){
        activitiesFieldSet.removeChild(activityNotice)
    }
}




/* ************
Payment Stuff
************** */
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





/* ************
Form VALIDATION
************** */
const nameInput = document.getElementById("name")
const notValidName = document.createElement("p")
notValidName.className = "validator"
notValidName.style.display ="none"
notValidName.innerHTML = "Not a Valid Entry. Try Again"
nameInput.insertAdjacentElement("afterend", notValidName)

const emailInput = document.getElementById("mail")
const notValidEmail = document.createElement("p")
notValidEmail.className = "validator"
notValidEmail.style.display = "none"
notValidEmail.innerHTML = "Must be in email format (example@mail.com)"
emailInput.insertAdjacentElement("afterend", notValidEmail)

const cardInput = document.getElementById("cc-num")
const notValidCard = document.createElement("p")
notValidCard.className = "validator"
notValidCard.style.display = "none"
notValidCard.innerHTML = "Must be 13-16 numbers only"
cardInput.insertAdjacentElement("afterend", notValidCard)

const zipInput = document.getElementById("zip")
const notValidZip = document.createElement("p")
notValidZip.className = "validator"
notValidZip.style.display = "none"
notValidZip.innerHTML = "Must be 5 numbers only"
zipInput.insertAdjacentElement("afterend", notValidZip)

const cvvInput = document.getElementById("cvv")
const notValidCvv = document.createElement("p")
notValidCvv.className = "validator"
notValidCvv.style.display = "none"
notValidCvv.innerHTML = "Must be 3 numbers only"
cvvInput.insertAdjacentElement("afterend", notValidCvv)


function isValidName(name){
    return /^[a-z]+$/.test(name)
}
function isValidEmail(email){
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email)
}
function isValidCard(card){
    return /^\d{13,16}$/.test(card)
}
function isValidZipCode(zip){
    return /^\d{5}$/.test(zip)
}
function isValidCvv(cvv){
    return /^\d{3}$/.test(cvv)
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
      const showTip = text!== "" && !valid; //putting in the text!=="" removes the alert when you delete everything from the field.
      const tooltip = e.target.nextElementSibling;
      showOrHideTip(showTip, tooltip);
    };
  }

nameInput.addEventListener("input", createListener(isValidName));
emailInput.addEventListener("input", createListener(isValidEmail));
cardInput.addEventListener("input", createListener(isValidCard));
zipInput.addEventListener("input", createListener(isValidZipCode));
cvvInput.addEventListener("input", createListener(isValidCvv));

/*********************
Form submission Error
*********************/

const form = document.querySelector("form")
form.addEventListener('submit', (e)=>{
    let isValid = true
    if (!isValidName(nameInput.value)){
        const tooltip = nameInput.nextElementSibling;
        showOrHideTip(true, tooltip);
        isValid = false
    }
    if (!isValidEmail(emailInput.value)){
        const tooltip = emailInput.nextElementSibling;
        showOrHideTip(true, tooltip);
        isValid = false
    }
    if (!isValidCard(cardInput.value)){
        const tooltip = cardInput.nextElementSibling;
        showOrHideTip(true, tooltip);
        isValid = false
    }
    if (!isValidZipCode(zipInput.value)){
        const tooltip = zipInput.nextElementSibling;
        showOrHideTip(true, tooltip);
        isValid = false
    }
    if (!isValidCvv(cvvInput.value)){
        const tooltip = cvvInput.nextElementSibling;
        showOrHideTip(true, tooltip);
        isValid = false
    }
    const price = getTotalPrice()
    if (price === 0){
        activitiesValidator(price)
        isValid = false
    }
    if(!isValid){
        e.preventDefault()
    }
})


jobOther()
paymentType()
designChange()