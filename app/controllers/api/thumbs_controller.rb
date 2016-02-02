class Api::ThumbsController < ApplicationController
  def index
    business = Business.find(params[:business_id])
    @thumbs = business.thumbs
  end

  def create
    business = Business.find(params[:business_id])
    @thumb = business.thumbs.create!(thumb_params)
  end

  def destroy
    @thumb = Thumb.find(params[:id])
    @thumb.destroy!
  end

  private
  def thumb_params
    params.permit(:image)
  end
end
