import Grant, { IGrant } from '../models/Grant';
import mongoose from 'mongoose';

export const getGrants = async (): Promise<IGrant[]> => {
    try {
        return await Grant.find();
    } catch (error) {
        console.error('Error fetching grants:', (error as Error).message);
        throw new Error('Failed to fetch grants. Please try again later.');
    }
};

export const getGrantById = async (id: string): Promise<IGrant | null> => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error(`Invalid ID format: ${id}`);
        throw new Error('Invalid grant ID format.');
    }

    try {
        const grant = await Grant.findById(id);
        if (!grant) {
            console.error(`Grant not found with ID: ${id}`);
            throw new Error('Grant not found.');
        }
        return grant;
    } catch (error) {
        console.error(`Error fetching grant with ID ${id}:`, (error as Error).message);
        throw new Error('Failed to fetch grant. Please try again later.');
    }
};

export const createGrant = async (grantData: Partial<IGrant>): Promise<IGrant> => {
    try {
        const grant = new Grant(grantData);
        return await grant.save();
    } catch (error) {
        console.error('Error creating grant:', (error as Error).message);
        throw new Error('Failed to create grant. Please try again later.');
    }
};

export const updateGrant = async (id: string, grantData: Partial<IGrant>): Promise<IGrant | null> => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error(`Invalid ID format: ${id}`);
        throw new Error('Invalid grant ID format.');
    }

    try {
        const updatedGrant = await Grant.findByIdAndUpdate(id, grantData, { new: true });
        if (!updatedGrant) {
            console.error(`Grant not found with ID: ${id}`);
            throw new Error('Grant not found.');
        }
        return updatedGrant;
    } catch (error) {
        console.error(`Error updating grant with ID ${id}:`, (error as Error).message);
        throw new Error('Failed to update grant. Please try again later.');
    }
};

export const deleteGrant = async (id: string): Promise<IGrant | null> => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error(`Invalid ID format: ${id}`);
        throw new Error('Invalid grant ID format.');
    }

    try {
        const deletedGrant = await Grant.findByIdAndDelete(id);
        if (!deletedGrant) {
            console.error(`Grant not found with ID: ${id}`);
            throw new Error('Grant not found.');
        }
        return deletedGrant;
    } catch (error) {
        console.error(`Error deleting grant with ID ${id}:`, (error as Error).message);
        throw new Error('Failed to delete grant. Please try again later.');
    }
};
