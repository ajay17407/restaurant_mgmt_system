import User from './User.js';
import TableBooking from './TableBooking.js';
import PreOrderItem from './PreOrderItem.js';
import MenuItem from './MenuItem.js';

const models = {
    User,
    TableBooking,
    PreOrderItem,
    MenuItem
};
  
  
function setupAssociations() {
    User.hasMany(TableBooking,{ foreignKey: 'userId' });
    TableBooking.belongsTo(User,{ foreignKey: 'userId' });
  
    TableBooking.hasMany(PreOrderItem, { foreignKey: 'bookingId' });
    PreOrderItem.belongsTo(TableBooking, { foreignKey: 'bookingId' });
  
    MenuItem.hasMany(PreOrderItem, { foreignKey: 'menuItemId' });
    PreOrderItem.belongsTo(MenuItem, { foreignKey: 'menuItemId' });
}
  
export { setupAssociations, models };