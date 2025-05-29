import MenuItem from '../models/MenuItem.js';

export const createMenuItem = async(req,res) => {
    try{
        const item = await MenuItem.create(req.body);
        res.status(201).json(item);
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({message:"couldn't create MenuItem"});
    }
};

export const getAllMenuItems = async(req,res) => {
    try{
        const items = await MenuItem.findAll();
        res.status(200).json(items);
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({message:"couldn't fetch all the items"});
    }
};



