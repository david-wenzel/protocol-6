class ApplicationController < ActionController::API
  include ActionController::Cookies
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  before_action :authorize

  def current_user
    @current_user ||= session[:user_id] &&
    User.find_by(id: session[:user_id])
  end

  private 
  
  def authorize
    current_user
    return render json: { errors: ["Not authorized"] }, status: :unauthorized unless session.include? :user_id
  end

  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end




end
