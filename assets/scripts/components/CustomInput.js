export class CustomInput extends HTMLElement {
  connectedCallback() {
    const inputId = this.getAttribute("name") || "";
    const title = this.getAttribute("title") || "";
    const type = this.getAttribute("type") || "text";
    const options = this.getAttribute("options") || "";
    const full = this.getAttribute("full") || false;
    const optionsList = options
      ? options.split(",").map((opt) => opt.trim())
      : [];
    const step = this.getAttribute("step") === "1" ? 1 : 0.01;

    const renderInputField = () => {
      switch (type) {
        case "number":
          return `<input type="number" step="${step}" autocomplete="off" id="${inputId}" placeholder="${title}" />`;
        case "select":
          const optionsHTML = optionsList
            .map(
              (opt, i) =>
                `<option value="opt${i + 1}"><span>${opt}</span></option>`,
            )
            .join("");
          return `
            <select name="${inputId}" id="${inputId}">
              
              <option value="" disabled selected><span>Selecione uma opção</span></option>
              ${optionsHTML}
            </select>
          `;
        case "checkbox":
          return `
            <input type="checkbox" role="switch" class="switch__input" id="${inputId}" />
            <label for="${inputId}" class="switch__button"></label>
          `;
        case "text":
        default:
          return `<input type="text" autocomplete="off" id="${inputId}" placeholder="${title}" />`;
      }
    };

    this.classList.add("form__input-label");
    if (full === "true") {
      this.classList.add("form__input-label--full");
    }

    if (type == "checkbox") {
      this.classList.add("form__input-label--switch");
    }
    this.innerHTML = `
          <label for="${inputId}">${title}:</label>
          ${renderInputField()}
    `;
  }
}

customElements.define("custom-input", CustomInput);
