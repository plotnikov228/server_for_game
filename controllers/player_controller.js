import db from'../db.js';
import mongoose from "mongoose";
import md5 from 'md5'
import Player from "../models/player.js";
import User from "../models/user.js";


class PlayerController {
    async initPlayer (req, res) {
        try {
            const {user_id} = req.params
            const user = await User.findOne({_id: user_id})
            if(user) {
            let player = await Player.findOne({user_id: user_id})
            if (!player){
               player = await Player.create({user_id: user_id, experience: 1, level: 1})     
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
            const {user_id} = req.params;
            const player = await Player.findOne({user_id: user_id});
            if(player){
            await Player.findOneAndDelete({user_id: user_id});
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

