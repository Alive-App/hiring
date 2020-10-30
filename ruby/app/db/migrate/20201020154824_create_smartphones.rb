class CreateSmartphones < ActiveRecord::Migration[6.0]
  def change
    create_table :smartphones do |t|
      t.string :manufacturer
      t.string :model
      t.string :color
      t.integer :carrier_plan_type
      t.integer :quantity
      t.integer :price

      t.timestamps
    end
  end
end
