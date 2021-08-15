import { Router } from "express";
import Joi, { string } from 'joi';
import UserModel from "../models/users.model";

const router = Router();

//Trae todos los usuarios almacenados en la DB
router.get('/users', async (req, res) => {

    try {

        const users = await UserModel.find();
        return res.json(users);

    } catch (error) {

        console.log(error);
    }
});

//Trae un usuario almacenado en la DB a traves del Object ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) res.status(404).send('El usuario no fue encontrado');
        return res.json(user);

    } catch (error) {
        console.log(error);

    }
});

//Trae un usuario almacenado en la DB a traves del IdUser
/* router.get('/users', async (req, res) => {
    try {
        const user = await UserModel.find({"idUser": parseInt(req.query.idUser as any)});
        return res.json(user);

    } catch (error) {
        console.log(error);

    }
}); */

router.post('/users', async (req, res) => {

    try {
         let id_autoIncrement = await UserModel.estimatedDocumentCount();

        const { error, value } = validateUser(id_autoIncrement+1, req.body.name, req.body.email);

        if (error) {
            res.status(400).send(`${error}`);
            return;
        }

        const newUser = new UserModel(value);
        await newUser.save();
        return res.json(newUser);

    } catch (error) {
        console.log(error);
    }

});

//Actualizacion a traves del parametro idUser
/* router.put('/users/:id', async (req, res) => {

    const resp = await UserModel.updateOne({ idUser: parseInt(req.params.id) }, req.body);

    res.json(resp);
});
 */

//Actualizacion a traves del parametro Object ID
router.put('/users/:id', async (req, res) => {

    const usuario = await UserModel.findByIdAndUpdate(req.params.id, req.body,{new: true});

    res.json({
        "Usuario Actualizado": usuario
    });
});

//Eliminacion a traves del parametro Object ID
router.delete('/users/:id', async (req, res) => {

    const usuario = await UserModel.findByIdAndDelete(req.params.id);

    res.json({
        "Usuario Eliminado": usuario
    });
});

//Funcion para validar el usuario
function validateUser(id: number, nom: string, email: string) {

    const schema = Joi.object({
        idUser: Joi.number(),
        name: Joi.string()
            .min(3)
            .max(30)
            .required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    });

    return schema.validate({ idUser: id, name: nom, email: email });
}


export default router;