const { Sequelize } = require('sequelize');

const Connection = async() =>{
    
}
const sequelize = new Sequelize('food_delivery_db', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});
// try {
//    await sequelize.authenticate();
//    console.log("Connection has established successfully"); 
// } catch (error) {
//     console.log("Connection failed -" + error); 
// }
module.exports = sequelize;
