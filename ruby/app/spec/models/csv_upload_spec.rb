require 'rails_helper'

RSpec.describe CsvUpload, type: :model do
  it 'should be valid' do
    expect(build(:csv_upload)).to be_valid
  end

  it 'should validate attached' do
    expect(build(:invalid_csv_upload)).not_to be_valid
  end
end
