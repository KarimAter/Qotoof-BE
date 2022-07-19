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