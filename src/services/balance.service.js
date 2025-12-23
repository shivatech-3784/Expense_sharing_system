import Balance from "../models/balance.model.js";

const updateBalance = async (fromUser, toUser, amount, groupId) => {
    if (!fromUser || !toUser) return;
  const reverse = await Balance.findOne({
    fromUser: toUser,
    toUser: fromUser,
    groupId
  });

  if (reverse) {
    if (reverse.amount > amount) {
      reverse.amount -= amount;
      await reverse.save();
    } else if (reverse.amount < amount) {
      await Balance.create({
        fromUser,
        toUser,
        amount: amount - reverse.amount,
        groupId
      });
      await reverse.deleteOne();
    } else {
      await reverse.deleteOne();
    }
  } else {
    await Balance.create({ fromUser, toUser, amount, groupId });
  }
};

export { updateBalance };
