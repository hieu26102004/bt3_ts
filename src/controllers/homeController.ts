import db from '../models/index';
import { getService } from '../services/serviceLoader';
const CRUDService = getService();
import { Request, Response } from 'express';

//hàm getHomePage
const getHomePage = async (req: Request, res: Response) => {
    try {
        let data = await db.User.findAll(); //lấy dữ liệu từ models/index
        console.log('.........................');
        console.log(data);
        console.log('.........................');
        return res.render('homepage.ejs',{
            data: JSON.stringify(data) //trả dữ liệu data về view
        });
    } catch (e) {
        console.log(e);
    }
}

//hàm getAbout
const getAboutPage = (req: Request, res: Response) => {
    return res.render('about.ejs');
}
//hàm CRUD
const getCRUD = (req: Request, res: Response) => {
    return res.render('crud.ejs');
}

//hàm findAll CRUD
const getFindAllCrud = async (req: Request, res: Response) => {
    let data = await CRUDService.getAllUsers();
    // console.log('---------------------------');
    // console.log(data);
    // console.log('---------------------------');
    //return res.send('FindAll crud to server');
    return res.render('findAllUser.ejs', {
        datalist: data
    }); //gọi view và truyền dữ liệu ra view
}

//hàm post CRUD
const postCRUD = async (req: Request, res: Response) => {
    let message = await CRUDService.createNewUser(req.body); //gọi service
    //console.log(req.body); //lấy thông tin body của http request
    console.log(message);
    return res.send('Post crud to server');
}
//hàm lấy dữ liệu để edit
const getEditCRUD = async (req: Request, res: Response) => {
    let userId = req.query.id;
    if(userId){ //check Id
        let userData = await CRUDService.getUserInfoById(userId);
        // console.log('---------------------');
        console.log(userData);
        // console.log('---------------------');
        return res.render('editUser.ejs',{
            data: userData
        });
    }else{
        return res.send('không lấy được id');
    }
    // console.log(req.query.id);
}

const putCRUD = async (req: Request, res: Response) => {
    let data = req.body;
    let data1 = await CRUDService.updateUser(data); //update rồi hiện thị lại danh sách user
    //let data1 = await CRUDService.getAllUser(); //hiện thị danh sách user
    return res.render('findAllUser.ejs',{
        datalist: data1
    });
    // return res.send('update thành công');
}

const deleteCRUD = async (req: Request, res: Response) => {
    let id = req.query.id; // vì trên view ?id=1
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
