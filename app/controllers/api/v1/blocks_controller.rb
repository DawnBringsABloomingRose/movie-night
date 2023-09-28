class Api::V1::BlocksController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create 
        @block = Block.new(name: params[:name])
        if @block.save 
            render json: @block
        else
            render json: @block.errors
        end
    end
end
