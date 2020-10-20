class PhonesController < ApplicationController
	def index		
		@phones = Phone.ransack(filter_params).result
	end

	def upload
		@phone = Phone.new
	end

	def update	
		Phone.import(params[:phone][:file])
		redirect_to "/phones"
	end

	def filter_params
		params.permit(:manufacturer_eq,:model_eq,:sale_modality_eq)
	end
end