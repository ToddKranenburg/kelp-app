class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(username: params[:username], password: params[:password])
    if (@user.save)
      render :show
    else
      render json: ["Improper sign up credentials"]
    end
  end
end
