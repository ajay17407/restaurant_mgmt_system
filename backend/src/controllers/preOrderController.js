import PreOrderItem from "../models/PreOrderItem.js";
import MenuItem from "../models/MenuItem.js";

export const createPreOrder = async(req,res) => {
    try{
        const {bookingId,menuItems}  = req.body;

        if (!bookingId || !Array.isArray(menuItems)) {
            return res.status(400).json({ error: 'bookingId and menuItems are required.' });
        }

        const validItems = await MenuItem.findAll({
            where: {
              id: menuItems.map(item => item.menuItemId),
            },
        });

        if (validItems.length !== menuItems.length) {
            return res.status(400).json({ error: 'Some menu items are invalid.' });
        }

        const createdItems = await Promise.all(
            menuItems.map(Item => 
                PreOrderItem.create({
                    bookingId,
                    menuItemId: Item.menuItemId,
                    quantity: Item.quantity || 1,
                })
            )
        );

        res.status(201).json({ message: 'Pre-order created', items: createdItems });
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({error:err.message});
    }
};

export const getPreOrdersByBooking = async(req,res) => {
    try{
        const {bookingId} = req.params;

        const PreOrders = await PreOrderItem.findAll({where:{bookingId},
            include:[
                {
                model: MenuItem,
                attributes: ['name','price'],
                },
            ],
        });

        res.status(200).json(PreOrders);
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({error:err.message});
    }
};

