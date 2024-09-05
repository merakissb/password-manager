class PasswordsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_password, only: %i[show edit update destroy]

  def index
    @passwords = current_user.passwords
  end

  def show
    @password = current_user.passwords.find(params[:id])
  end

  def new
    @password = current_user.passwords.build
  end

  def create
    @password = current_user.passwords.build(password_params)
    if @password.save
      redirect_to passwords_path, notice: "Password was successfully created."
    else
      render :new
    end
  end

  def edit
    @password = current_user.passwords.find(params[:id])
  end

  def update
    if @password.update(password_params)
      if request.format.json?
        render json: { status: "success", password: @password }, status: :ok
      else
        redirect_to @password, notice: "Password was successfully updated."
      end
    else
      if request.format.json?
        render json: { errors: @password.errors.full_messages }, status: :unprocessable_entity
      else
        render :edit
      end
    end
  end

  def destroy
    @password.destroy
    redirect_to passwords_url, notice: "Password was successfully destroyed."
  end

  private

  def set_password
    @password = current_user.passwords.find(params[:id])
  end

  def password_params
    params.require(:password).permit(:name, :key)
  end
end
