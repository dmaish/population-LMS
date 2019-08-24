import request from 'supertest';
import app from '../app';
import Location from './../database/models/locations';

const getDefaultLocationForCreation = () => ([{
    name: 'valeria',
    maleResidents: 10,
    femaleResidents: 10,
    totalPopulation: 20,
    },
    {
        name: 'kings landing',
        maleResidents: 15,
        femaleResidents: 10,
        totalPopulation: 25,
        }
    ]);

describe ('GET /Locations', () => {
    beforeEach((async () => {
        const app = await createApp();
        server = await app.listen(testPort);
        }));
    
        afterEach((async () => {
        await server.close();
        await clearDatabase();
        }));

    it('get all locations', (done) => {
        const location = new Location ({ ...getDefaultLocationForCreation()})
        await location.save();
        request(app)
            .get('/api/v1/locations/listLocations')
            .set('Accept', 'application/json')

            .expect(200, done);
    });
});