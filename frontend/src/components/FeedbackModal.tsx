import React, { useState } from 'react';

interface FeedbackModalProps {
    onSubmit: (feedback: string) => void;
    onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ onSubmit, onClose }: FeedbackModalProps) => {
    const [feedback, setFeedback] = useState('');

    const handleSubmit = () => {
        onSubmit(feedback);
        setFeedback('');
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Submit Your Feedback</h2>
                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Enter your feedback here"
                    className="w-full p-2 border rounded-lg mb-4"
                />
                <div className="flex justify-end gap-2">
                    <button
                        onClick={handleSubmit}
                        className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-all duration-300">
                        Submit
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-all duration-300">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeedbackModal;
