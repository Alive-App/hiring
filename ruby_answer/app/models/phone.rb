class Phone < ApplicationRecord
	require 'csv'

	validates :manufacturer, presence: true
	validates :model, presence:true
	validates :sale_modality, presence:true
	validates :quantity, presence: true
	validates :price, presence: true
	validates :manufacturer,uniqueness: {scope:[:model, :sale_modality]}

	def self.import(file)	
		errors = []
		unless file.content_type == "text/csv"
			errors << "O formato do arquivo adicionado deve ser .CSV!"
			return errors
		end
	
		unless validate_header(file)
			errors << "O cabeçalho da tabela não está correto!"
			return errors
		end
	
		CSV.foreach(file.path, headers: true).with_index do |row,i|					
			phone = Phone.where(row.to_hash.except("quantity","price"))
						 .first_or_initialize 

			phone.quantity = row.to_hash["quantity"]
			phone.price = row.to_hash["price"]
			unless phone.save				
				errors << "linha #{i+1}: #{phone.errors.full_messages.first}"
			end
		end

		if errors.present?
			return errors
		else
			return "sucess"
		end
	end

	def formated_quantity
		return "#{quantity} u" if quantity.present?
	end

	def formated_price
		return "R$ #{price}" if price.present?
	end

private
	def self.validate_header(file)
		file_header = CSV.open(file.path, &:readline)
		phone_attributes = Phone.columns.collect{|c| "#{c.name}"} - ["id","created_at","updated_at"]
		file_header == phone_attributes	
	end
end
