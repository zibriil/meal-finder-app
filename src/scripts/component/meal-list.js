import _ from 'lodash';
import './meal-item.js';
import DataSource from '../data/dataSource.js';

class MealList extends HTMLElement {
  set meals(meals) {
    this._meals = meals;
    this.render();
  }

  render() {
    this.innerHTML = '';

    const meals = this._meals;
    _.each(meals, meal => {
      const mealItemElement = document.createElement('meal-item');
      mealItemElement.meal = meal;

      this.classList.add('container');
      this.append(mealItemElement);
    });

    this.addEventListener('click', e => {
      const foundEl = e.target.parentElement.querySelector('.meal--info');
      if (foundEl) {
        const mealID = foundEl.getAttribute('data-mealid');
        DataSource.getMealID(mealID)
          .then(meal => this.renderSingleMeal(meal))
          .catch(err => console.error(err.message));
      }
    });
  }

  renderSingleMeal(meal) {
    let i;
    const length = 20;
    const ingredients = [];

    for (i = 0; i <= length; i += 1) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      ingredient ? ingredients.push(`${ingredient} - ${measure}`) : '';
    }

    const tags = _.words(meal.strTags) ? meal.strTags : '';
    const tagsArr = _.split(tags, ',');

    this.innerHTML = `
            <div class="container my-5">
              <div class="row g-5">
                <div class="col-lg">
                  <img
                    src="${meal.strMealThumb}"
                    class="rounded single--meal__img"
                    alt="${meal.strMeal}"
                    loading="lazy"
                  />
                  <h2 class="mt-5 mb-3">Ingredients</h2>
                  <ol class="list-group list-group-numbered">
                    ${_.join(
                      _.map(
                        ingredients,
                        ing => `
                        <li class="list-group-item d-flex align-items-start">
                          <div class="ms-2 me-auto">
                            <div>${_.capitalize(ing)}</div>
                          </div>
                        </li>
                    `
                      ),
                      ''
                    )}
                  </ol>
                </div>
              
                <div class="col-lg">
                  <h2>${meal.strMeal}</h2>
                  <div class="meal__area--category d-flex text-muted mb-2">
                    ${`
                    <h6>${meal.strArea}</h6>
                    `}\u00A0 <strong>-</strong> \u00A0${`
                    <h6>${meal.strCategory}</h6>
                    `}
                  </div>
                  <p class="meal--instruct">${meal.strInstructions}</p>
                  ${_.join(
                    _.map(
                      tagsArr,
                      tag =>
                        `<span class="badge rounded-pill text-bg-danger">${
                          tag ? `#${tag}` : ''
                        }</span>`
                    ),
                    ' '
                  )}
                </div>
               </div>
             </div>
            `;
  }

  renderError(message) {
    this.innerHTML = '';
    this.innerHTML += `<h3 class="mt-3">${message}</h3>`;
  }
}

customElements.define('meal-list', MealList);
