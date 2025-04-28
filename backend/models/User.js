import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const User = db.define('usuario', {
    email: {
        type: DataTypes.STRING(25),
        allowNull: false,
        primaryKey: true,
    },
    senha: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    nome: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    peso: {
        type: DataTypes.FLOAT,
    },
    altura: {
        type: DataTypes.FLOAT,
    },
    idade: {
        type: DataTypes.INTEGER,
    },
    genero: {
        type: DataTypes.STRING(10),
    },
    imc: {
        type: DataTypes.FLOAT,
    },
    gc: {
        type: DataTypes.FLOAT,
    },
    objetivo: {
        type: DataTypes.STRING(25),
    },
    pratica: {
        type: DataTypes.STRING(5),
    },
    imagem: {
        type: DataTypes.STRING(50),
    }
}, {
    tableName: 'usuario', 
    timestamps: false, // <<< DESATIVA createdAt e updatedAt
})

export default User