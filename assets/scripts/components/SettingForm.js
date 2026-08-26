export class CustomFormSetting extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title") || "";
    const desc = this.getAttribute("desc") || "";
    const userInputs = this.innerHTML;

    this.innerHTML = `
      <div class="form__container" id="settingsFormContainer">
        <div class="form__header">
          <figure class="form__img-container">
            <img src="./assets/img/upper-bite.png" alt="Mordida Cima" />
          </figure>
          <h2 class="form__title">${title} Exercício</h2>
          <figure class="form__img-container">
            <img src="./assets/img/lower-bite.png" alt="Mordida Baixo" />
          </figure>
        </div>
        <div class="form__content">
          <p class="form__desc">
            ${desc}
          </p>
          <form>
            ${userInputs}

            <label
              id="formMessageSetting"
              class="hideComponent form-message"
            ></label>

            <button type="submit" class="form__btn">Prosseguir</button>
          </form>
        </div>
      </div>
    `;
  }
}

customElements.define("custom-setting-form", CustomFormSetting);
