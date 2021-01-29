class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :manufacturer, null: false
      t.string :model, null: false
      t.string :color, null: false
      t.string :carrier_plan_type, null: false
      t.integer :quantity, null: false
      t.decimal :price, precision: 10, scale: 2, null: false

      t.timestamps
    end
  end
end
