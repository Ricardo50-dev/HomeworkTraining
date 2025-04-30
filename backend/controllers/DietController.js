import Diet from '../models/Diet.js';
import Snack from '../models/Snack.js'
import Food from '../models/Food.js'
import Foods from '../models/Foods.js'
import getToken from '../helpers/get-token.js';
import jwt from 'jsonwebtoken';
import Logger from "../config/logger.js";

export default class DietController {
    static async create_diet(req, res) {
        let decoded

        if (req.headers.authorization) {
            const token = getToken(req)
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } else {
            res.status(403).json({ message: 'Você precisa estar logado!'})
        }

        const diet = new Diet({
            id_user: decoded.id,
        })
        
        try {
            const newDiet = await diet.save()
            res.status(201).json({ 
                message: 'Dieta criada com sucesso!',
                data: newDiet 
            })
        } catch (error) {
            Logger.error(`Erro ao criar dieta no banco: ${error}`)
            res.status(500).json({ message: error })
        }
    }

    static async create_snacks(req, res) {
        const data = req.body

        try {
            const newSnacks = await Snack.bulkCreate(data)
            res.status(201).json({ 
                message: 'Refeições cadastradas com sucesso!',
                data: newSnacks
            })
        } catch (error) {
            Logger.error(`Erro ao criar as refeições no banco: ${error}`)
            res.status(500).json({ message: error })
        }
    }

    static async create_food(req, res) {

    }

    static async create_foods(req, res) {
    
    }
}