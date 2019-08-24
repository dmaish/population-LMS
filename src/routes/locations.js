import express from 'express';
import LocationsController from './../controllers/locations';

const router = express.Router();

router.post(
    '/createLocation',
    LocationsController.createLocation,
);

router.get(
    '/listLocations',
    LocationsController.listLocations,
);

router.patch(
    '/updateLocation',
    LocationsController.updateLocation,
);

router.delete(
    '/deleteLocation',
    LocationsController.deleteLocation,
);

export default router;