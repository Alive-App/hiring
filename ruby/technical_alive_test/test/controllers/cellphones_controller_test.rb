require 'test_helper'
require 'csv'

class CellphonesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @valid_file = fixture_file_upload('input_valid.csv', 'text/csv')
    @invalid_file = fixture_file_upload('input_invalid.csv', 'text/csv')
  end

  test 'should get index' do
    get cellphones_index_url
    assert_response :success
  end

  test 'should get import' do
    get cellphones_import_url
    assert_response :success
  end

  test 'should import valid file' do
    no_of_rows_to_import = CSV.read(@valid_file.tempfile, headers: true).length

    assert_difference 'Cellphone.count', no_of_rows_to_import do
      post cellphones_import_url, params: { file: @valid_file }
    end

    assert_redirected_to root_url
  end

  test 'should not import invalid file' do
    assert_no_changes 'Cellphone.count' do
      post cellphones_import_url, params: { file: @invalid_file }
    end

    assert_template :import
  end
end
