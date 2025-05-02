import { DataTypes } from 'sequelize'
import db from '../config/db.js'
import Training from './Training.js'

const Group = db.define('grupo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    horario: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    agrupamento: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    id_treino: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Training,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    }
}, {
    tableName: 'grupo',
    timestamps: false, // <<< DESATIVA createdAt e updatedAt
})

Group.belongsTo(Training, {
    foreignKey: "id_treino",
})

Training.hasMany(Group, {
    foreignKey: "id_treino",
})

export default Group