import mongoose, { Schema, Document } from "mongoose";

export enum Plan {
  Starter = "Starter",
  Professional = "Professional",
  Enterprise = "Enterprise",
}

export enum SubscriptionStatus {
  Active = "active",
  Trialing = "trialing",
  Canceled = "canceled",
  Incomplete = "incomplete",
  PastDue = "past_due",
  Unpaid = "unpaid",
}

export interface IUser extends Document {
  email: string;
  password: string;
  plan: Plan;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  subscriptionStatus?: SubscriptionStatus;
  currentPeriodEnd?: Date; // When the subscription renews
  projectsUsed: number;
  projectLimit: number;
  trialEndsAt?: Date;
  isTrial: boolean;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },

    plan: {
      type: String,
      enum: Object.values(Plan),
      default: Plan.Starter,
    },

    stripeCustomerId: { type: String },
    stripeSubscriptionId: { type: String },

    subscriptionStatus: {
      type: String,
      enum: Object.values(SubscriptionStatus),
      default: SubscriptionStatus.Active,
    },

    currentPeriodEnd: { type: Date },

    projectsUsed: { type: Number, default: 0 },

    projectLimit: {
      type: Number,
      default: function () {
        switch (this.plan) {
          case Plan.Starter:
            return 5;
          case Plan.Professional:
            return 9999; // practically unlimited
          case Plan.Enterprise:
            return 99999; // enterprise custom
          default:
            return 5;
        }
      },
    },

    trialEndsAt: { type: Date },
    isTrial: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Automatically update project limit if plan changes
userSchema.pre("save", function (next) {
  if (this.isModified("plan")) {
    switch (this.plan) {
      case Plan.Starter:
        this.projectLimit = 5;
        break;
      case Plan.Professional:
        this.projectLimit = 9999;
        break;
      case Plan.Enterprise:
        this.projectLimit = 99999;
        break;
      default:
        this.projectLimit = 5;
    }
  }
  next();
});

export const User = mongoose.model<IUser>("User", userSchema);
