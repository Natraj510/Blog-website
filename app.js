const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')
const methodOverride = require('method-override')
const create = require('./models/create')
const PORT = 5000

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'))



app.get('/',async(req,res) =>{
    const blogs = await create.find()
    res.render('index',{blogs:blogs})
})


app.get('/blog/new',(req,res) =>{
    res.render('new')
})

app.get('/blog/:id',async(req,res) =>{
    const blogs = await create.findById(req.params.id)
    res.render('blog',{blogs:blogs})
})

app.post('/blog/new',async(req,res) =>{

    const postData = await new create({
        title : req.body.title,
        author: req.body.author,
        description : req.body.description
    })
    const save = await postData.save()
    res.redirect('/')
})

app.get('/blog/edit/:id',async (req,res)=>{
    const blogs = await create.findById(req.params.id)
    res.render('edit',{blogs:blogs})
})

app.delete('/blog/delete/:id',async (req,res)=>{
    await create.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

app.put('/blog/edit/:id',async (req,res)=>{
    
    req.blog = await create.findById(req.params.id)
    let blog = req.blog
    blog.title = req.body.title
    blog.author = req.body.author
    blog.description = req.body.description

    await blog.save()
    res.redirect('/')
})


app.listen(PORT,()=>{
    console.log("Server connected");
})





mongoose.set('useNewUrlParser',true)
mongoose.set('useUnifiedTopology',true)
mongoose.connect(process.env.myDb,(err) =>{
    if(err){
        console.log("Database connection failed");
    }else{
        console.log("Database connected");
    }
})