class CsvUploadsController < ApplicationController

  def new
    @csv_upload = CsvUpload.new
  end

  def create
    unless validate_csv
      @csv_upload = CsvUpload.create(csv_upload_params)
      CsvProcessJob.perform_later(@csv_upload)
      return redirect_to smartphones_path, notice: 'CSV válido'
    end
    @csv_upload = CsvUpload.new
    flash[:alert] = 'CSV faltando campos'
    redirect_to new_csv_upload_path
  end

  private

  def validate_csv
    csv = params[:csv_upload][:csv].read
    regex_match = csv.match(/^(?:[^,]*,){1,5}$/)
    regex_match
  end

  def csv_upload_params
    params.require(:csv_upload).permit(:csv)
  end
end