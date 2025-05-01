import { DataTypes } from 'sequelize'
import db from '../config/db.js'
import User from './User.js'

const Diet = db.define('dieta', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    }
}, {
    tableName: 'dieta',
    timestamps: false, // <<< DESATIVA createdAt e updatedAt
})

Diet.belongsTo(User, {
    foreignKey: "id_user",
})

User.hasOne(Diet, {
    foreignKey: "id_user",
})

export default Diet