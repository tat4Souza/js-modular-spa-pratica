export class CustomMenuCard extends HTMLElement {
  connectedCallback() {
    const image = this.getAttribute("image") || "";
    const title = this.getAttribute("title") || "";
    const desc = this.getAttribute("desc") || "";
    const url = this.getAttribute("url") || "";

    this.classList.add("menu__item");
    this.innerHTML = `
        <figure class="menu__img-container">
            <img src="./assets/img/${image}.png" alt="Decoração de Exercício" />
        </figure>
        <div class="menu__content">
            <h3>${title} Exercício</h3>
            <p>${desc}</p>
        </div>
        <a class="menu__button" href="/${url}" data-link>Acessar</a>
    `;
  }
}

customElements.define("custom-menu-card", CustomMenuCard);
