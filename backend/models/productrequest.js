import mongoose from "mongoose";

const productrequestschema = new mongoose.Schema({
    buyerid: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productname: { type: String, required: true },
    productquantity: { type: Number, required: true },
    status: { type: String, enum: ["Searching", "Results"], default: "Searching" },
    location: {
        type: { type: String, enum: ["Point"], default: "Point", required: true },
        coordinates: { type: [Number], required: true }
    }
}, { timestamps: true });

productrequestschema.index({ location: "2dsphere" });

const ProductRequest = mongoose.model("ProductRequest", productrequestschema);
export default ProductRequest;
