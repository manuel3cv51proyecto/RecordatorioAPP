class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 2021
        Elaborado por: Zermeño Martinez Manuel
      </p>`;
  }
}

customElements.define(
  "mi-footer", MiFooter);
