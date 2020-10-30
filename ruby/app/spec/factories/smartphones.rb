FactoryBot.define do
  factory :smartphone do
    manufacturer { "MyString" }
    model { "MyString" }
    color { "MyString" }
    carrier_plan_type { 1 }
    quantity { 1 }
    price { 1 }
  end
end
