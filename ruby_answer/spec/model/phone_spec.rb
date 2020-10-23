require 'rails_helper'

RSpec.describe Phone, :type => :model do
  subject {
    described_class.new(manufacturer: "teste",
                        model: "teste",
                        sale_modality: "pre_pago",
                        quantity: 1,
                        price: 200.00)
  }

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

  it "is not valid without a manufacturer" do
    subject.manufacturer = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without a model" do
    subject.model = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without a sale_modality" do
    subject.sale_modality = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without a quantity" do
    subject.quantity= nil
    expect(subject).to_not be_valid
  end

  it "is not valid without a price" do
    subject.quantity= nil
    expect(subject).to_not be_valid
  end

  it "is not valid with a invalid sale_modality" do
    subject.sale_modality = "invalid_sale_modality"
    expect(subject).to_not be_valid
  end

end