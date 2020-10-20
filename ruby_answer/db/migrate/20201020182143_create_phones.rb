class CreatePhones < ActiveRecord::Migration[5.2]
  def change
    create_table :phones do |t|
      t.string :manufacturer
      t.string :model
      t.string :sale_modality

      t.timestamps
    end
  end
end
