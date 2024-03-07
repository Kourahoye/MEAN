const Etudiant = require('../model/etudiant')


const create = async (req,res)=>{
    let message = ""
   try{
    const etudiant = await Etudiant.create(req.body);
    res.send(etudiant)
   }catch(error){
    if(error.code === 11000)message += `\n Erreur base de donnée: Le matricule: "${error.keyValue.matricule}" existe déja`
    if(error.errors){
    if(error.errors.name.kind === "required") message += `\n Le champ ${error.errors.name.path} est requit`
    }
    res.send("Une erreur s'est produite " + message)
    console.log(error)
   }
}

const getAll = async (req,res)=>{
    try{
        const etudiants = await Etudiant.find().populate('departement');
        res.send(etudiants)
    }catch(error){
        console.log(error)
    }
}

const getone = async (req,res)=>{
    try {
        const etudiants = await Etudiant.findOne(Etudiant.where("matricule",req.body.matricule)).populate('departement');
        res.send(etudiants)
    } catch (error) {
        console.log(error)
    }
}

const update = async (req,res)=>{
    try{
        const dept = await Etudiant.updateOne(Etudiant.where("matricule",req.body.matricule),req.body)
        res.send(dept)
    }catch(error){
        res.send("une erreur s'est produite")
        console.log(error)
    }
}
const del = async (req,res)=>{
    try{
        const dept = await Etudiant.deleteOne(Etudiant.where("matricule",req.body.matricule))
        res.send(dept)
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