import TableBooking from "../models/TableBooking.js";
import PreOrderItem from "../models/PreOrderItem.js";
import MenuItem from "../models/MenuItem.js";

export const getUserDashboard = async(req,res) => {
    try{
        const userId = req.user.id;

        const bookings = await TableBooking.findAll({
            where:{userId},
            include: [
                {
                    model: PreOrderItem,
                    include: [{model:MenuItem,attributes:['name','price']}]
                }
            ],
            order: [['createdAt','DESC']],
        });

        res.status(200).json(bookings);

    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({error:err.message});
    }
};

