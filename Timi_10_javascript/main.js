
// const calcForMe = (a,b) => {
//     result = a+b;
//     console.log("Sum of " + result);
//     return result;
// }

//  person = {
//     personal:  {
//         firstName: "John",
//         lastName: "Doe",
//         age: 20,
//         height: 180,
//         weight: 70,
//     },
//     hairColor: "black",
//     age: 20,
//     height: 180,
//     weight: 70,
//     name: "John",
//     lastName: "Doe",
    
// };

// console.log(calcForMe(5, 5));
// console.log(person.name + " " + person.personal['lastName']);

const counterElement = document.getElementById('counter');
const boomLevelElement = document.getElementById('boomLevel');
const incrementElement = document.getElementById('increment');

const takkiElement = document.getElementById('takkiPlus');
const takkiMinusElement = document.getElementById('takkiMinus');
const takkiResetElement = document.getElementById('takkiReset');
const boomBoxElement = document.getElementById('boomBox');
let increment = 5;
let boomLevel = 35;

const addToCounter = () => {
    
    counterElement.innerHTML = parseInt(counterElement.innerHTML) + increment;
    localStorage.setItem('counter', counterElement.innerHTML);

    if (parseInt(counterElement.innerHTML) > boomLevel) {
        boomBoxElement.style.display = 'block';
    } 

}
const minusFromCounter = () => {

    counterElement.innerHTML = parseInt(counterElement.innerHTML) - increment;
    localStorage.setItem('counter', counterElement.innerHTML);

    if (parseInt(counterElement.innerHTML) < -boomLevel) {
        boomBoxElement.style.display = 'block';
    } 

}
const setIncrement = () => {
    increment = parseInt(incrementElement.value);
    localStorage.setItem('increment', increment);
}
const setBoomLevel = () => {
    boomLevel = parseInt(boomLevelElement.value);
    localStorage.setItem('boomLevel', boomLevel);
}
const resetCounter = () => {
    boomBoxElement.style.display = 'none';
    counterElement.textContent = 0;
    localStorage.setItem('counter', 0);

}




takkiElement.addEventListener('click', addToCounter);
takkiMinusElement.addEventListener('click', minusFromCounter);
incrementElement.addEventListener('input', setIncrement);
boomLevelElement.addEventListener('input', setBoomLevel);
takkiResetElement.addEventListener('click', resetCounter);


// Load the counter value from local storage if it exists
document.addEventListener('DOMContentLoaded', () => {
    // Set the counter value if it exists in localStorage
    if (localStorage.getItem('counter')) {
        counterElement.innerHTML = localStorage.getItem('counter');
        console.log('found counter in local storage');
    }
    
    // Set input fields to match stored values
    if (localStorage.getItem('increment')) {
        console.log('found increment in local storage');
        incrementElement.value = localStorage.getItem('increment');
        increment = parseInt(incrementElement.value);
    }
    
    if (localStorage.getItem('boomLevel')) {
        console.log('found boomLevel in local storage');
        boomLevelElement.value = localStorage.getItem('boomLevel');
        boomLevel = parseInt(boomLevelElement.value);
    }
    
    // Check if counter is already beyond boom level
    if (Math.abs(parseInt(counterElement.innerHTML)) > boomLevel) {
        boomBoxElement.style.display = 'block';
    }
});






