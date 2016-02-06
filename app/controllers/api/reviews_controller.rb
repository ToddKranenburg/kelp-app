class Api::ReviewsController < ApplicationController
  def index
    #this will depend on who is calling it!!
    user_id = params[:user_id]
    owner_id = params[:owner_id]

    if (user_id)
      @reviews = Review.includes(:author).where("author_id = ?", user_id).includes(:business).order(created_at: :desc)
    elsif (owner_id)
      owner = User.find(owner_id)
      @school_members = owner.school_members.includes(:review)
      render "api/reviews/school_reviews_index"
    else
      @reviews = Review.includes(:author).includes(:business).order(created_at: :desc).all
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
