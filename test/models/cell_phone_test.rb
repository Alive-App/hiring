require 'test_helper'

class CellPhoneTest < ActiveSupport::TestCase
  setup do
    @cellphones = cell_phones (:one)
  end

  test 'should pass filtered by manufacturer' do
    filter = CellPhone.filter_by_manufacturer('motorola')
    assert_includes filter, @cellphones
  end

  test 'should not pass filtered by manufacturer' do
    filter = CellPhone.filter_by_manufacturer('asus')
    assert_not_includes filter, @cellphones
  end

  test 'should pass filtered by model' do
    filter = CellPhone.filter_by_model('moto')
    assert_includes filter, @cellphones
  end

  test 'should not pass filtered by model' do
    filter = CellPhone.filter_by_model('asus')
    assert_not_includes filter, @cellphones
  end

  test 'should pass filtered by carrier plan type' do
    filter = CellPhone.filter_by_carrier_plan_type('pre')
    assert_includes filter, @cellphones
  end

  test 'should not pass filtered by carrier plan type' do
    filter = CellPhone.filter_by_carrier_plan_type('alt')
    assert_not_includes filter, @cellphones
  end

end
