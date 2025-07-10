import shopkeepersResponse from '../models/shopkeepersresponse.js';
export const createResponse = async (req, res) => {
    try {
        const {requestid, hasproduct} = req.body;

        if (
            !req.user?.location?.coordinates ||
            req.user.location.coordinates.length !== 2
          ) {
            return res.status(400).json({ message: "Please provide your location!" });
          }
          
          const [lng, lat] = req.user.location.coordinates;
          
        const newResponse = new shopkeepersResponse({
            requestid,
            shopkeeperid: req.user._id,
            hasproduct,
            location: {
                type: "Point",
                coordinates:[lng, lat]
            }
        });

        await newResponse.save();

        const io = req.app?.get('io'); 
        if (io) {
            io.to(requestid.toString()).emit('newResponse', {
                message: "A shopkeeper has responded!",
                response: newResponse
            });
        }

        res.status(201).json({message: "Response created!", response: newResponse});
    }catch(error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const getResponses = async (req, res) => {
    try {
        const responses = await shopkeepersResponse.find();
        res.status(200).json(responses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const getResponsesByRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const responses = await shopkeepersResponse.find({ requestid: requestId });
        res.status(200).json(responses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const acceptResponse = async (req, res) => {
    try {
        const { responseId } = req.params;
        const response = await shopkeepersResponse.findById(responseId);

        if (!response) {
            return res.status(404).json({ message: "Response not found!" });
        }

        response.status = "Accepted";
        await response.save();

        res.status(200).json({ message: "Response accepted and request marked as accepted", response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}