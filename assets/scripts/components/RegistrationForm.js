export class CustomFormRegistration extends HTMLElement {
  connectedCallback() {
    const image = this.getAttribute("image") || "";
    const combo = this.getAttribute("combo") || false;
    const userInputs = this.innerHTML;

    this.innerHTML = `
        <div id="registrationFormContainer" class="form__container ${combo === "true" ? "hideComponent" : "viewComponent"}">
            <div class="form__header">
                <p>
                Preencha as informações dos cadastros e, quando estiver pronto, clique no
                botão ao lado:
                </p>
                <button class="form__btn form__btn--report" id="btnFinishForm">
                Gerar
                </button>
                <figure class="form__stars">
                <img src="./assets/img/${image}.png" alt="Decoração de Exercício" />
                </figure>
            </div>
            <div class="form__content">
                <p>Os campos com (*) são obrigatórios</p>
                <form id="registrationForm">
                    ${userInputs}

                    <label
                        id="formMessageRegistration"
                        class="hideComponent form-message"
                    ></label>

                    <button type="submit" class="form__btn">Enviar</button>
                </form>
            </div>
        </div>
    `;
  }
}

customElements.define("custom-registration-form", CustomFormRegistration);
