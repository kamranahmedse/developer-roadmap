# Transactions

Transactions are a sequence of operations performed as a single logical unit of work. They ensure data integrity by treating a series of database operations as an "all or nothing" proposition. If any operation within the transaction fails, the entire transaction is rolled back, reverting the database to its original state before the transaction began. This prevents partial updates and maintains consistency.

Visit the following resources to learn more:

- [@official@Active Record Transactions](https://api.rubyonrails.org/classes/ActiveRecord/Transactions/ClassMethods.html)
- [@article@What Is A Transaction?](https://www.honeybadger.io/blog/database-transactions-rails-activerecord/)
- [@article@Rails transactions: The Complete Guide](https://medium.com/@kristenrogers.kr75/rails-transactions-the-complete-guide-7b5c00c604fc)
- [@article@107.ActiveRecord Transactions in depth](https://courses.bigbinaryacademy.com/learn-rubyonrails/activerecord-transactions-in-depth/)
- [@article@5 Tips to Design Ruby on Rails Transactions the Right Way](https://blog.appsignal.com/2022/03/30/5-tips-to-design-ruby-on-rails-transactions-the-right-way.html)