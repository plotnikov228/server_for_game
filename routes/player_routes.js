import Router from 'express'
import PlayerController from '../controllers/player_controller.js'
import Player from "../models/player.js";

const playerRoutes = new Router()


playerRoutes.post('/init/:user_name', PlayerController.initPlayer)
playerRoutes.get('/players', PlayerController.getPlayers)
playerRoutes.put('/update', PlayerController.playerUpdate)
playerRoutes.delete('/delete/:user_name',  PlayerController.playerDelete)

export default playerRoutes