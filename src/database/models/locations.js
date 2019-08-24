import mongoose from 'mongoose';

const LocationsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    femaleResidents: { type: Number, required: true },
    maleResidents: { type: Number, required: true },
    totalPopulation: { type: Number, required: true }
});

export default mongoose.model('User', LocationsSchema);
