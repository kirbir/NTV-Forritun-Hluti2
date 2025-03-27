type Person = {
    firstName: string;
    age:number;

};

const user: Person = {
    firstName: "gunnsteinn",
    age:30
};

type Organism = {
    alive: boolean
}

type Animal = {
    legCount: number
}

type Mammal = {
    warmBlooded:true;
    eyeCount:2;
    nippleCount: number;
    legCount: number;
}

type Reptile = {
    warmBlooded: boolean;
    legCount: number;
    eyeCount:2;
}

type Human = Mammal & {
    legCount:2;
}

type FlyingBug<T extends Reptile> = {
    wings:2,

}

const butterFly: FlyingBug<Reptile> = {
    warmBlooded: true,
    legCount:6,
    eyeCount:2,
    wings:2
};


const alertAgeOfPerson = (wings:Wings):FlyingBug => {
    const age = person.age.toString()
    return .age;

}
