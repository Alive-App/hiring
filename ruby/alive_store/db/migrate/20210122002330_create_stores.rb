class CreateStores < ActiveRecord::Migration[6.1]
  def change
    create_table :stores do |t|
      t.string :manufacturer
      t.string :model
      t.string :color
      t.string :carrier_plan_type
      t.integer :quantity
      t.float :price

      t.timestamps
    end
  end
end
