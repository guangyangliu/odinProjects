const { name } = require('ejs');
const pool = require('../db/pool');
const db = require('../db/querries');
const asyncHandler = require('express-async-handler');

const homeGet = asyncHandler(async(req, res) => {
    const category = await db.getCategory();
    const info = await db.getAllcarInfo();
    res.render('home', {category: category, info: info});
});


const getCategory = asyncHandler(async(req, res) => {
    const category = await db.getCategory();
    res.render('category', {category: category});
});

const getCarName = asyncHandler(async(req, res) => {
    const type = req.params.type;
    const name = await db.getCarName(type);
    res.render('name', {name: name});
});


//create
const createGet = asyncHandler(async(req,res) => {
    const form = req.params.form;
    if(form === "category"){
        res.render("category");
    }else if(form === "model"){
        res.render("model", {modelData: null});
    }else{
        res.render("create");
    }
});

const createCategoryPost = asyncHandler(async(req,res) => {
    const name = req.body.name;
    const type = req.body.type;
    const img = req.body.img;
    await db.createCategory(name, type,img);
    res.redirect('/')
});

//model
const createModelPost = asyncHandler(async(req, res) => {
    const {name, model, price, quantity} = req.body;
    await db.createModel(name, model, price, quantity);
    res.redirect('/')
})

const detailGet = asyncHandler(async(req, res) => {
    const name = req.params.name;
    
    const detail = await db.getDetail(name);
    const image = await db.getImg(name);
    res.render("detail", {detail: detail, image: image[0].image, name: name});
})

//edit
const editGet = asyncHandler(async(req, res) => {
    const name = req.query.name;
    const model = req.query.model;
    const modelData = await db.getModel(name, model);
    res.render("model", {modelData: modelData[0]});
})

//delete
const deleteGet = asyncHandler(async(req, res) => {
    const name = req.params.name;
    const model = req.params.model;
    await db.deleteModel(name, model);
    res.redirect('/detail/' + name);
})

const deleteCategoryGet = asyncHandler(async(req, res) => {
    const category = await db.getCategory();
    const name = await db.getAllCarName();
    res.render("delete", {category: category, name: name});
})

const deleteTypePost = asyncHandler(async(req, res) => {
    const type = req.body.type;
    await db.deleteType(type);
    res.redirect('/');
})

const deleteNamePost = asyncHandler(async(req,res) => {
    const name = req.body.name;
    await db.deleteName(name);
    res.redirect('/');
})



module.exports = {
    homeGet,
    getCategory,
    getCarName,
    createGet,
    createCategoryPost,
    createModelPost,
    detailGet,
    editGet,
    deleteGet,
    deleteCategoryGet,
    deleteTypePost,
    deleteNamePost
}
