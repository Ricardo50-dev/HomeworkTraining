import Training from '../models/Training.js';
import Group from '../models/Group.js'
import Exercise from '../models/Exercise.js'
import Exercises from '../models/Exercises.js'
import getToken from '../helpers/get-token.js';
import jwt from 'jsonwebtoken';
import Logger from "../config/logger.js";

export default class TrainingController {
    static async create_training(req, res) {
        let decoded

        if (req.headers.authorization) {
            const token = getToken(req)
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } else {
            res.status(403).json({ message: 'Você precisa estar logado!' })
        }

        const training = new Training({
            id_user: decoded.id,
        })

        try {
            const newTraining = await training.save()
            res.status(201).json({
                message: 'Treino criado com sucesso!',
                data: newTraining
            })
        } catch (error) {
            Logger.error(`Erro ao criar treino no banco: ${error}`)
            res.status(500).json({ message: error })
        }
    }

    static async create_group(req, res) {
        const data = req.body

        try {
            const newGroup = await Group.bulkCreate(data)
            res.status(201).json({
                message: 'Grupos de treino cadastrados com sucesso!',
                data: newGroup
            })
        } catch (error) {
            Logger.error(`Erro ao criar grupos de treino no banco: ${error}`)
            res.status(500).json({ message: error })
        }
    }

    static async create_exercise(req, res) {
        const data = req.body

        try {
            const newExercise = await Exercise.bulkCreate(data)
            res.status(201).json({
                message: 'Exercicios do grupo de treino cadastrados com sucesso!',
                data: newExercise
            })
        } catch (error) {
            Logger.error(`Erro ao criar exercicios do grupo de treino no banco: ${error}`)
            res.status(500).json({ message: error })
        }
    }

    static async create_exercises(req, res) {
        const nome = req.body.nome
        const categoria = req.body.categoria
        const descricao = req.body.descricao
        const gif = req.file.filename

        if (!nome) {
            res.status(422).json({ message: 'O nome é obrigatório!' })
            return
        }

        if (!categoria) {
            res.status(422).json({ message: 'A categoria do exercício é obrigatório!' })
            return
        }

        if (!descricao) {
            res.status(422).json({ message: 'A descrição do exercício é obrigatório!' })
            return
        }

        if (!gif) {
            res.status(422).json({ message: 'A foto/gif do exercício é obrigatório!' })
            return
        }

        // create user
        const exercises = new Exercises({
            nome: nome,
            categoria: categoria,
            descricao: descricao,
            gif: gif,
        })

        try {
            const newExercises = await exercises.save()
            res.status(201).json({
                message: 'Exercício cadastrado com sucesso!',
                data: newExercises
            })
        } catch (error) {
            Logger.error(`Erro ao criar o exercício no banco: ${error}`)
            res.status(500).json({ message: error })
        }
    }

    static async delete_exercise_by_id(req, res) {
        const id = req.params.id

        const exercise = await Exercise.findOne({ where: { id: id } })

        if (!exercise) {
            res.status(404).json({ message: 'Exercício do treino não encontrado!' })
            return
        }

        try {
            await Exercise.destroy({ where: { id: id } })
            res.status(200).json({ message: 'Exercício do treino removido com sucesso!' })
        } catch (error) {
            Logger.error(`Erro ao remover o exercício do treino no banco: ${error}`)
            res.status(500).json({ message: error })
        }
    }

    static async delete_training_by_id(req, res) {
        const id = req.params.id
        let decoded

        if (req.headers.authorization) {
            const token = getToken(req)
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } else {
            res.status(403).json({ message: 'Você precisa estar logado!' })
        }

        const training = await Training.findOne({ where: { id: id, id_user: decoded.id } })

        if (!training) {
            res.status(404).json({ message: 'Treino não encontrado!' })
            return
        }

        try {
            await Training.destroy({ where: { id: id } })
            res.status(200).json({ message: 'Treino deletado com sucesso!' })
        } catch (error) {
            Logger.error(`Erro ao deletar treino no banco: ${error}`)
            res.status(500).json({ message: error })
        }
    }

    static async edit_group(req, res) {
        const id = req.params.id
        const nome = req.body.nome
        const horario = req.body.horario
        const agrupamento = req.body.agrupamento

        try {
            const updateGroup = await Group.update(
                {
                    nome: nome,
                    horario: horario,
                    agrupamento: agrupamento,
                },
                {
                    where: { id: id },
                }
            )
            res.status(200).json({
                message: 'Grupo de treino atualizado com sucesso!',
                data: updateGroup,
            })
        } catch (error) {
            Logger.error(`Erro ao atualizar grupo de treino no banco: ${error}`)
            res.status(500).json({ message: error })
        }
    }

    static async edit_exercise(req, res) {
        const id = req.params.id
        const repet = req.body.repet

        try {
            const updateExercise = await Exercise.update(
                {
                    repet: repet,
                },
                {
                    where: { id: id },
                }
            )
            res.status(200).json({
                message: 'Exercício do grupo atualizado com sucesso!',
                data: updateExercise,
            })
        } catch (error) {
            Logger.error(`Erro ao atualizar exercício do grupo no banco: ${error}`)
            res.status(500).json({ message: error })
        }
    }

    static async edit_exercises(req, res) {
        const id = req.params.id
        const nome = req.body.nome
        const categoria = req.body.categoria
        const descricao = req.body.descricao       
        const gif = req.file ? req.file.filename : null

        if (!nome) {
            res.status(422).json({ message: 'O nome é obrigatório!' })
            return
        }

        if (!categoria) {
            res.status(422).json({ message: 'A categoria do exercício é obrigatório!' })
            return
        }

        if (!descricao) {
            res.status(422).json({ message: 'As descrição do exercício é obrigatória!' })
            return
        }

        const updateData = {
            nome: nome,
            categoria: categoria,
            descricao: descricao,
        }

        if (gif) {
            updateData.gif = gif
        }

        try {
            const updateExercises = await Exercises.update(updateData,
                {
                    where: { id: id },
                }
            )
            res.status(200).json({
                message: 'Exercício atualizado com sucesso!',
                data: updateExercises,
            })
        } catch (error) {
            Logger.error(`Erro ao atualizar exercício no banco: ${error}`)
            res.status(500).json({ message: error })
        }
    }

    static async get_training(req, res) {
        let decoded

        if (req.headers.authorization) {
            const token = getToken(req)
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } else {
            res.status(403).json({ message: 'Você precisa estar logado!' })
        }

        const training = await Training.findOne({ where: { id_user: decoded.id } })

        if (!training) {
            res.status(404).json({ message: 'Treino não encontrado!' })
            return
        }

        res.status(200).json({ training })
    }

    static async get_group(req, res) {
        let decoded

        if (req.headers.authorization) {
            const token = getToken(req)
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } else {
            res.status(403).json({ message: 'Você precisa estar logado!' })
        }

        const group = await Group.findAll({
            attributes: ['id', 'horario', 'nome', 'agrupamento'],
            include: [
                {
                    model: Training,
                    attributes: [], // não queremos nada da Dieta
                    where: {
                        id_user: decoded.id // substitua pela variável apropriada
                    }
                }
            ]
        });

        if (!group) {
            res.status(404).json({ message: 'Grupos de treino não encontrados!' })
            return
        }

        res.status(200).json({ group })
    }

    static async get_exercise(req, res) {
        let decoded

        if (req.headers.authorization) {
            const token = getToken(req)
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } else {
            res.status(403).json({ message: 'Você precisa estar logado!' })
        }

        const exercise = await Exercise.findAll({
            attributes: ['id_grupo', 'repet'],
            include: [
                {
                    model: Group,
                    required: true, // força INNER JOIN
                    attributes: [],
                    include: [
                        {
                            model: Training,
                            required: true,
                            attributes: [],
                            where: {
                                id_user: decoded.id, // substitua por seu valor
                            },
                        },
                    ],
                },
                {
                    model: Exercises,
                    required: true, // força INNER JOIN
                    as: 'exercicioDetalhes', // <- alias diferente
                    attributes: ['nome', 'categoria', 'descricao'],
                },
            ],
        });

        if (!exercise) {
            res.status(404).json({ message: 'Exercícios dos grupos de treino não encontrados!' })
            return
        }

        res.status(200).json({ exercise })
    }

    static async get_exercises(req, res) {
        const exercises = await Exercises.findAll({
            attributes: ['id', 'nome', 'categoria', 'descricao', 'gif'],
        });

        if (!exercises) {
            res.status(404).json({ message: 'Exercícios não encontrados!' })
            return
        }

        res.status(200).json({ exercises })
    }
}