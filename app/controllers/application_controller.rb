class ApplicationController < ActionController::Base
    before_action :configure_permiited_parameters, if: :devise_controller?
    before_action :authenticate_user!
    protected
    def configure_permiited_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :name, :email])
    end
end
