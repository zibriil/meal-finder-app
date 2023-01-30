class SearchBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set clickEvent(e) {
    this._clickEvent = e;
    this.render();
  }

  get value() {
    return this.querySelector('#searchElement').value;
  }

  render() {
    this.innerHTML = `
        <div class="container">
          <div class="input-group mt-5 container--search">
            <input
            type="search"
            id="searchElement"
            class="rounded-pill search-bar__input"
            placeholder="Search keyword for meal..."
            />
            <button
            class="btn border-0"
            id="searchButtonElement"
            type="submit"
            title="Search"
            >
            <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <hr />
        </div>
    `;

    this.querySelector('#searchButtonElement').addEventListener(
      'click',
      this._clickEvent
    );
  }
}

customElements.define('search-bar', SearchBar);
