require 'test_helper'

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
    post cellphones_import_url, params: { file: @valid_file }
    assert_redirected_to root_url
  end

  test 'should not import invalid file' do
    post cellphones_import_url, params: { file: @invalid_file }
    assert_template :import
  end
end
