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
        const data = req.body

        try {
            const newFood = await Food.bulkCreate(data)
            res.status(201).json({ 
                message: 'Alimentos de cada refeição cadastrados com sucesso!',
                data: newFood
            })
        } catch (error) {
            Logger.error(`Erro ao criar os alimentos de cada refeição no banco: ${error}`)
            res.status(500).json({ message: error })
        }
    }

    static async create_foods(req, res) {
        const nome = req.body.nome
        const calorias = req.body.calorias
        const carboidratos = req.body.carboidratos
        const proteinas = req.body.proteinas
        const gorduras = req.body.gorduras
        const quantidade = req.body.quantidade
        const categoria = req.body.categoria
        const foto = req.file.filename

        if(!nome){
            res.status(422).json({ message: 'O nome é obrigatório!' })
            return
        }

        if(!calorias){
            res.status(422).json({ message: 'As calorias é obrigatório!' })
            return
        }

        if(!carboidratos){
            res.status(422).json({ message: 'Os carboidratos é obrigatório!' })
            return
        }

        if(!proteinas){
            res.status(422).json({ message: 'As proteinas é obrigatório!' })
            return
        }

        if(!gorduras){
            res.status(422).json({ message: 'As gorduras é obrigatório!' })
            return
        }

        if(!quantidade){
            res.status(422).json({ message: 'A porção/quantidade é obrigatório!' })
            return
        }

        if(!categoria){
            res.status(422).json({ message: 'A categoria do alimento é obrigatório!' })
            return
        }

        if(!foto){
            res.status(422).json({ message: 'A foto do alimento é obrigatório!' })
            return
        }

        // create user
        const foods = new Foods({
            nome: nome,
            calorias: calorias,
            carboidratos: carboidratos,
            proteinas: proteinas,
            gorduras: gorduras,
            quantidade: quantidade,
            categoria: categoria,
            foto: foto,
        })

        try {
            const newFoods = await foods.save()
            res.status(201).json({ 
                message: 'Alimento cadastrado com sucesso!',
                data: newFoods
            })
        } catch (error) {
            Logger.error(`Erro ao criar o alimento no banco: ${error}`)
            res.status(500).json({ message: error })
        }
    }
}