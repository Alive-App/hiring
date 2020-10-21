class PhonesController < ApplicationController
	def index		
		@phones = Phone.ransack(filter_params).result
	end

	def upload
		@phone = Phone.new
	end

	def update	
		import_result = Phone.import(params[:phone][:file])	
		redirect_to "/phones", notice: import_result
	end

	def filter_params
		params.permit(:manufacturer_eq,:model_eq,:sale_modality_eq)
	end
end