class MealItem extends HTMLElement {
  set meal(meal) {
    this._meal = meal;
    this.render();
  }

  render() {
    this.innerHTML = `
          <div class="card mt-3 mb-5 mx-2">
            <img src="${this._meal.strMealThumb}" class="card-img-top" alt="${this._meal.strMeal}" title="Details" loading="lazy" />
            <div class="card-body meal--info" data-mealID="${this._meal.idMeal}">
              <h5 class="card-title text-center">${this._meal.strMeal}</h5>
            </div>
          </div>
    `;
  }
}

customElements.define('meal-item', MealItem);
