import { Schema, model } from "mongoose";

const projectSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        shapes: {
            type: [Schema.Types.Mixed],
            default: [],
        },
    },
    { timestamps: true }
);

export const Project = model("Project", projectSchema);
