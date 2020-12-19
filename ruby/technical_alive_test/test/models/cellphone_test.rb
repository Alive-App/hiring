require 'test_helper'

class CellphoneTest < ActiveSupport::TestCase
  setup do
    @motorola = cellphones :motorola
  end

  test 'should import a valid file' do
    cellphone = Cellphone.new file: valid_file

    assert cellphone.import
    assert_empty cellphone.import_errors
  end

  test 'should not import an invalid file' do
    cellphone = Cellphone.new file: invalid_file

    assert_not cellphone.import
    assert_not_empty cellphone.import_errors
  end

  test 'should not import file with invalid format' do
    cellphone = Cellphone.new file: invalid_file_format

    assert_not cellphone.import
    assert_not_empty cellphone.import_errors
  end

  test 'should include filtered by manufacturer' do
    filtered_phones = Cellphone.filter_by_manufacturer('Motorola')
    assert_includes filtered_phones, @motorola
  end

  test 'should not include non filtered by manufacturer' do
    filtered_phones = Cellphone.filter_by_manufacturer('Samsung')
    assert_not_includes filtered_phones, @motorola
  end

  test 'should include filtered by model' do
    filtered_phones = Cellphone.filter_by_model('G5')
    assert_includes filtered_phones, @motorola
  end

  test 'should not include non filtered by model' do
    filtered_phones = Cellphone.filter_by_model('S10')
    assert_not_includes filtered_phones, @motorola
  end

  test 'should include filtered by carrier plan type' do
    filtered_phones = Cellphone.filter_by_carrier_plan_type('pos')
    assert_includes filtered_phones, @motorola
  end

  test 'should not include non filtered by carrier plan type' do
    filtered_phones = Cellphone.filter_by_carrier_plan_type('pre')
    assert_not_includes filtered_phones, @motorola
  end

  private

    def valid_file
      ActionDispatch::Http::UploadedFile.new(
        type: 'text/csv',
        tempfile: File.new(Rails.root.join(fixture_path, 'files', 'input_valid.csv'))
      )
    end

    def invalid_file
      ActionDispatch::Http::UploadedFile.new(
        type: 'text/csv',
        tempfile: File.new(Rails.root.join(fixture_path, 'files', 'input_invalid.csv'))
      )
    end

    def invalid_file_format
      ActionDispatch::Http::UploadedFile.new(
        type: 'text/plain',
        tempfile: File.new(Rails.root.join(fixture_path, 'files', 'input_invalid_format.txt'))
      )
    end
end
