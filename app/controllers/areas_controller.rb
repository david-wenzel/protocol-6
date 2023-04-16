class AreasController < ApplicationController
    skip_before_action :authorize, only: [:index, :show]

  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  def index
    areas = Area.all.order("title")
    render json: areas, include: :protocols, status: :ok
  end

  def create
    area = Area.create!(area_params)
    render json: area, status: :created
  end

  def destroy
    area = Area.find(params[:id])
    area.destroy
    head :no_content
  end

  private

  def area_params
    params.permit(:title)
  end

  def render_not_found_response
    return render json: { error: "Area not found"}, status: :not_found
  end
end