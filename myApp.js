require('dotenv').config();
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


let Person;

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  favoriteFoods: [String]
});
Person = mongoose.model('Person', personSchema);


const createAndSavePerson = (done) => {
  var newPerson = new Person({
    name: "Joy",
    age: 16,
    favoriteFoods: ['rice', 'egg']
  });
  newPerson.save((err, data) => {
    if (err)
      return done(err);
    return done(null, data);
  });
};

const arrayOfPeople = [
  { name: 'James', age: 15, favoriteFoods: ['beans', 'mango'] },
  { name: 'Joy', age: 33, favoriteFoods: ['Apple', 'Rice'] },
  { name: 'Jane', age: 45, favoriteFoods: ['Egg', 'Chicken'] }
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err)
      return done(err);
    return done(null, people);
  });
};


const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, people) => {
    if (err)
    return done(err);
  return done(null, people);
  }) 
};

// Define a function named findOneByFood that takes two parameters: food and done.
const findOneByFood = (food, done) => {
  // Use the findOne method of the Person model (presumably a MongoDB model) to find a document
  // where the favoriteFoods field matches the provided 'food'.
  Person.findOne({ favoriteFoods: food }, (err, foundPerson) => {
    // Check if there's an error during the database query.
    if (err) {
      // If there is an error, call the 'done' callback with the error.
      done(err);
   
      // If there is no error, call the 'done' callback with null (indicating no error) and the found person.
      done(null, foundPerson);
    }
  });
};


const findPersonById = (personId, done) => {
  Person.findById(personId, (err, idFound) => {
    if(err)
    done(err)
    done(null, idFound)
  })
};


const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  // Find the person by their ID
  Person.findById(personId, (err, foundPerson) => {
    if (err) {
      // Handle the error if there's any during the find operation
      done(err);
    } else {
      // Update the found person by adding the new food to the favoriteFoods array
      foundPerson.favoriteFoods.push(foodToAdd);

      // Save the updated person
      foundPerson.save((err, updatedPerson) => {
        if (err) {
          // Handle the error if there's any during the save operation
          done(err);
        } else {
          // If successful, call the 'done' callback with null and the updated person
          done(null, updatedPerson);
        }
      });
    }
  });
};

  

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
