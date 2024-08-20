import { createGrant, getGrants, getGrantById } from '../services/grantService';
import {IGrant} from '../models/Grant';

describe('Grant Service', () => {
    it('should create a new grant', async () => {
        const grantData: Partial<IGrant> = {
            foundationName: 'Test Foundation',
            grantName: 'Test Grant',
            averageAmount: 50000,
            deadline: new Date(),
            location: 'Test City',
            areaOfFunding: ['Test Area'],
            status: 'Applied',
            matchDate: new Date(),
        };

        const grant = await createGrant(grantData);
        expect(grant).toHaveProperty('_id');
        expect(grant.foundationName).toBe('Test Foundation');
    });

    it('should get all grants', async () => {
        const grants = await getGrants();
        expect(grants).toBeInstanceOf(Array);
    });

    it('should get a grant by ID', async () => {
        const grantData: Partial<IGrant> = {
            foundationName: 'Test Foundation',
            grantName: 'Test Grant',
            averageAmount: 50000,
            deadline: new Date(),
            location: 'Test City',
            areaOfFunding: ['Test Area'],
            status: 'Applied',
            matchDate: new Date(),
        };

        const createdGrant = await createGrant(grantData);
        const foundGrant = await getGrantById(createdGrant._id);
        expect(foundGrant).not.toBeNull();
        expect(foundGrant?.foundationName).toBe('Test Foundation');
    });
});
