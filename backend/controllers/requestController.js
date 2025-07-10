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
        //const {latitude, longitude} = req.query;
    const userLocation = req.user.location;

    if (!userLocation || !userLocation.coordinates) {
      return res.status(400).json({ message: "User location not available" });
    }

    const [longitude, latitude] = userLocation.coordinates;
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

export const getMyRequests = async (req, res) => {
    try {
      const requests = await ProductRequest.find({ buyerid: req.user._id });
      res.status(200).json({ requests });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


// added the delete request function

export const deleteRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await ProductRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found!" });
    }

    if (request.buyerid.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this request." });
    }

    await ProductRequest.findByIdAndDelete(requestId); // ✅ This works

    res.status(200).json({ message: "Request deleted successfully." });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: error.message });
  }
};

  