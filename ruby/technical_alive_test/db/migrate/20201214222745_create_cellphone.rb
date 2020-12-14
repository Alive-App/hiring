class CreateCellphone < ActiveRecord::Migration[6.1]
  def change
    create_table :cellphones do |t|
      t.string :manufacturer, null: false
      t.string :model, null: false
      t.string :color, null: false
      t.string :carrier_plan_type, null: false
      t.integer :quantity, null: false
      t.decimal :price, null: false

      t.timestamps
    end
  end
end
