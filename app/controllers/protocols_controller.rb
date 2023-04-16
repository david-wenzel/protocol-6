class ProtocolsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    
    

    def create
        protocol = Protocol.create!(protocol_params)
        render json: protocol, status: :created
    end

    def update
        protocol = @current_user.protocols.find(params[:id])
        protocol.update(protocol_params)
        render json: protocol
    end

    def destroy
        protocol = @current_user.protocols.find(params[:id])
        protocol.destroy
        head :no_content
    end

    private
    
    def 
    params.permit(:img_url, :body, :area_id, :user_id)
    end
end
