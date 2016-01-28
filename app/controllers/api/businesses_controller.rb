class Api::BusinessesController < ApplicationController
  def index
    #probabl dependent on search params
  end

  def create
    @business = Business.create!(business_params)
  end

  def show
    @business = Business.includes(:reviews).find(params[:id])
  end

  def update
  end

  def destroy
  end

  private
  def business_params
    params.require(:business).permit(:name, :lat, :lng)
  end
end
