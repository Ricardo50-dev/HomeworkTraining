import { DataTypes } from 'sequelize'
import db from '../config/db.js'
import User from './User.js'

const Training = db.define('treino', {
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
    tableName: 'treino',
    timestamps: false, // <<< DESATIVA createdAt e updatedAt
})

Training.belongsTo(User, {
    foreignKey: "id_user",
})

User.hasOne(Training, {
    foreignKey: "id_user",
})

export default Training