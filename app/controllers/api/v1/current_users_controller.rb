class Api::V1::CurrentUsersController < ApplicationController

    def show
        render json: current_user
    end
end
