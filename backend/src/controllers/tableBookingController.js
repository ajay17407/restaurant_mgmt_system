import TableBooking  from "../models/TableBooking.js";
import PreOrderItem from "../models/PreOrderItem.js";
import MenuItem from "../models/MenuItem.js";


export const createBooking = async(req,res) => {
    try{
        const { name, phone, date, time, partySize, seatingPreference } = req.body;
        const userId = req.user.id;

        const existingBooking = await TableBooking.findOne({where:{date,time}});

        if(existingBooking) {
            return res.status(401).json({message:"Selected slot is already booked , Please choose another time"});
        }

        const newBooking = await TableBooking.create({
            name,
            phone,
            date,
            time,
            partySize,
            seatingPreference,
            userId
        });

        res.status(201).json({message:"booking successfull" , booking : newBooking});
    }
    catch(err)
    {
        res.status(500).json({message:"error creating booking"});
        console.error("unable to create new booking",err);
    }
};

export const updateBooking = async(req,res) => {
    const {id} = req.params;
    const userId = req.user.id;

    try{
        const booking = await TableBooking.findOne({where:{id,userId}});

        if(!booking)
        {
            return res.status(404).json({message:"Booking not found"});
        }

        await booking.update(req.body);
        res.status(200).json({message:"Booking updated",booking});
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({message:"Update failed"});
    }
};

export const cancelBooking = async(req,res) => {
    const {id} = req.params;
    const userId = req.user.id;

    try{
        const booking = await TableBooking.findOne({where:{id,userId}});

        if(!booking)
        {
            return res.status(404).json({message:"Booking not found"});
        }

        booking.status = "cancelled";
        await booking.save();

        const io = req.app.get('io');
        io.emit('bookingCancelled',{
            bookingId : booking.id
        });


        return res.status(200).json({message:"Booking delted successfully"});
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({message:"Cancellation failed"});
    }
};



export const getBookingSummary = async(req,res) => {
    try{
        const { bookingId } = req.params;

        const booking  = await TableBooking.findByPk(bookingId);
        if(!booking) return res.status(404).json({message:"Booking not found"});

        const preOrders  = await PreOrderItem.findAll({
            where:{bookingId},
            include: {
                model: MenuItem,
                attributes: ['name','price']
            }
        });

        const items = preOrders.map((item) => ({
            name: item.MenuItem.name,
            quantity: item.quantity,
            price: item.MenuItem.price,
            subtotal: item.quantity*item.MenuItem.price
        }));

        const total = items.reduce((sum,item) => {
            return sum + item.subtotal
        },0);

        res.status(200).json({
            bookingDetails: {
                date: booking.date,
                time: booking.time,
                partySize: booking.partySize,
                status: booking.status
            },
            items,
            total
        });
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({error:err.message});
    }
};