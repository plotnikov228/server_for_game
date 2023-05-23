import db from'../db.js';
import mongoose from "mongoose";
import md5 from 'md5'
import Player from "../models/player.js";
import User from "../models/user.js";


class PlayerController {
    async initPlayer (req, res) {
        try {
            const {user_name} = req.params
            const user = await User.findOne({name: user_name})
            if(user) {
            let player = await Player.findOne({user_id: user._id})
            if (!player){
               player = await Player.create({user_id: user._id, experience: 1, level: 1})     
        }
        return res.json(player)
    } else {
        return res.json({message: "user with this id not exist", status: false})
    }
        } catch (e) {
            res.status(500).json({ message: e.toString(), status: false })
        }
    }
    async getPlayers (req, res) {
        try {
            const players = await Player.find();
            return res.json(players);
        } catch (e) {
            res.status(500).json({ message: e.toString(), status: false })
        }
    }

    async playerUpdate (req, res) {
        try {
            const player = await req.body
            const updatedPlayer = await Player.findByIdAndUpdate(player._id, player, {new: true});
            Player.updateOne()
            return res.json(updatedPlayer)
        } catch (e) {
            res.status(500).json({ message: e.toString(), status:false})
        }
    }

    async playerDelete (req, res) {
        try {
            const {user_name} = req.params;
            const player = await Player.findOne({name: user_name});
            if(player){
            await Player.findOneAndDelete({_id: player._id});
            res.json({ message: 'player was deleted', status: true });}
            else {
                res.json({ message: 'player not found', status: false })
            }
        } catch (e) {
            res.status(500).json({message: e.toString(), status:false})
        }
    }
}

export default new PlayerController();

