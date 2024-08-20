import { useState, useEffect } from 'react';
import { getGrants, submitFeedback } from '@/services/api';

export const useGrants = () => {
    const [grants, setGrants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGrants = async () => {
            try {
                const data = await getGrants();
                setGrants(data);
            } catch (err) {
                setError((err as any).message);
            } finally {
                setLoading(false);
            }
        };
        fetchGrants();
    }, []);

    const handleFeedbackSubmit = async (id: string, feedback: string, isPositive: boolean) => {
        try {
            await submitFeedback(id, feedback, isPositive);
            setGrants((prevGrants: any) =>
                prevGrants.map((grant: any) =>
                    grant.id === id
                        ? { ...grant, status: isPositive ? 'Accepted' : 'Rejected' }
                        : grant
                )
            );
        } catch (err) {
            setError((err as any).message);
        }
    };

    return { grants, loading, error, handleFeedbackSubmit };
};
