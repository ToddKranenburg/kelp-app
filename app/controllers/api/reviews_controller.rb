class Api::ReviewsController < ApplicationController
  def index
    #this will depend on who is calling it!!
    @reviews = Review.all
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
