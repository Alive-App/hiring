class PhonesController < ApplicationController

	def index
	end

	def upload
		@phone = Phone.new
	end

	def update	
		Phone.import(params[:phone][:file])
	end

end