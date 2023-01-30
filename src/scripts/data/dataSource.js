import _ from 'lodash';

class DataSource {
  static searchMeal(keyword) {
    return new Promise((resolve, reject) => {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
        .then(res => res.json())
        .then(res => {
          const meals = res.meals;
          if (meals !== null) {
            const found = _.filter(meals, meal =>
              _.includes(_.lowerCase(meal.strMeal), _.lowerCase(keyword))
            );
            resolve(found);
          } else {
            reject(`Keyword not suitable for search '${keyword}'`);
          }
        })
        .catch(err => console.error(err.message));
    });
  }

  static getMealID(mealID) {
    return new Promise((resolve, reject) => {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(res => {
          const meal = res.meals.at();
          meal ? resolve(meal) : reject('MealID not found');
        })
        .catch(err => console.error(err.message));
    });
  }

  static getRandomMeal() {
    return new Promise((resolve, reject) => {
      fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(res => {
          const meal = res.meals;
          meal ? resolve(meal) : reject('Meal not found');
        })
        .catch(err => console.error(err.message));
    });
  }
}

export default DataSource;
