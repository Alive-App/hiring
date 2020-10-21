class Phone < ApplicationRecord
	require 'csv'

	validates :manufacturer, presence: true
	validates :model, presence:true
	validates :sale_modality, presence:true

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
	
		CSV.foreach(file.path, headers: true) do |row,i|	
			phone = Phone.new row.to_hash
			unless phone.save				
				errors << "linha #{i}: #{phone.errors.full_messages.first}"
			end
		end

		if errors.present?
			return errors
		else
			return "sucess"
		end
	end

private
	def self.validate_header(file)
		file_header = CSV.open(file.path, &:readline)
		phone_attributes = Phone.columns.collect{|c| "#{c.name}"} - ["id","created_at","updated_at"]
		file_header == phone_attributes	
	end
end
