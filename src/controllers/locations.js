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
                message: 'Locations fetched',
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
            const editableValue = req.body;
            const value = editableValue[key]
            const editParam = { $set: { [key]: value } }
            if (key === "maleResidents" || "femaleResident"){
                const currentLocation = await Location.findOne({name: currentLocationName});
                if (key === "maleResidents"){
                    const femaleResidents = currentLocation.femaleResidents;
                    const total = femaleResidents + value;
                    const updatedLocation = await Location.updateOne({ name: currentLocationName }, { $set: { [key]: value, totalPopulation: total } } );
                        return res.status(200).json({
                            message: 'Location updated successfully',
                            Location: updatedLocation,
                            });
                } else if(key === "femaleResidents") {
                    const maleResidents = currentLocation.maleResidents;
                    const total = maleResidents + value;
                    const updatedLocation = await Location.updateOne({ name: currentLocationName }, { $set: { [key]: value, totalPopulation: total } } );
                        return res.status(200).json({
                            message: 'Location updated successfully',
                            Location: updatedLocation,
                            });
                }
            }

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
            const locationName = req.body.name;
            const deletedLocation = await Location.deleteOne({name: locationName});
            return res.status(404).json({
                message: 'Location deleted successfully',
                Location: deletedLocation,
                });
        } catch (error) {
            console.log(error);
        }
    }
}