const User = require('../models/user');
const Role = require('../models/role');



User.belongsToMany(Role, {
    through: 'user_role',
    foreignKey: 'userid',
    otherKey: 'roleid',
    as: 'roles',
});
Role.belongsToMany(User, {
    through: 'user_role',
    foreignKey: 'roleid',
    otherKey: 'userid',
    as: 'users',
});

module.exports = { User, Role };