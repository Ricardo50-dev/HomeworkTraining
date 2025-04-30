import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const Foods = db.define('alimentos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    calorias: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    carboidratos: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    proteinas: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    gorduras: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    quantidade: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    categoria: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    foto: {
        type: DataTypes.STRING(45),
        allowNull: false,
    }
}, {
    tableName: 'alimentos',
    timestamps: false, // <<< DESATIVA createdAt e updatedAt
})

export default Foods