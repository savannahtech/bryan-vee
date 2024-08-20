import mongoose, { Schema, Document } from 'mongoose';

export interface IGrant extends Document {
    foundationName: string;
    grantName: string;
    averageAmount: number;
    deadline: Date;
    location: string;
    areaOfFunding: string[];
    status: 'Applied' | 'Rejected' | 'Accepted';
    matchDate: Date;
    feedback?: string;
}

const GrantSchema: Schema = new Schema({
    foundationName: {
        type: String,
        required: true
    },
    grantName: {
        type: String,
        required: true
    },
    averageAmount: {
        type: Number,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    areaOfFunding: [{
        type: String
    }],
    status: {
        type: String,
        enum: ['Applied', 'Rejected', 'Accepted'],
        default: 'Applied'
    },
    matchDate: {
        type: Date,
        required: true
    },
    feedback: {
        type: String
    }
});

export default mongoose.model<IGrant>('Grant', GrantSchema);
