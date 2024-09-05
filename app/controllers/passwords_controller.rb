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
      redirect_to @password, notice: "Password was successfully created."
    else
      render :new
    end
  end

  def edit
    @password = current_user.passwords.find(params[:id])
  end

  def update
    if @password.update(password_params)
      redirect_to @password, notice: "Password was successfully updated."
    else
      render :edit
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
