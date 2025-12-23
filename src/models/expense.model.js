import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true
    },
    description: String,
    totalAmount: {
      type: Number,
      required: true
    },
    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    splitType: {
      type: String,
      enum: ["EQUAL", "EXACT", "PERCENT"],
      required: true
    },
    splits: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        amount: Number
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);
