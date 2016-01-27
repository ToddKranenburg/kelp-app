class Api::ReviewsController < ApplicationController
  def index
    #this will depend on who is calling it!!
    user_id = params[:user_id]

    if (params[:user_id])
      @reviews = User.find(user_id).reviews
    else
      @reviews = Review.all
    end
  end

  def create
    @review = current_user.reviews.create(review_params)
  end

  def show
    @review = Review.find(params[:id])
  end

  def update
  end

  def destroy
  end

  private
  def review_params
    params.require(:review).permit(:body, :rating)
  end
end
