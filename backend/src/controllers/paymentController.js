export const mockPayment = async(req,res) => {

    const {bookingId,amount} = req.body;

    res.status(200).json({message:'Payment Successfull',bookingId,amount});
}