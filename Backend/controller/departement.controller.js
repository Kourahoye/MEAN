const departement = require('../model/departement');
const Departement = require('../model/departement');
const Etudiant = require('../model/etudiant')


const create = async (req,res)=>{
    let message = ""
   try{
    const dept = await Departement.create(req.body);
    res.send(dept)
   }catch(error){
    if(error.code === 11000)message += `\nErreur mongo: Le departement\n: "${error.keyValue.name}" existe déja`
    if(error.errors){
    if(error.errors.name.kind === "required") message += `\n Le champ ${error.errors.name.path} est requit`
    }
    res.send("Une erreur s'est produite" + message)
    console.log(error)
   }
    
}

const getAll = async (req,res)=>{
    const departements = await Departement.find();
    res.send(departements)
}

const getone = async (req,res)=>{
    try {
        const departement = await Departement.findOne(Departement.where("name",req.body.name));
        res.send(departement)
    } catch (error) {
        console.log(error)
    }
}


const update = async (req,res)=>{
    try{
        const dept = await Departement.updateOne(Departement.where("_id",req.body._id),req.body)
        res.send(dept)
    }catch(error){
        res.send("une erreur s'est produite")
        console.log(error)
    }
}
//pourquoi ca marche ?const dept = await Departement.deleteOne(Departement.where("nom",req.body.name))
const del = async (req,res)=>{
    try{
        const dept = await Departement.deleteOne(Departement.where("_id",req.body._id))
        const etudiant = await Etudiant.deleteMany(Departement.where("departement",req.body._id))
        let resp = {
            "etudiant":etudiant,
            "departement":dept
        }
        res.send(resp)
    }catch(error){
        res.send("une erreur s'est produite")
        console.log(error)
    }
}

module.exports = {
    create,
    getAll,
    update,
    del,
    getone
}