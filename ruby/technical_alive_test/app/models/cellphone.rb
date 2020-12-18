require 'csv'

class Cellphone < ApplicationRecord
  attr_accessor :file
  attr_writer :import_errors

  validates :manufacturer, :model, :color,
    :carrier_plan_type, :quantity, :price,
    presence: true

  def import
    @import_errors = []

    if file.content_type != 'text/csv'
      @import_errors.append('Please select a CSV file')
      return false
    end

    begin
      csv = CSV.read(file.path, headers: true)
    rescue StandardError
      @import_errors.append('Unable to parse CSV file')
      return false
    end

    line = 1
    begin
      cellphones_to_save = []

      csv.each do |row|
        cellphone = Cellphone.new(
          id: line,
          manufacturer: row['manufacturer'],
          model: row['model'],
          color: row['color'],
          carrier_plan_type: row['carrier_plan_type'],
          quantity: row['quantity'],
          price: row['price'],
        )

        if cellphone.invalid?
          @import_errors.append "Error in line #{line}"
          @import_errors += cellphone.errors.full_messages

          return false
        end

        cellphones_to_save.append(cellphone)

        line += 1
      end

      Cellphone.upsert_all(cellphones_to_save.map(&:to_hash))
    rescue StandardError => e
      @import_errors
        .append("Error in line #{line}")
        .append(e.message)

      return false
    end

    true
  end

  def import_errors
    @import_errors || []
  end

  def to_hash
    {
      id: id,
      manufacturer: manufacturer,
      model: model,
      color: color,
      carrier_plan_type: carrier_plan_type,
      quantity: quantity,
      price: price,
    }
  end
end
