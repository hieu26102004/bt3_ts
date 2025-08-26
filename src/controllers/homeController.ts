// import db from '../models/index';

import { Request, Response } from 'express';

//hàm getHomePage
const getHomePage = async (req: Request, res: Response) => {
    const { getService } = require('../services/serviceLoader');
    const CRUDService = getService();
    try {
        let data = await CRUDService.getAllUsers();
        return res.render('homepage.ejs',{
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
}


const getAboutPage = (req: Request, res: Response) => {
    return res.render('about.ejs');
}

const getCRUD = (req: Request, res: Response) => {
    return res.render('crud.ejs');
}

const getFindAllCrud = async (req: Request, res: Response) => {
    const { getService } = require('../services/serviceLoader');
    const CRUDService = getService();
    let data = await CRUDService.getAllUsers();
    return res.render('findAllUser.ejs', {
        datalist: data
    });
}

const postCRUD = async (req: Request, res: Response) => {
    const { getService } = require('../services/serviceLoader');
    const CRUDService = getService();
    let message = await CRUDService.createNewUser(req.body);
    return res.send('Post crud to server');
}

const getEditCRUD = async (req: Request, res: Response) => {
    const { getService } = require('../services/serviceLoader');
    const CRUDService = getService();
    let userId = req.query.id;
    if(userId){
        let userData = await CRUDService.getUserInfoById(userId);
        return res.render('editUser.ejs',{
            data: userData
        });
    }else{
        return res.send('không lấy được id');
    }
}

const putCRUD = async (req: Request, res: Response) => {
    const { getService } = require('../services/serviceLoader');
    const CRUDService = getService();
    let data = req.body;
    let data1 = await CRUDService.updateUser(data);
    return res.render('findAllUser.ejs',{
        datalist: data1
    });
}

const deleteCRUD = async (req: Request, res: Response) => {
    const { getService } = require('../services/serviceLoader');
    const CRUDService = getService();
    let id = req.query.id;
    if(id){
        await CRUDService.deleteUserById(id);
        return res.send('Deleted!!!!!!!!!!!!');
    }else{
        return res.send('Not find user')
    }
}

// object: {
//     key: '',
//     value: ''
// }

export default {
    getHomePage,
    getAboutPage,
    getCRUD,
    postCRUD,
    getFindAllCrud,
    getEditCRUD,
    putCRUD,
    deleteCRUD
};
