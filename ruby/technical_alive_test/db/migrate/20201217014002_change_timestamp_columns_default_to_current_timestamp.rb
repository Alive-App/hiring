class ChangeTimestampColumnsDefaultToCurrentTimestamp < ActiveRecord::Migration[6.1]
  def change
    change_column_default :cellphones, :created_at, -> { 'CURRENT_TIMESTAMP' }
    change_column_default :cellphones, :updated_at, -> { 'CURRENT_TIMESTAMP' }
  end
end
