class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.text :email
      t.text :username
      t.string :encrypted_password
      t.string :salt

      t.timestamps null: false
    end
  end
end
