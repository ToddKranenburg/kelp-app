class Api::SessionsController < ApplicationController
  def show
    if current_user
      @user = current_user
      render "api/users/show"
    else
      render json: {}
    end
  end

  def create
    @user = User.find_by_credentials(params[:username], params[:password])

    if @user.nil?
      render json: ["The username/password you entered was incorrect"], status: 401
    else
      login!(@user)
      render "/api/users/show"
    end
  end

  def destroy
    @user = current_user
    logout!

    render json: ["You logged out!"]
  end


end
