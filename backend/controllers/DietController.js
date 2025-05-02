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
            res.status(403).json({ message: 'Você precisa estar logado!' })
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

        if (!nome) {
            res.status(422).json({ message: 'O nome é obrigatório!' })
            return
        }

        if (!calorias) {
            res.status(422).json({ message: 'As calorias é obrigatório!' })
            return
        }

        if (!carboidratos) {
            res.status(422).json({ message: 'Os carboidratos é obrigatório!' })
            return
        }

        if (!proteinas) {
            res.status(422).json({ message: 'As proteinas é obrigatório!' })
            return
        }

        if (!gorduras) {
            res.status(422).json({ message: 'As gorduras é obrigatório!' })
            return
        }

        if (!quantidade) {
            res.status(422).json({ message: 'A porção/quantidade é obrigatório!' })
            return
        }

        if (!categoria) {
            res.status(422).json({ message: 'A categoria do alimento é obrigatório!' })
            return
        }

        if (!foto) {
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

    static async delete_food_by_id(req, res) {
        const id = req.params.id

        const food = await Food.findOne({ where: { id: id } })

        if (!food) {
            res.status(404).json({ message: 'Alimento da refeição não encontrado!' })
            return
        }

        try {
            await Food.destroy({ where: { id: id } })
            res.status(200).json({ message: 'Alimento da refeição removido com sucesso!' })
        } catch (error) {
            Logger.error(`Erro ao remover o alimento da refeição no banco: ${error}`)
            res.status(500).json({ message: error })
        }
    }

    static async delete_diet_by_id(req, res) {
        const id = req.params.id
        let decoded

        if (req.headers.authorization) {
            const token = getToken(req)
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } else {
            res.status(403).json({ message: 'Você precisa estar logado!' })
        }

        const diet = await Diet.findOne({ where: { id: id, id_user: decoded.id } })

        if (!diet) {
            res.status(404).json({ message: 'Dieta não encontrada!' })
            return
        }

        try {
            await Diet.destroy({ where: { id: id } })
            res.status(200).json({ message: 'Dieta deletada com sucesso!' })
        } catch (error) {
            Logger.error(`Erro ao deletar dieta no banco: ${error}`)
            res.status(500).json({ message: error })
        }
    }

    static async edit_snack(req, res) {
        const id = req.params.id
        const nome = req.body.nome
        const horario = req.body.horario
        const calorias = req.body.calorias
        const proteinas = req.body.proteinas
        const carboidratos = req.body.carboidratos
        const gorduras = req.body.gorduras

        try {
            const updateSnack = await Snack.update(
                {
                    nome: nome,
                    horario: horario,
                    calorias: calorias,
                    proteinas: proteinas,
                    carboidratos: carboidratos,
                    gorduras: gorduras,
                },
                {
                    where: { id: id },
                }
            )
            res.status(200).json({
                message: 'Refeição atualizada com sucesso!',
                data: updateSnack,
            })
        } catch (error) {
            Logger.error(`Erro ao atualizar refeição no banco: ${error}`)
            res.status(500).json({ message: error })
        }
    }

    static async edit_food(req, res) {
        const id = req.params.id
        const porcao = req.body.porcao

        try {
            const updateFood = await Food.update(
                {
                    porcao: porcao,
                },
                {
                    where: { id: id },
                }
            )
            res.status(200).json({
                message: 'Alimento da refeição atualizado com sucesso!',
                data: updateFood,
            })
        } catch (error) {
            Logger.error(`Erro ao atualizar alimento da refeição no banco: ${error}`)
            res.status(500).json({ message: error })
        }
    }

    static async edit_foods(req, res) {
        const id = req.params.id
        const nome = req.body.nome
        const calorias = req.body.calorias
        const carboidratos = req.body.carboidratos
        const proteinas = req.body.proteinas
        const gorduras = req.body.gorduras
        const quantidade = req.body.quantidade
        const categoria = req.body.categoria
        const foto = req.file ? req.file.filename : null

        if (!nome) {
            res.status(422).json({ message: 'O nome é obrigatório!' })
            return
        }

        if (!calorias) {
            res.status(422).json({ message: 'As calorias é obrigatório!' })
            return
        }

        if (!carboidratos) {
            res.status(422).json({ message: 'Os carboidratos é obrigatório!' })
            return
        }

        if (!proteinas) {
            res.status(422).json({ message: 'As proteinas é obrigatório!' })
            return
        }

        if (!gorduras) {
            res.status(422).json({ message: 'As gorduras é obrigatório!' })
            return
        }

        if (!quantidade) {
            res.status(422).json({ message: 'A porção/quantidade é obrigatório!' })
            return
        }

        if (!categoria) {
            res.status(422).json({ message: 'A categoria do alimento é obrigatório!' })
            return
        }

        const updateData = {
            nome: nome,
            calorias: calorias,
            carboidratos: carboidratos,
            proteinas: proteinas,
            gorduras: gorduras,
            quantidade: quantidade,
            categoria: categoria,
        }

        if (foto) {
            updateData.foto = foto
        }

        try {
            const updateFoods = await Foods.update(updateData,
                {
                    where: { id: id },
                }
            )
            res.status(200).json({
                message: 'Alimento atualizado com sucesso!',
                data: updateFoods,
            })
        } catch (error) {
            Logger.error(`Erro ao atualizar alimento no banco: ${error}`)
            res.status(500).json({ message: error })
        }
    }

    static async get_diet(req, res) {
        let decoded

        if (req.headers.authorization) {
            const token = getToken(req)
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } else {
            res.status(403).json({ message: 'Você precisa estar logado!' })
        }

        const diet = await Diet.findOne({ where: { id_user: decoded.id } })

        if (!diet) {
            res.status(404).json({ message: 'Dieta não encontrada!' })
            return
        }

        res.status(200).json({ diet })
    }

    static async get_snacks(req, res) {
        let decoded

        if (req.headers.authorization) {
            const token = getToken(req)
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } else {
            res.status(403).json({ message: 'Você precisa estar logado!' })
        }

        const snacks = await Snack.findAll({
            attributes: ['id', 'horario', 'nome', 'calorias', 'proteinas', 'carboidratos', 'gorduras'],
            include: [
                {
                    model: Diet,
                    attributes: [], // não queremos nada da Dieta
                    where: {
                        id_user: decoded.id // substitua pela variável apropriada
                    }
                }
            ]
        });

        if (!snacks) {
            res.status(404).json({ message: 'Refeições não encontradas!' })
            return
        }

        res.status(200).json({ snacks })
    }

    static async get_food(req, res) {
        let decoded

        if (req.headers.authorization) {
            const token = getToken(req)
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } else {
            res.status(403).json({ message: 'Você precisa estar logado!' })
        }

        const food = await Food.findAll({
            attributes: ['id_refeicao', 'porcao'],
            include: [
                {
                    model: Snack,
                    required: true, // força INNER JOIN
                    attributes: [],
                    include: [
                        {
                            model: Diet,
                            required: true,
                            attributes: [],
                            where: {
                                id_user: decoded.id, // substitua por seu valor
                            },
                        },
                    ],
                },
                {
                    model: Foods,
                    required: true, // força INNER JOIN
                    as: 'alimentoDetalhes', // <- alias diferente
                    attributes: ['nome', 'calorias', 'carboidratos', 'proteinas', 'gorduras', 'quantidade'],
                },
            ],
        });

        if (!food) {
            res.status(404).json({ message: 'Alimentos das refeições não encontrados!' })
            return
        }

        res.status(200).json({ food })
    }

    static async get_foods(req, res) {
        const foods = await Foods.findAll({
            attributes: ['id', 'nome', 'calorias', 'carboidratos', 'proteinas', 'gorduras', 'quantidade', 'categoria', 'foto'],
        });

        if (!foods) {
            res.status(404).json({ message: 'Alimentos não encontrados!' })
            return
        }

        res.status(200).json({ foods })
    }
}