class CellphonesController < ApplicationController
  def index
    @cellphones = Cellphone.all
  end

  def import
  end

  def import_csv
    @cellphone = Cellphone.new file: params[:file]

    if @cellphone.import
      redirect_to root_url, notice: 'Cellphone data successfully imported!'
    else
      render :import
    end
  end
end
