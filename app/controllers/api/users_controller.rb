class Api::UsersController < ApplicationController
  #showing the school!
  def index
    user = User.find(params[:owner_id])
    @users = user.school_members
  end
  def show
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(user_params)
    if (@user.save)
      login!(@user)
      business = Business.find_by_name("A Business");
      intro_body = "Welcome to Kelp, a Yelp clone for fish! Users of Kelp can review and post photos of their favorite aquatic (or terrestrial) businesses, add new businesses to the site, and add other users to their \"school\" to stay up to date with their friends' favorite spots. Take a swim around the site and enjoy."
      @user.reviews.create!(body: intro_body, business_id: business.id, rating: 5)
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
