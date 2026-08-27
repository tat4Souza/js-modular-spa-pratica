export class CustomReportContainer extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title") || "";
    const reportFields = this.innerHTML;

    this.classList.add("form__container");
    this.classList.add("report__container");

    this.innerHTML = `
        <div class="form__header report__header">
            <figure class="form__img-container">
                <img src="./assets/img/upper-bite.png" alt="Mordida Cima" />
            </figure>
            <h3>${title} Exercício</h3>
            <h2 class="form__title">Relatório</h2>
            <figure class="form__img-container">
                <img src="./assets/img/lower-bite.png" alt="Mordida Baixo" />
            </figure>
        </div>

        <div class="form__content report__content">
            <div class="report__grid report__grid--full">
                <h4>Total:</h4>
                <span class="report__total" id="rep-total"></span>
            </div>

            ${reportFields}
        </div>
    `;
  }
}

customElements.define("custom-report-container", CustomReportContainer);
