import User from "../models/User.js";
import TableBooking from "../models/TableBooking.js";
import PreOrderItem from "../models/PreOrderItem.js";
import MenuItem from "../models/MenuItem.js";

export const getAdminDashboard = async(req,res) => {
    try{
        const bookings = await TableBooking.findAll({
            include: [
                {model:PreOrderItem,include:[MenuItem]},
                {model:User,attributes:['id','email']}
            ],
            order: [['createdAt','DESC']],
        });

        res.status(200).json({bookings});
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({error:err.message});
    }
};

export const changeBookingStatus = async(req,res) => {
    const {id} = req.params;
    const {status} = req.body;

    if (!['confirmed', 'cancelled'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }

    try {
        const booking = await TableBooking.findByPk(id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
    
        booking.status = status;
        await booking.save();

        const io = req.app.get('io');
        io.emit('bookingStatusUpdate',{
            bookingId : booking.id,
            newStatus: status,
        });
    
        res.status(200).json({ message: `Booking ${status}` });
    }
    catch (err) {
        res.status(500).json({ message: 'Status update failed', error: err.message });
    }
};

export const makeUserAdmin = async(req,res) => {
    const {userId} = req.params;

    try{
        const user = await User.findByPk(userId);
        if(!user) return res.status(404).json({message:"User not found"});

        user.isAdmin = true;
        await user.save();

        res.status(200).json({message:`${user.name} is now an admin.`});
    }
    catch(err)
    {
        res.status(500).json({message:"Failed to promote user",error: err.message});
    }
};

export const updatePreOrderStatus = async(req,res) => {
    try{
        const {preOrderItemId} = req.params;
        const {status} = req.body;
        const io = req.app.get('io');

        const item = await PreOrderItem.findByPk(preOrderItemId);
        if(!item) return res.status(404).json({message:'item not found'});

        item.status = status;
        await item.save();

        io.emit('statusUpdate',{
            itemId: item.id,
            newStatus: status,
        });

        res.status(200).json({message:'status updated',item});
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({error:err.message});
    }
};


export const updateMenuItem = async(req,res) => {
    try{
        const item = await MenuItem.findByPk(req.params.id);
        if(!item) return res.status(404).json({message:'Item not found'});

        await item.update(req.body);
        res.status(200).json({item});
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({message:"couldn't update Menu Item"});
    }
};

export const deleteMenuItem = async(req,res) => {
    try{
        const item = await MenuItem.findByPk(req.params.id);
        if(!item) return res.status(404).json({message:"item not found"});

        await item.destroy();
        res.status(204).send();
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({message:"item couldn't be deleted"});
    }
};