import Location from './../database/models/locations';
import mongoose from 'mongoose';

export default class LocationsController{
    static async createLocation (req, res){
        try {
            const {
                name,
                maleResidents,
                femaleResidents,
            } = req.body;

            const totalPopulation = maleResidents + femaleResidents;

            const newLocation = await new Location({
                _id: new mongoose.Types.ObjectId(),
                name,
                maleResidents,
                femaleResidents,
                totalPopulation,
            });

            const createdLocation = await newLocation.save();
            return res.status(201).json({
                message: 'Location created successfully',
                Location: createdLocation,
                });
        } catch (error) {
            console.log(error);
        }
    }

    static async listLocations (req, res){
        try {
            const allLocations = await Location.find({});
            return res.status(201).json({
                message: 'Location created successfully',
                allLocations,
                });
        } catch (error) {
            console.log(error);
        }
    }

    static async updateLocation (req, res){
        try {
            const currentLocationName = req.body.name;
            const paramsKey = Object.keys(req.body);
            const key = paramsKey[1];
            console.log('key',  key)
            const editableValue = req.body;
            const value = editableValue[key]
            const editParam = { $set: { [key]: value } }
            console.log('dididid', editParam);
            const updatedLocation = await Location.updateOne({ name: currentLocationName }, editParam );
            return res.status(200).json({
                message: 'Location updated successfully',
                Location: updatedLocation,
                });
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteLocation (req, res){
        try {
            
        } catch (error) {
            console.log(error);
        }
    }
}