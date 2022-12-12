// carregando modulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser= require('body-parser')
const app = express()
const admin= require('./routes/admin')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')

// Configurações
    // Sessão
        app.use(session({
            secret: "session",
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash())
    // Midlaware
        app.use((req, res, next)=>{
            res.locals.success_msg = req.flash("success_msg")
            res.locals.error_msg = req.flash("error_msg")
            next()
        })    
    // body parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    // Handlebars
    app.engine('handlebars', handlebars.engine({defaultLayout:'main'}))
    app.set('view engine', 'handlebars')
    // Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/blogapp').then(()=>{
        console.log("Conectado ao Mongo")
    }).catch((err)=>{
        console.log("Erro ao se conectar:"+err)
    })
    // Public
    app.use(express.static(path.join(__dirname,"public")))
    // o '__dirname' serve pra eu pegar o arquivo absoluto do public, ou seja o caminho de onde ele está vindo

    
// Rotas
    app.use('/admin',admin)
    // aqui eu uso o prefixo '/admin' para quando eu quiser acessar minhas páginas de um arquivo que contém um grupo de rotas
    
// Configurando Porta
const PORT= 8081
app.listen(PORT,()=>{
    console.log("servidor rodando!")
})
