import ProductRequest from "../models/productrequest.js";
export const createRequest = async (req, res) => {
    try {
        const {productname, productquantity, price, status} = req.body;
        const newRequest = new ProductRequest({
            buyerid: req.user._id,
            productname,
            productquantity, 
            location: {
                type: "Point",
                coordinates: [req.body.longitude, req.body.latitude]
            }
        });

        await newRequest.save();
        res.status(201).json({message: "Product Request created!",request : newRequest});
    }catch(error) {
    res.status(500).json({message: error.message});
}
};

export const getNearRequests = async (req, res) => {
    try
    {
        const {latitude, longitude} = req.query;
        const requests = await ProductRequest.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance:5000
                }
            },
            status: "Searching"
        });
        res.status(200).json({requests});
    }catch(error){
        res.status(500).json({message: error.message});
    }
};