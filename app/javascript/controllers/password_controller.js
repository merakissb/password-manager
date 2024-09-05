// app/javascript/controllers/password_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["name", "key", "editButton", "saveButton", "cancelButton", "deleteButton", "toggleButton"]

  initialize() {
    this.originalKey = null
    this.isVisible = true
    this.isEditing = false
  }

  edit() {
    this.isEditing = true
    this.originalKey = this.keyTarget.value // Save the original value
    this.nameTarget.removeAttribute("readonly")
    this.keyTarget.removeAttribute("readonly")
    this.keyTarget.setAttribute("type", "text") // Show password in clear text
    this.editButtonTarget.classList.add("d-none")
    this.saveButtonTarget.classList.remove("d-none")
    this.cancelButtonTarget.classList.remove("d-none")
    this.deleteButtonTarget.classList.add("d-none")  // Hide delete button
    this.toggleButtonTarget.classList.add("d-none")   // Hide eye button
  }

  async save() {
    const id = this.element.dataset.passwordId
    const name = this.nameTarget.value
    const key = this.keyTarget.value

    // Disable the save button to prevent multiple clicks
    this.saveButtonTarget.disabled = true

    try {
      const response = await fetch(`/passwords/${id}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector("meta[name='csrf-token']").content
        },
        body: JSON.stringify({ password: { name: name, key: key } })
      })

      if (response.ok) {
        const data = await response.json()
        this.nameTarget.setAttribute("readonly", true)
        this.keyTarget.setAttribute("readonly", true)
        this.keyTarget.setAttribute("type", "password") // Hide password again
        this.editButtonTarget.classList.remove("d-none")
        this.saveButtonTarget.classList.add("d-none")
        this.cancelButtonTarget.classList.add("d-none")
        this.deleteButtonTarget.classList.remove("d-none")  // Show delete button
        this.toggleButtonTarget.classList.remove("d-none")  // Show eye button

        // Optionally handle successful response (e.g., update UI with data from response)
        console.log('Password updated successfully:', data.password)
      } else {
        const errorData = await response.json()
        console.error('Failed to save password:', errorData.errors)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      // Re-enable the save button in case of an error or successful response
      this.saveButtonTarget.disabled = false
      this.isEditing = false
    }
  }

  cancel() {
    this.nameTarget.setAttribute("readonly", true)
    this.keyTarget.setAttribute("readonly", true)
    this.keyTarget.setAttribute("type", "password") // Hide password again
    this.keyTarget.value = this.originalKey // Restore the original value
    this.editButtonTarget.classList.remove("d-none")
    this.saveButtonTarget.classList.add("d-none")
    this.cancelButtonTarget.classList.add("d-none")
    this.deleteButtonTarget.classList.remove("d-none")  // Show delete button
    this.toggleButtonTarget.classList.remove("d-none")  // Show eye button
    this.isEditing = false
  }

  toggleVisibility() {
    if (this.isVisible && !this.isEditing) {
      this.keyTarget.setAttribute("type", "text")
      this.toggleButtonTarget.querySelector("i").classList.replace("fa-eye", "fa-eye-slash")
      this.editButtonTarget.classList.add("d-none")
      this.deleteButtonTarget.classList.add("d-none")
    } else {
      this.keyTarget.setAttribute("type", "password")
      this.toggleButtonTarget.querySelector("i").classList.replace("fa-eye-slash", "fa-eye")
      if (!this.isEditing) {
        this.editButtonTarget.classList.remove("d-none")
        this.deleteButtonTarget.classList.remove("d-none")
      }
    }
    this.isVisible = !this.isVisible
  }
}
