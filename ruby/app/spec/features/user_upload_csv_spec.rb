require 'rails_helper'

describe 'User uploads csv' do
  it 'successfully' do
    # ACT
    visit root_path
    click_on 'Novo Upload'
    attach_file 'csv', dummy_valid_csv.first
    click_on 'Enviar'
    # ASSERT
    byebug
    expect(page).to have_content('CSV válido')
    expect(Smartphone.all.length).to be(12)
  end

  it 'failed' do
    # ACT
    visit root_path
    click_on 'Novo Upload'
    attach_file 'csv', dummy_invalid_csv.first
    click_on 'Enviar'
    # ASSERT
    expect(page).to have_content('CSV inválido')
    expect(Smartphone.all.length).to be(0)
  end
end