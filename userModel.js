import sequelize from "./database.js";

const User = sequelize.define("user", {
    email: {
        type: sequelize.Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
    },
    password: {
        type: sequelize.Sequelize.STRING,
        allowNull: false,
    },
    name: {
        type: sequelize.Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: sequelize.Sequelize.STRING,
        allowNull: false,
    },
    dob: {
        type: sequelize.Sequelize.DATE,
        allowNull: false,
    },
    });

export default User;

