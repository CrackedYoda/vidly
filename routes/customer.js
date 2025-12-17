import express from "express";
import { validateCustomerMiddleware } from "../middleware/validationFactory.js";
import { Customers } from "../models/customer.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const customers = await Customers.find()
      .sort("name")
      .select({ name: 1, _id: 0 });
    res.send(customers);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const customer = await Customers.findById(req.params.id)
      .select({ name: 1, _id: 0 });
    
    if (!customer) {
      return res.status(404).send("Customer not found");
    }
    
    res.send(customer);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", validateCustomerMiddleware, async (req, res) => {
  try {
    const existingCustomer = await Customers.findOne({ phone: req.validatedData.phone });
    
    if (existingCustomer) {
      return res.status(400).send("Customer with this phone already exists");
    }

    const newCustomer = new Customers({
      name: req.validatedData.name,
      phone: req.validatedData.phone,
      isGold: req.validatedData.isGold || false
    });

    await newCustomer.save();
    res.send(newCustomer);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:id", validateCustomerMiddleware, async (req, res) => {
  try {
    const customer = await Customers.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.validatedData.name,
          phone: req.validatedData.phone,
          isGold: req.validatedData.isGold
        }
      },
      { new: true }
    );

    if (!customer) {
      return res.status(404).send("Customer not found");
    }

    res.send(customer);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customers.findByIdAndDelete(req.params.id);
    
    if (!customer) {
      return res.status(404).send("Customer not found");
    }

    res.send("Customer deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
