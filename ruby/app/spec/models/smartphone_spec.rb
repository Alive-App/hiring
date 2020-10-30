require 'rails_helper'

RSpec.describe Smartphone, type: :model do
  it 'should be valid' do
    expect(build(:smartphone)).to be_valid
  end

  it 'should validate model' do
    expect(build(:smartphone, model: nil)).not_to be_valid
  end

  it 'should validate manufacturer' do
    expect(build(:smartphone, manufacturer: nil)).not_to be_valid
  end

  it 'should validate color' do
    expect(build(:smartphone, model: nil)).not_to be_valid
  end

  it 'should validate carrier_plan_type' do
    expect(build(:smartphone, carrier_plan_type: nil)).not_to be_valid
  end

  it 'should validate quantity' do
    expect(build(:smartphone, quantity: nil)).not_to be_valid
  end

  it 'should validate price' do
    expect(build(:smartphone, price: nil)).not_to be_valid
  end
end
