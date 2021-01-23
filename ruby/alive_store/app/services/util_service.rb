class UtilService
    require 'csv'
    def self.read_csv(params)
        table = CSV.parse(File.read(params), headers: true) if params.present?
        if table.blank? || invalid?(table.by_row, table.by_col.count)
            false
        else
            structure(table.by_row)
        end
    end
    
      
    def self.invalid?(rows, cols)
        array_temp = []
        rows.by_row.each do |ab |
           array_temp << ab.map {|a| a[1]}.reject(&:blank?).count if ab.map {|a| a[1]}.reject(&:blank?).count < cols 
        end
        array_temp.present?
    end
    
    def self.structure(parametro)
        parametro.each do |single |
            manufacturer = single['manufacturer']
            model = single['model']
            color = single['color']
            carrier = single['carrier_plan_type']
            quantity = single['quantity']
            price = single['price']
            Store.create(manufacturer: manufacturer, model: model, color: color, carrier_plan_type: carrier, quantity: quantity, price: price)
            true
        end
    end
end