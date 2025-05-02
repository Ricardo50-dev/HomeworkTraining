import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const Exercises = db.define('exercicios', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    categoria: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    gif: {
        type: DataTypes.STRING(50),
        allowNull: false,
    }
}, {
    tableName: 'exercicios',
    timestamps: false, // <<< DESATIVA createdAt e updatedAt
})

export default Exercises