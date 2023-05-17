import db from'../db.js';
import mongoose from "mongoose";
import md5 from 'md5'
import User from "../models/user.js";

class UserController {
    async createUser (req, res) {
        try {
            const {name, mail} = req.body
            let {password} = req.body
            const user = await User.findOne().where('mail').equals(mail)
            if (user){
                return res.json( {message: 'user with this email exist', status: false} )
            }  else if (password.length > 8 && password.length < 26 && name.length < 20)  {
                if (!isEmailValid(mail)){
                    return res.json( {message: 'invalid mail format', status: false} )   
                } else{
                password = md5(password)
                await User.create({name, mail, password})
            return res.json({ status: true })}
            } else {
                return res.json({ message: 'bad request', status: false })
        }
        } catch (e) {
            res.status(500).json({ message: e.toString(), status: false })
        }
    }
    async getUsers (req, res) {
        try {
            const users = await User.find();
            return res.json(users);
        } catch (e) {
            res.status(500).json({ message: 'wrong data', status: false })
        }
    }
    async auth (req, res) {
        try {
            let {mail, password} = req.body;
            password = md5(password);
            const user = await User.findOne().where('mail').equals(mail)
            if(user){
            if(user.mail === mail && user.password === password){
                return res.json({ status: true, id: user._id });
            } else {
                return res.json({ message: 'wrong mail or password', status: false });
            }} else {
                return res.json({ message: 'user is not exist', status: false });
            }
            
        } catch (e) {
            res.status(500).json({ message: 'error', status: false })
        }
    }

    async updateUser (req, res) {
        try {
        const user = req.body
        user.password = md5(user.password)
        const currentUser = await User.findOne({mail: user.mail})
        if (currentUser){
        const userForUpdate = JSON.parse(JSON.stringify({_id: currentUser._id, name: user.name,mail:  user.mail, password: user.password, __v: currentUser.__v}))
        const newUser = await User.findOneAndUpdate({mail: user.mail}, userForUpdate, {new: true});
        return res.json({ message: "user was updated", status:true})
    } else {
            return res.json({ message: "user is not exist", status:false})
        }
        } catch (e) {
            res.status(500).json({ message: e.toString(), status:false})
        }
    }

    async deleteUser (req, res) {
        try {
            const {mail, password} = req.body;
            const user = await User.findOne({mail: mail})
            if(user) {
                if(mail == user.mail && md5(password) == user.password) {
                await User.findOneAndDelete({mail: mail})
                res.json({ message: 'user was deleted', status: true })
            } else {
                    res.json({ message: 'incorect data', status: true })
                } 
                
            } else {
                res.json({ message: 'user not found', status: false })
            }
            
        } catch (e) {
            res.status(500).json({message: e.toString(), status:false})
        }
    }
}
var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
function isEmailValid(email) {
    if (!email)
        return false;

    if(email.length>254)
        return false;

    var valid = emailRegex.test(email);
    if(!valid)
        return false;

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if(parts[0].length>64)
        return false;

    var domainParts = parts[1].split(".");
    if(domainParts.some(function(part) { return part.length>63; }))
        return false;

    return true;
}

export default new UserController();

