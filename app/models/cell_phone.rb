class CellPhone < ApplicationRecord

  require 'csv'

  validates :model, presence: true, length: { maximum: 200 }
  validates :color, presence: true, length: { maximum: 200 }
  validates :manufacturer, presence: true, length: { maximum: 200 }
  validates :carrier_plan_type, presence: true, length: { maximum: 10 }
  validates :quantity, presence: true
  validates :price, presence: true

  scope :filter_by_manufacturer, -> (manufacturer) { where("manufacturer like ?", "#{manufacturer}%")}
  scope :filter_by_model, -> (model) { where("model like ?", "#{model}%")}
  scope :filter_by_carrier_plan_type, -> (carrier_plan_type) { where("carrier_plan_type like ?", "#{carrier_plan_type}%")}

  def self.import(file)
    CSV.foreach(file.path, headers: true) do |row|
      CellPhone.create! row.to_hash
    end
  end
  
end
