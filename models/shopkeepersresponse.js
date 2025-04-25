import mongoose from 'mongoose';

const shopkeepersresponseschema = new mongoose.Schema({
    
    requestid: {type : mongoose.Schema.Types.ObjectId, ref : 'ProductRequest', required : true},
    shopkeeperid: {type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true},
    hasproduct: {type : Boolean, required : true},
    location: {
        type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
},
status: {
    type:String,
    enum:['Pending','Accepted'],
    default:'Pending'
}
},
{ timestamps : true});

const ShopkeepersResponse = mongoose.model('ShopkeepersResponse', shopkeepersresponseschema);
export default ShopkeepersResponse;