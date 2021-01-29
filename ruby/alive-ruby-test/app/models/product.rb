class Product < ApplicationRecord

    validates :manufacturer, presence: true
    validates :model, presence: true
    validates :color, presence: true
    validates :carrier_plan_type, presence: true
    validates :quantity, presence: true
    validates :price, presence: true

    scope :filter_by_manufacturer, -> (manufacturer) { where("manufacturer like '%#{manufacturer}%'") }
    scope :filter_by_model, -> (model) { where("model like '%#{model}%'") }
    scope :filter_by_carrier_plan_type, -> (carrier_plan_type) { where("carrier_plan_type like '%#{carrier_plan_type}%'") }

    def as_string
        "#{self.id} - #{self.manufacturer} #{self.model} #{self.color}"
    end
end
