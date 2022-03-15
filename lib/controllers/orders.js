const { Router } = require('express');
const Order = require('../models/Order');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res) => {
    const response = await Order.insert({
      product: req.body.product,
      quantity: req.body.quantity,
    });
    res.send(response);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const order = await Order.getById(req.params.id);
      res.send(order);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .get('/', async (req, res) => {
    const response = await Order.getAll();
    res.send(response);
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await Order.updateById(id, {
        product: req.body.product,
        quantity: req.body.quantity,
      });

      if (!response) {
        const error = new Error(`Order ${id} not found`);
        error.status = 404;
        throw error;
      }

      res.send(response);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
    const order = await Order.deleteById(req.params.id);
    res.send(order);
  });
