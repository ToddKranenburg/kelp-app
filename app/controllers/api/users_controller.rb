class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(user_params)
    if (@user.save)
      render :show
    else
      render json: @user.errors.full_messages
    end
  end

  def update
    @user = current_user
    @user.update(user_params)
    render :show
  end

  private

  def user_params
    params.permit(:username, :password, :profile_picture)
  end
end
