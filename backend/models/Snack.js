import { DataTypes } from 'sequelize'
import db from '../config/db.js'
import Diet from './Diet.js'

const Snack = db.define('refeicao', {
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
    calorias: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    proteinas: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    carboidratos: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    gorduras: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    id_dieta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Diet,
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    }
}, {
    tableName: 'refeicao',
    timestamps: false, // <<< DESATIVA createdAt e updatedAt
})

Snack.belongsTo(Diet, {
    foreignKey: "id_dieta",
})

Diet.hasMany(Snack)

export default Snack