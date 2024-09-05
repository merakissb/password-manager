// app/javascript/controllers/flash_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["flash"];

  connect() {
    this.hideFlashAfterDelay();
  }

  hideFlashAfterDelay() {
    this.flashTargets.forEach((flash) => {
      setTimeout(() => {
        flash.classList.remove('show');
        flash.classList.add('fade');
      }, 1000); // 1 segundo
    });
  }
}
