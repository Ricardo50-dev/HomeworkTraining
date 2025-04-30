import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import createUserToken from '../helpers/create-user-token.js';
import getToken from '../helpers/get-token.js';
import jwt from 'jsonwebtoken';
import getUserByToken from '../helpers/get-user-by-token.js'
import Logger from "../config/logger.js";

export default class UserController {
    static async register(req, res) {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const confirmpassword = req.body.confirmpassword

        // validations
        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório!' })
            return
        }

        if (!email) {
            res.status(422).json({ message: 'O e-mail é obrigatório!' })
            return
        }

        if (!password) {
            res.status(422).json({ message: 'A senha é obrigatória!' })
            return
        }

        if (!confirmpassword) {
            res.status(422).json({ message: 'A confirmação de senha é obrigatória!' })
            return
        }

        if (password != confirmpassword) {
            res
                .status(422)
                .json({ message: 'A senha e a confirmação precisam ser iguais!' })
            return
        }

        // check if user exists
        const userExists = await User.findOne({ where: { email: email } })

        if (userExists) {
            res.status(422).json({ message: 'Por favor, utilize outro e-mail. Este já foi cadastrado!' })
            return
        }

        // create password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        // create user
        const user = new User({
            email: email,
            senha: passwordHash,
            nome: name,
        })

        try {
            const newUser = await user.save()

            await createUserToken(newUser, req, res)
        } catch (error) {
            Logger.error(`Erro ao criar user no banco: ${error}`)
            res.status(500).json({ message: error })
        }
    }

    static async login(req, res) {
        const email = req.body.email
        const password = req.body.password

        if (!email) {
            res.status(422).json({ message: 'O e-mail é obrigatório!' })
            return
        }

        if (!password) {
            res.status(422).json({ message: 'A senha é obrigatória!' })
            return
        }

        // check if user exists
        const user = await User.findOne({ where: { email: email } })

        if (!user) {
            return res
                .status(422)
                .json({ message: 'Não há usuário cadastrado com este e-mail!' })
        }

        // check if password match
        const checkPassword = await bcrypt.compare(password, user.senha)

        if (!checkPassword) {
            return res.status(422).json({ message: 'Senha inválida' })
        }

        await createUserToken(user, req, res)
    }

    static async checkUser(req, res) {
        let currentUser

        if (req.headers.authorization) {
            const token = getToken(req)
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            currentUser = await User.findOne({ where: { email: decoded.id } })
            currentUser.senha = undefined
        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }

    static async getUserById(req, res) {
        const id = req.params.id

        const user = await User.findOne({ where: { email: id } })
        user.senha = undefined

        if (!user) {
            res.status(422).json({ message: 'Usuário não encontrado!' })
            return
        }

        res.status(200).json({ user })
    }

    static async editUser(req, res) {
        const token = getToken(req)

        //console.log(token);

        const user = await getUserByToken(token)

        // console.log(user);
        // console.log(req.body)
        // console.log(req.file.filename)

        const nome = req.body.nome
        const peso = req.body.peso
        const altura = req.body.altura
        const idade = req.body.idade
        const genero = req.body.genero
        const objetivo = req.body.objetivo
        const pratica = req.body.pratica
        let imc = ''
        let gc = ''
        let tmb = ''

        let image = ''

        if (req.file) {
            image = req.file.filename
        }

        // validations
        if (!nome) {
            res.status(422).json({ message: 'O nome é obrigatório!' })
            return
        }

        user.nome = nome

        if (image) {
            const imageName = req.file.filename
            user.imagem = imageName
        }

        if(peso && altura){
            imc = (parseFloat(peso)/parseFloat(altura**2)).toFixed(1);
            user.imc = imc
        }

        if(genero == 'Masculino' && peso && altura && idade){
            tmb = Math.round(66 + (13.7 * parseFloat(peso)) + (5 * (parseFloat(altura) * 100)) - (6.8 * parseFloat(idade)));
            gc = Math.round(tmb * 1.9);
            user.gc = gc
        }else if(genero == 'Feminino' && peso && altura && idade){
            tmb = Math.round(665 + (9.6 * parseFloat(peso)) + (1.8 * (parseFloat(altura)) * 100) - (4.7 * parseFloat(idade)));
            gc = Math.round(tmb * 1.9);
            user.gc = gc
        }

        user.peso = peso
        user.altura = altura
        user.idade = idade
        user.genero = genero
        user.objetivo = objetivo
        user.pratica = pratica

        try {
            // returns updated data
            // const updatedUser = await User.findOneAndUpdate(
            //     { email: req.params.email },
            //     { $set: user },
            //     { new: true },
            // )
            const updateUser = await User.update(
                { 
                  nome: user.nome,
                  peso: user.peso,
                  altura: user.altura,
                  idade: user.idade,
                  genero: user.genero,
                  imc: user.imc,
                  gc: user.gc,
                  objetivo: user.objetivo,
                  pratica: user.pratica,
                  imagem: user.imagem,
                },
                {
                  where: { email: user.email }, // IMPORTANTE: Atualiza pelo id do usuário
                }
              )
            res.json({
                message: 'Usuário atualizado com sucesso!',
                data: updateUser,
            })
        } catch (error) {
            Logger.error(`Erro ao atualizar user no banco: ${error}`)
            res.status(500).json({ message: error })
        }
    }
}