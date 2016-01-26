class Api::ReviewsController < ApplicationController
  def index
    #this will depend on who is calling it!!
    @reviews = Review.all
  end

  def create
  end

  def show
  end

  def update
  end

  def destroy
  end

  private

end
