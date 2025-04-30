import { DataTypes } from 'sequelize'
import db from '../config/db.js'
import Foods from './Foods.js'
import Snack from './Snack.js'

const Food = db.define('alimento', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    porcao: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    id_refeicao: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Snack,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    id_alimentos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Foods,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    }
}, {
    tableName: 'alimento',
    timestamps: false, // <<< DESATIVA createdAt e updatedAt
})

Food.belongsTo(Snack, {
    foreignKey: "id_refeicao",
})

Food.belongsTo(Foods, {
    foreignKey: "id_alimentos",
})

Snack.hasMany(Food)
Foods.hasMany(Food)

export default Food