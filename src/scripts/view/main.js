import '../component/search-bar.js';
import '../component/meal-list.js';
import DataSource from '../data/dataSource.js';

const main = () => {
  const searchElement = document.querySelector('search-bar');
  const mealListElement = document.querySelector('meal-list');

  const onButtonSearchClicked = () => {
    const inputData = searchElement.value;

    if (inputData !== '') {
      DataSource.searchMeal(inputData).then(renderResult).catch(fallbackResult);
    } else {
      DataSource.getRandomMeal().then(renderResult).catch(fallbackResult);
    }
  };

  const renderResult = results => {
    mealListElement.meals = results;
  };

  const fallbackResult = message => mealListElement.renderError(message);

  searchElement.clickEvent = onButtonSearchClicked;
};

export default main;
