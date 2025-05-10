// Write a function that takes two numbers (a and b) as argument
//  Sum a and b
// Return the result
const calcSum = (a, b) => {
  return a + b
}

/*
Test cases:
calcSum(1,2) Expected 3
calcSum(1,10) Expected 11
calcSum(99,1) Expected 100
*/

// ========================================

// Write a function that takes two values, say a and b, as arguments
// Return true if the two values are equal and of the same type
const strictEquality = (a, b) => {
  return a === b
}

/*
Test cases:
strictEquality(2, 3) Expected false
strictEquality(3, 3) Expected true
strictEquality(1, '1') Expected false
strictEquality('10', '10') Expected true 
*/

// ========================================

// Write a function that takes a value as argument
// Return the type of the value
const getTypeOfValue = (a) => {
  return typeof a
}

/*
Test cases:
myFunction(1) Expected 'number'
myFunction(false) Expected 'boolean'
myFunction({}) Expected 'object'
myFunction(null) Expected 'object'
myFunction('string') Expected 'string'
myFunction(['array']) Expected 'object'
*/

// ========================================

// Write a function that takes a string (a) as argument
// Return the 1st character of the strgin a
// Tip: look up the string prototype function slice() or split()
const getFirstChar = (a) => {
  const firstLetter = a.slice(0, 1)
  return firstLetter
}

/*
Test Cases:
myFunction('abcd') Expected 'a'
myFunction('zyxbwpl') Expected 'z'
myFunction('gfedcba') Expected 'g'
*/

// ========================================

// Write a function that takes a string (a) and a number (n) as argument
// Return the nth character of 'a'
// Tip: look up the string prototype function slice() or split()
const getNthChar = (a, n) => {
return a[n-1]
  
}

/*
Test Cases:
myFunction('abcd',1) Expected 'a'
myFunction('zyxbwpl',5) Expected 'w'
myFunction('gfedcba',3) Expected 'e'
*/

// ========================================

// Write a function that takes a string (a) as argument
// Extract the first half a
// Return the result
// Tip: look up the string prototype function slice() or split()
const extractFirstHalfOfString = (a) => {
  const firstHalf = a.slice(0, a.length / 2)
  return firstHalf
}


/*
Test Cases:
myFunction('abcdefgh') Expected 'abcd'
myFunction('1234') Expected '12'
myFunction('gedcba') Expected 'ged'
*/

// ========================================

// Write a function that takes a string (a) as argument
// Remove the last 3 characters of a
// Return the result
const removeLastNChractersOfString = (a) => {
  const lastThree = a.substring(0, a.length - 3)
  return lastThree
}

/*
Test cases:
myFunction('abcdefg') Expected 'abcd'
myFunction('1234') Expected '1'
myFunction('fgedcba') Expected 'fged'
*/

// ========================================

// Write a function that takes a number as argument
// If the number is even, return true
// Otherwise, return false
// Tip: How does the % operator work?
const checkIfNumberIsEven = (a) => {
   return a % 2 == 0
}

/*
Test Cases:
myFunction(10) Expected true
myFunction(-4) Expected true
myFunction(5) Expected false
myFunction(-111) Expected false
*/

// ========================================

// Write a function that takes two numbers (a and b) as argument
// Return b percent of a
const getPercentageOfNumber = (a, b) => {
  return (b / a) * 100
}

/*
Test cases:
myFunction(100,50) Expected 50
myFunction(10,1) Expected 10
myFunction(500,25) Expected 5
*/

// ========================================

// Write a function that takes 6 values (a,b,c,d,e,f) as arguments
// Sum a and b
// Then substract by c
// Then multiply by d and divide by e
// Finally raise to the power of f and return the result
// Tip:
// - Mind the order
// - Power operator is either Math.pow or **
//   - e.g. 2**2 = 4
const useAllTheOperators = (a, b, c, d, e, f) => {
return ((((a + b -c) * d) /e) **f) 
}

/*
Test cases:
myFunction(6,5,4,3,2,1) Expected 10.5
myFunction(6,2,1,4,2,3) Expected 2744
myFunction(2,3,6,4,2,3) Expected -8
*/

// ========================================


module.exports = {
  calcSum,
  strictEquality,
  getTypeOfValue,
  getFirstChar,
  getNthChar,
  extractFirstHalfOfString,
  removeLastNChractersOfString,
  checkIfNumberIsEven,
  getPercentageOfNumber,
  useAllTheOperators
}