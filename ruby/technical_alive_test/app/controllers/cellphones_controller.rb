class CellphonesController < ApplicationController
  def index
    @cellphones = Cellphone.all
  end

  def import
  end

  def import_csv
    @cellphone = Cellphone.new file: params[:file]

    if @cellphone.import
      redirect_to cellphones_index_path, notice: 'Cellphone data successfully imported!'
    else
      flash[:import_errors] = @cellphone.import_errors
      redirect_to cellphones_index_path
    end
  end
end
