FactoryBot.define do
  factory :csv_upload do
    csv { fixture_file_upload(Rails.root.join('spec', 'files', 'input_valid.csv')) }

    factory :invalid_csv_upload do
      csv { nil }
    end
  end
end
