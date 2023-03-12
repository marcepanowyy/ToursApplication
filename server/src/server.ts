import express from "express";
import jwt from 'jsonwebtoken';
import {ToursModel} from "./schemas/tours";
import {UsersModel} from "./schemas/users";
import {OrdersModel} from "./schemas/orders";
import {initMongoConnection} from "./mongo-connection";
import cors from 'cors';
import {authAdmin} from "./auth/admin-auth";
import {Roles} from "./enums/roles";
import {authClient} from "./auth/client-auth";
import {ReviewsModel} from "./schemas/reviews";

const app = express()

app.use(express.json());
app.use(cors({origin:'http://localhost:4200'}))

const port = 8080;

// add new tour

app.post( "/tours",async  ( req, res ) => {

    try{
        const tourInstance =  new ToursModel(req.body)
        await tourInstance.save()
        res.status(201).send({message: "Added Tour"})

    }catch (err){
        res.status(500).send({message: "Internal server error"})
    }

} );

// add new user

app.post( "/register",async  ( req, res ) => {

    const userData =  req.body

    try{
        const user = await UsersModel.findOne({email: userData.email})

        if(user){
            res.status(400).send({message: "Email already exists"})
            return
        }

        const userInstance =  new UsersModel(req.body)
        await userInstance.save()
        let payload = {subject: userInstance._id}
        let token = jwt.sign(payload, 'secretKey', {expiresIn: "30min"})
        res.status(200).send({token, email: userInstance.email, role: userInstance.role, blocked: userInstance.blocked, _id: userInstance._id})

    }catch (err){
        res.status(500).send({message: "Internal server error"})
    }

});

// log in user

app.post( "/login",async  ( req, res ) => {

    const userData =  req.body

    try{
        const user = await UsersModel.findOne({email: userData.email})
        if(!user){
            res.status(400).send({message: "Wrong email or password"})
            return
        }
        if(user.password !== userData.password){
            res.status(400).send({message: "Wrong email or password"})
            return
        }
        let payload = {subject: user._id}
        let token = jwt.sign(payload, 'secretKey', {expiresIn: "30min"})
        res.status(200).send({token, email: user.email, role: user.role, blocked: user.blocked, _id: user._id})

    }catch (err){
        res.status(500).send({message: "Internal server error"})
    }

});

// add order (only client)

app.post( "/orders", authClient, async  ( req, res ) => {

    const data =  req.body

    try{
        const user = await UsersModel.findOne({email: data.email})
        if(!user){
            res.status(400).send({message: "User does not exist"})
            return
        }
        const tour = await ToursModel.findOne({_id: data.tourId})
        if(!tour){
            res.status(400).send({message: "Tour does not exist"})
            return
        }

        const orderInstance =  new OrdersModel({userId: user._id, tourId: tour._id, amount: data.amount, date: data.date})
        await orderInstance.save()
        res.status(200).send()

    }catch (err){
        res.status(500).send({message: "Internal server error"})
    }

});

// add review (only client)

app.post( "/reviews", authClient, async  ( req, res ) => {

    const data =  req.body

    try{
        const user = await UsersModel.findOne({_id: data.userId})
        if(!user){
            res.status(400).send({message: "User does not exist"})
            return
        }
        const tour = await ToursModel.findOne({_id: data.tourId})
        if(!tour){
            res.status(400).send({message: "Tour does not exist"})
            return
        }

        const reviewInstance =  new ReviewsModel({userId: data.userId, nickname: data.nickname, tourId: data.tourId, description: data.description, date: data.date})
        await reviewInstance.save()
        res.status(200).send()

    }catch (err:any){
        res.status(500).send({message: "Internal server error"})
    }

});

// refresh token (iat - czas wygenerowania tokenu, exp - czas wygasniecia tokenu)

app.post( "/token/refresh/", async  ( req, res ) => {

    try{

        if (!req.headers.authorization) return res.status(401).send({message: 'Unauthorized request'});

        const token = req.headers.authorization;
        if (token === 'null') return res.status(401).send({message: 'Unauthorized request'});

        let payload: any = jwt.decode(token);
        if (!payload) return res.status(401).send({message: 'Unauthorized request'});

        const user = await UsersModel.findOne({_id: payload.subject})

        if (!user) return res.status(401).send({message: 'Unauthorized request'})

        // console.log(user)
        // console.log(req.body)
        // console.log(req.body._id)

        if (user._id.toString() !== req.body._id) return res.status(401).send({message: 'Unauthorized request'})

        if(new Date(payload.exp * 1000) >= new Date()){
            let payload = {subject: user._id}
            let token = jwt.sign(payload, 'secretKey', {expiresIn: "30min"})
            res.status(200).send(token)
            return
        }

        res.status(200).send(token);
        return


    }catch (err: any){

        res.status(500).send({message: "Internal server error"})
    }

});

// get orders

app.get("/orders/:userId", async  ( req, res ) => {

    try{
        const user = await UsersModel.findOne({_id: req.params.userId})

        if(!user){
            res.status(400).send({message: "No such user!"})
            return
        }

        const orders = await OrdersModel.find({userId: user._id})
        res.status(200).send(orders);

    }catch (err){
        res.status(500).send({message: "Internal server error"})
    }

});

// ban user (only admin)

app.put( "/ban", authAdmin, async  ( req, res ) => {

    const userId =  req.body

    try{
        const user = await UsersModel.findOne({_id: userId})
        if(!user){
            res.status(400).send({message: "User does not exist"})
            return
        }

        user.blocked = true
        await user.save()
        res.status(204).send()

    }catch (err){
        res.status(500).send({message: "Internal server error"})
    }

});

// unban user (only admin)

app.put( "/unban", authAdmin, async  ( req, res ) => {

    const userId =  req.body

    try{
        const user = await UsersModel.findOne({_id: userId})
        if(!user){
            res.status(400).send({message: "User does not exist"})
            return
        }

        user.blocked = false
        await user.save()
        res.status(204).send()

    }catch (err){
        res.status(500).send({message: "Internal server error"})
    }

});

// change role (admin, manager, client) (only admin)

app.put( "/set/admin", authAdmin, async  ( req, res ) => {

    const userId =  req.body

    try{
        const user = await UsersModel.findOne({_id: userId})
        if(!user){
            res.status(400).send({message: "User does not exist"})
            return
        }

        user.role = Roles.admin
        await user.save()
        res.status(204).send()

    }catch (err){
        res.status(500).send({message: "Internal server error"})
    }

});

app.put( "/set/manager", authAdmin, async  ( req, res ) => {

    const userId =  req.body

    try{
        const user = await UsersModel.findOne({_id: userId})
        if(!user){
            res.status(400).send({message: "User does not exist"})
            return
        }

        user.role = Roles.manager
        await user.save()
        res.status(204).send()

    }catch (err){
        res.status(500).send({message: "Internal server error"})
    }

});

app.put( "/set/client", authAdmin, async  ( req, res ) => {

    const userId =  req.body

    try{
        const user = await UsersModel.findOne({_id: userId})
        if(!user){
            res.status(400).send({message: "User does not exist"})
            return
        }

        user.role = Roles.client
        await user.save()
        res.status(204).send()

    }catch (err){
        res.status(500).send({message: "Internal server error"})
    }

});

// get user lists (only admin)

app.get("/users", authAdmin,  async (req, res) => {

    try{
        const users = await UsersModel.find()
        res.send(users)

    }catch (err){
        res.status(500).send({message: "Internal server error"})
    }

})

// get tours

app.get("/tours", async (req, res) => {


    try{
        const tours = await ToursModel.find()
        res.send(tours)
    }catch (err){
        res.status(500).send({message: "Internal server error"})
    }

})


app.listen( port, async () => {                                  // nasluchiwanie na danym porcie
    await initMongoConnection()
    console.log( `server started at http://localhost:${port}` );
} );



