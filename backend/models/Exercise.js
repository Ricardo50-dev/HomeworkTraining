import { DataTypes } from 'sequelize'
import db from '../config/db.js'
import Exercises from './Exercises.js'
import Group from './Group.js'

const Exercise = db.define('exercicio', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    repet: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    id_grupo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Group,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
    id_exercicios: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Exercises,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    }
}, {
    tableName: 'exercicio',
    timestamps: false, // <<< DESATIVA createdAt e updatedAt
})

Exercise.belongsTo(Group, {
    foreignKey: "id_grupo",
})

Exercise.belongsTo(Exercises, {
    foreignKey: "id_exercicios",
    as: 'exercicioDetalhes'
})

Group.hasMany(Exercise, {
    foreignKey: "id_grupo",
})

Exercises.hasMany(Exercise, {
    foreignKey: "id_exercicios",
    as: 'exercicioDetalhes'
})

export default Exercise