class Smartphone < ApplicationRecord
  enum carrier_plan_type: %i[pre pos]

  validates :model, presence: true
  validates :manufacturer, presence: true
  validates :color, presence: true
  validates :carrier_plan_type, presence: true
  validates :quantity, presence: true
  validates :price, presence: true
end
