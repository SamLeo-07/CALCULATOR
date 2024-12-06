const numbers = document.querySelectorAll('.num');
const digi = document.querySelector(".digi");
const digi1 = document.querySelector(".digi1");
const operator = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear")
const del = document.querySelector(".del")

const allOperators = Array.from(operator).slice(0,4);
const allNumbers = Array.from(numbers).slice(0,11);

let currentNum = '';
let nextNum = '';
let opt = '';
let displayNum = [];
let globalNumber = null;
let result = null;
let index = digi.textContent = "0";


numbers.forEach(number => {
    number.addEventListener('click', () =>{
        value = number.value;

        if (displayNum.length >= 10) {
            return;
        }
        if (value === '.' && displayNum.includes('.')) {
            return;
        }
        if (value === '0' && displayNum.length === 0) {
            return;
        }
        displayNum.push(value)
        let diss = displayNum.join("");
        currentNum = parseFloat(diss)
        globalNumber = currentNum;
        digi.textContent =  diss;
    })
})

operator.forEach(operator => {
    operator.addEventListener('click', () =>{
        if (globalNumber !== null && opt !== ''){
            calculate();
        } 
        previousNum = globalNumber;
        digi1.textContent = globalNumber + operator.value;
        digi.textContent = null;
        opt = operator.value
        displayNum = [];
        
        
    })
})


del.addEventListener('click', () => {
    if (displayNum.length > 0) {
        displayNum.pop();
        let updatedValue = displayNum.join("");
        globalNumber = updatedValue === "" ? null : parseFloat(updatedValue); 
        digi.textContent = updatedValue || 0;
    }
});

equal.addEventListener('click', () => {
    digi1.textContent = null

    if(opt === '' || globalNumber === null || previousNum === null){
        digi.textContent = "0";
        displayNum = [];
        return;
    }
    calculate();
    opt = '';
});


function calculate(){
    if (opt === '+') {
        result = previousNum + globalNumber;
    } else if (opt === '-') {
        result = previousNum - globalNumber;
    } else if (opt === '*') {
        result = previousNum * globalNumber;
    }else if (opt === '/') {
        result = previousNum / globalNumber;
    }else if (opt === '%') {
        result = (globalNumber/100) * previousNum;
    } 
    
    
    digi.textContent = result;
    globalNumber = result;
    displayNum = []
}


clear.addEventListener('click', () => {
    digi1.textContent = null;
    digi.textContent = 0;
    displayNum = [];
    result = null;
    globalNumber = null;
    previousNum = null;
    currentNum = null;
    opt = '';
})
