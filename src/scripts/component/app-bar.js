class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <nav class="navbar bg-danger p-3">
            <div class="container">
            <h1 class="navbar-brand text-white mb-0 h1">Meal Finder App</h1>
            </div>
        </nav>
    `;
  }
}

customElements.define('app-bar', AppBar);
