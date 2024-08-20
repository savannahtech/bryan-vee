import { getGrants, getGrantById, createGrant, updateGrant, deleteGrant } from '../../services/grantService';
import { IGrant } from '../../models/Grant';

export const grantResolvers = {
    Query: {
        /**
         * Fetches all grants.
         * @returns {Promise<IGrant[]>} - A promise that resolves to an array of grants.
         */
        getGrants: async () => {
            try {
                return await getGrants();
            } catch (error) {
                console.error('Error fetching grants:', (error as Error).message);
                throw new Error('Failed to fetch grants. Please try again later.');
            }
        },

        /**
         * Fetches a grant by its ID.
         * @param {string} id - The ID of the grant to fetch.
         * @returns {Promise<IGrant | null>} - A promise that resolves to the grant or null if not found.
         */
        getGrant: async (_: unknown, { id }: { id: string }) => {
            try {
                const grant = await getGrantById(id);
                if (!grant) {
                    throw new Error('Grant not found');
                }
                return grant;
            } catch (error) {
                console.error(`Error fetching grant with ID ${id}:`, (error as Error).message);
                throw new Error('Failed to fetch the grant. Please try again later.');
            }
        },
    },

    Mutation: {
        /**
         * Creates a new grant.
         * @param {Partial<IGrant>} grantInput - The input data for the new grant.
         * @returns {Promise<IGrant>} - A promise that resolves to the created grant.
         */
        createGrant: async (_: unknown, { grantInput }: { grantInput: Partial<IGrant> }) => {
            try {
                return await createGrant(grantInput);
            } catch (error) {
                console.error('Error creating grant:', (error as Error).message);
                throw new Error('Failed to create grant. Please try again later.');
            }
        },

        /**
         * Updates an existing grant by its ID.
         * @param {string} id - The ID of the grant to update.
         * @param {Partial<IGrant>} grantInput - The updated data for the grant.
         * @returns {Promise<IGrant | null>} - A promise that resolves to the updated grant or null if not found.
         */
        updateGrant: async (_: unknown, { id, grantInput }: { id: string, grantInput: Partial<IGrant> }) => {
            try {
                const updatedGrant = await updateGrant(id, grantInput);
                if (!updatedGrant) {
                    throw new Error('Grant not found');
                }
                return updatedGrant;
            } catch (error) {
                console.error(`Error updating grant with ID ${id}:`, (error as Error).message);
                throw new Error('Failed to update grant. Please try again later.');
            }
        },

        /**
         * Deletes a grant by its ID.
         * @param {string} id - The ID of the grant to delete.
         * @returns {Promise<boolean>} - A promise that resolves to true if the deletion was successful.
         */
        deleteGrant: async (_: unknown, { id }: { id: string }) => {
            try {
                const deletionSuccess = await deleteGrant(id);
                if (!deletionSuccess) {
                    throw new Error('Grant not found or could not be deleted');
                }
                return true;
            } catch (error) {
                console.error(`Error deleting grant with ID ${id}:`, (error as Error).message);
                throw new Error('Failed to delete grant. Please try again later.');
            }
        },

        /**
         * Submits feedback for a grant.
         * @param {string} id - The ID of the grant to update.
         * @param {string} feedback - The feedback for the grant.
         * @param {"Applied" | "Rejected" | "Accepted"} status - The status of the grant.
         * @returns {Promise<IGrant>} - A promise that resolves to the updated grant with feedback.
         */
        submitFeedback: async (_: unknown, { id, feedback, status }: { id: string; feedback: string; status: "Applied" | "Rejected" | "Accepted" }) => {
            try {
                const grant = await getGrantById(id);
                if (!grant) {
                    throw new Error('Grant not found');
                }

                grant.feedback = feedback;
                grant.status = status;

                const updatedGrant = await updateGrant(id, grant);
                if (!updatedGrant) {
                    throw new Error('Failed to update grant with feedback');
                }

                return updatedGrant;
            } catch (error) {
                console.error(`Error submitting feedback for grant with ID ${id}:`, (error as Error).message);
                throw new Error('Failed to submit feedback. Please try again later.');
            }
        },
    },
};
