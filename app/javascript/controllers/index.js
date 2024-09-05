// Import and register all your controllers from the importmap via controllers/**/*_controller
import { application } from "controllers/application"
import PasswordController from "controllers/password_controller"
import FlashController from "controllers/flash_controller"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"

eagerLoadControllersFrom("controllers", application)

application.register("password", PasswordController)
application.register("flashes", FlashController)
