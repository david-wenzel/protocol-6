class SavedProtocolsController < ApplicationController
    before_action :authorize

  def index
    saved_protocols = current_user.saved_protocols
    render json: saved_protocols, include: [:user, :protocol], status: :ok
  end

  def create
    protocol = Protocol.find(params[:protocol_id])

    saved_protocol = current_user.saved_protocols.build(protocol: protocol)

    if saved_protocol.save
      render json: saved_protocol, include: [:user, :protocol], status: :created
    else
      render json: { errors: saved_protocol.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    saved_protocol = current_user.saved_protocols.find(params[:id])
    saved_protocol.destroy
    head :no_content
  end
end
