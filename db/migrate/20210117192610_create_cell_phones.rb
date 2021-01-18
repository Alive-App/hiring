class CreateCellPhones < ActiveRecord::Migration[5.2]
  def change
    create_table :cell_phones do |t|
      t.string :model, limit: 200, null: false
      t.string :color, limit: 200, null: false
      t.string :manufacturer, limit: 200, null: false
      t.string :carrier_plan_type, limit: 10, null: false
      t.integer :quantity
      t.float :price

      t.timestamps
    end
  end
end
