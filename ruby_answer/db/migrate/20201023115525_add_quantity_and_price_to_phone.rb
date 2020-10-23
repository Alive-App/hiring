class AddQuantityAndPriceToPhone < ActiveRecord::Migration[5.2]
  def change
  	add_column :phones, :quantity, :integer 
  	add_column :phones, :price   , :float 
  end
end
