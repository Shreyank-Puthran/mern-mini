import Budget from "../models/budget.js";

export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user.id });
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createBudget = async (req, res) => {
  const { category, limit, month, type } = req.body;
  try {
    const newBudget = await Budget.create({
      userId: req.user.id,
      category,
      limit,
      month,
      type
    });
    res.status(201).json(newBudget);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateBudget = async (req, res) => {
  const { category, limit, month, type } = req.body;

  try {
    const updated = await Budget.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { category, limit, month, type },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Budget not found" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteBudget = async (req, res) => {
  try {
    await Budget.findByIdAndDelete(req.params.id);
    res.json({ message: "Budget deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
