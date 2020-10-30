class CreateCsvUploads < ActiveRecord::Migration[6.0]
  def change
    create_table :csv_uploads do |t|

      t.timestamps
    end
  end
end
