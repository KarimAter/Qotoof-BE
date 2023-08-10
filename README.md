!!!!!Important

DONT RUN THE CONTAINERS UNTIL YOU FINISH DEVELOPMENT
RUN ONLY THE DATABASE CONTAINER


# Qotoof-BE

# start project
yarn install
npx prisma generate
yarn start

# For Linux
sudo apt update
sudo apt install mysql-server
mysql --version
sudo /etc/init.d/mysql start
sudo mysql_secure_installation
npx prisma migrate dev --name init

# For Docker

npx prisma generate
npx prisma db push

-----------------------------------
Types:
Entity (Database interface) ==> I... (IExpense)
DTO (Top layer interface) ==> (Donation,Expense ...)
BasisModel (id,name)


Type Mapper:
Converts from Entity layer type to response type 
* If model is referenced by another model it's converted to BasicModel type.
* If it is the model that being mapped it converted to relevent DTO, and referencing the relational model by the referenced attribute.