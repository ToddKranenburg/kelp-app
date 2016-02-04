class Api::ReviewsController < ApplicationController
  def index
    #this will depend on who is calling it!!
    user_id = params[:user_id]

    if (params[:user_id])
      @reviews = Review.includes(:author).where("author_id = ?", user_id).includes(:business)
    else
      @reviews = Review.includes(:author).includes(:business).all
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
    params.require(:review).permit(:body, :rating, :business_id)
  end
end
