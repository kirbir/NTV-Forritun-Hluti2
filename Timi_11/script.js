const DATA_SET = {
    // ....
    // ....
    // ....
    // ....
    // ....
}


const person = {
    name: 'Gunnsteinn'
}

const personTwo = person

console.log(person, personTwo)

personTwo.name = 'Herdís'

console.log(person, personTwo)

const personTemplate = {
    age: null,
    hairColor: null,
    name: null,
    family: {
        sister: {
            hairColor: 'red'
        }
    }
}

const extendedPersonTemplate = {
    employment: null,
    socialSecurityNumber: null,
    carInsurance: null,
    age: 20,
}

const generateNewPerson = () => {
    // const personThree = Object.assign({}, personTemplate)
    const personThree = {
        ...personTemplate,
        ...extendedPersonTemplate,
        age: 10,
        name: 'gunnsteinn',
    }
    const stringifiedPersonThree = JSON.stringify(personThree)
    console.log({ stringifiedPersonThree })
    const parsedPersonThree = JSON.parse(stringifiedPersonThree)
    console.log({ parsedPersonThree })
    console.log('before change', personTemplate)
    parsedPersonThree.family.sister.hairColor = 'blue'
    console.log('after change', personTemplate)

    // personThree.name = 'gunnsteinn'
    // console.log('template', personTemplate)
    // console.log('person three', personThree)

    console.log(personTemplate === personThree)
}

const someRandomFunction = (...args) => {
    // console.log('inside function', { a, b, c, d })
    console.log(...args)
    // [a, b, c, d, e] (args)
    // first param: args[0] => a
    // second param: args[1] => b
    // ...

}

const fruits = ['🥭', '🍍', '🍏', '🍊']
console.log(...fruits) // => '🥭', '🍍', '🍏', '🍊' but not the array ['🥭', '🍍', '🍏', '🍊']

someRandomFunction(...fruits)

generateNewPerson()


const mother = {
    eyeColor: 'blue',
    hairColor: 'brown',
    gender: 'female'
}

const father = {
    eyeColor: 'brown',
    hairColor: 'red',
    gender: 'male'
}

const getRandomPropertyFromTwoObjects = (objectA, objectB, objectProperty) => {
    const randomNumber = Math.random()
    if (randomNumber > 0.5) {
        return objectA[objectProperty]
    }

    return objectB[objectProperty]
}

const createChild = () => {
    const eyeColor = getRandomPropertyFromTwoObjects(mother, father, 'eyeColor')
    const hairColor = getRandomPropertyFromTwoObjects(mother, father, 'hairColor')
    const gender = getRandomPropertyFromTwoObjects(mother, father, 'gender')

    return {
        eyeColor, hairColor, gender
    }
}

const { eyeColor: motherEyeColor, ...restMotherProps } = mother
const { eyeColor: fatherEyeColor, ...restFatherProps } = father
console.log(motherEyeColor, fatherEyeColor)



// const fruits = ['🥭', '🍍', '🍏', '🍊']
const [mango, pineapple, apple, orange] = fruits
console.log({ mango })

const user1 = {
    name: 'Paul',
    age: 20,
    salary: 600000,
    job: 'Software Developer'
}

const user2 = {
    name: 'Lisa',
    age: 30,
    salary: 900000,
    job: 'senior software developer'
}

const user3 = {
    name: 'Gunnsteinn',
    age: 30,
    salary: 500000,
    job: 'senior software developer'
}

const calcAverAgeAndAndSalary = (objectA, objectB) => {
    const avgAge = (objectA.age + objectB.age) / 2
    const avgSalary = (objectA.salary + objectB.salary) / 2

    const averageAgeAndSalary = {
        avgAge,
        avgSalary
    }

    return averageAgeAndSalary
}

const calcAverAgeAndAndSalaryWithSpread = (...persons) => {
    const userCount = persons.length
    console.log(userCount)
    let ageSum = 0
    let salarySum = 0
    // biome-ignore lint/complexity/noForEach: <explanation>
    persons.forEach(({ age, salary }) => {
        ageSum = ageSum + age
        salarySum = salarySum + salary
    })

    const avgAge = ageSum / userCount
    const avgSalary = salarySum / userCount

    return {
        avgAge,
        avgSalary
    }
}

const average = calcAverAgeAndAndSalaryWithSpread(user1, user2, user3, user1, user1, user1, user1, user1, user1, user1, user1, user1,)
console.log(average)

const removeLastNChractersOfString = (a) => {
    const lastThree = a.slice(a.length -3, a.length)
    return lastThree
  }

  const checkIfNumberIsEven = (a) => {
    return a % 2 == 0
 }

a = {
    name: 'biggi',
    aldur: 20
}

b = 'name'

shitFunction = (a,b) => {
    return  a[b]
   
}

console.log('True false?: ' + shitFunction(a,b));