class PhonesController < ApplicationController
	skip_before_action :verify_authenticity_token  
	def index		
		@phones = Phone.ransack(filter_params).result
	end

	def upload
		@phone = Phone.new
	end

	def update		
		phones_quantity = Phone.all.count
		@import_result = Phone.import(params[:phone][:file])	
		new_phones_quantity = Phone.all.count

		phones_added = new_phones_quantity - phones_quantity

		
		if @import_result == "sucess"
			redirect_to "/phones", notice: "#{phones_added} celular(es) adicionado(s) com sucesso!"
		else
			render "upload_error"
		end
	end

	def filter_params
		params.permit(:manufacturer_eq,:model_eq,:sale_modality_eq)
	end
end