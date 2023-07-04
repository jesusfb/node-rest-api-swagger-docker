import { Schema, model } from 'mongoose';
import { IToken } from '../interfaces';

const tokenSchema = new Schema<IToken>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "user"},
    token: {type: String,  required: true},
    createdAt: {type: Date, required: true, default: Date.now, expires: 900},
});

const Token = model<IToken>('Token', tokenSchema);

export default Token;
