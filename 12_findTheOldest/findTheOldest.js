const findTheOldest = function(people) {
    let today = new Date();
    let year = today.getFullYear();
    let oldest = people[0];
    for(let person of people) {
        let age;
        if ("yearOfDeath" in person) {
             age = person.yearOfDeath - person.yearOfBirth;
        } else {
            age = year - person.yearOfBirth;
        }
        person.age = age;
        if(person.age > oldest.age) {
            oldest = person;
        }
    }
    return oldest;
};

// Do not edit below this line
module.exports = findTheOldest;
