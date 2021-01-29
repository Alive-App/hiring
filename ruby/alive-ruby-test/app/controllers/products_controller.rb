class ProductsController < ApplicationController
  def index
    @products = Product.page(params[:page])
    filter_params(params).each do |key, value|
      @products = @products.send("filter_by_#{key}", value).page(params[:page]) if value.present?
    end
  end

  def new
    @product = Product.new
    if (product_params)
      @product.attributes = product_params
    end
  end

  def create
    @product = Product.new
    @product.attributes = product_params

    if @product.valid?
      @product.save
      redirect_to action: "index"
    else
      redirect_back fallback_location: { action: "new" }, alert: "Please fill in all fields."
    end
  end

  def edit
    begin
      @product = Product.find(params[:id])
    rescue ActiveRecord::RecordNotFound => e
      redirect_back fallback_location: { action: "index" }, alert: "Invalid product."      
    end
  end

  def update
    begin
      @product = Product.find(params[:id])
    rescue ActiveRecord::RecordNotFound => e
      redirect_back fallback_location: { action: "index" }, alert: "Invalid product."      
    end    
    
    @product.attributes = product_params
    if @product.valid?
      @product.save
      flash[:notice] = "Product updated successfully."
      redirect_to action: "index"
    else
      redirect_back fallback_location: { action: "edit" }, id: params[:id], alert: "Please fill in all fields."
    end

  end

  def show
    begin
      @product = Product.find(params[:id])
    rescue ActiveRecord::RecordNotFound => e
      flash[:alert] = "Invalid Product"
      redirect_to action: "index"      
    end
  end

  def destroy
    begin
      @product = Product.find(params[:id])
    rescue ActiveRecord::RecordNotFound => e
      redirect_back fallback_location: { action: "index" }, alert: "Invalid product."      
    end
    destroyedProduct = @product.as_string
    if @product.destroy
      flash[:notice] = "Product deleted successfully: #{destroyedProduct}"
      redirect_to action: "index"
    else
      redirect_back fallback_location: { action: "index" }, alert: "An error occurred while trying to delete this product: #{@product.as_string}"
    end
  end

  def import
  end

  def run_import
    uploaded_file = params[:file]
    csv_path = Rails.root.join('storage', uploaded_file.original_filename)

    File.open(csv_path, 'wb') do |file|
      file.write(uploaded_file.read)
    end

    products = []
    CSV.foreach(csv_path, headers: true) do |row|
      products << row.to_h
    end

    if params[:fail_on_error] == "1"
      begin
        result = Product.import!(products)
        flash[:notice] = "#{result.ids.length} Products successfully inserted"
        redirect_to action: "index"
      rescue ActiveRecord::RecordInvalid => e
        flash[:alert] = "An error occurred due to malformatted file or invalid input"
        redirect_to action: "import"
      end
    else
      result = Product.import(products)
      flash[:notice] = "#{result.ids.length} Products successfully inserted, #{result.failed_instances.length} failed"
      redirect_to action: "index"
    end
  end

  private
  def product_params
    if (params[:product])
      params.require(:product).permit(:manufacturer, :model, :color, :carrier_plan_type, :quantity, :price)
    end
  end

  def filter_params(params)
    params.slice(:manufacturer, :model, :carrier_plan_type)
  end
end
