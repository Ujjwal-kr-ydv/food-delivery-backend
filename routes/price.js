const express = require('express');
const router = express.Router();
const PriceCalculator = require('../services/PriceCalculator');
const Pricing = require('../models/Pricing');


/**
 * @swagger
 * /api/price/calculate-price:
 *   post:
 *     summary: Calculate delivery price
 *     description: Calculate the total price for the delivery of the specified food items in the given zone for the particular organization.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               zone:
 *                 type: string
 *               organization_id:
 *                 type: string
 *               total_distance:
 *                 type: number
 *               item_type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_price:
 *                   type: number
 */
router.post('/calculate-price', async (req, res) => {
  try {
    const { zone, organization_id, total_distance, item_type } = req.body;

    //Enable for  database

    // const pricing = await Pricing.findOne({
    //   where: {
    //     organization_id,
    //     zone,
    //     item_id: item_type,
    //   },
    // });

    //Hard code logic
    let pricing = {}
    if (item_type === "perishable") {
        
        pricing = {
            organization_id: organization_id,
            item_id: zone,
            base_distance_in_km: 5,
            km_price: 1.5,
            fix_price: 10
        }
    }else{
        pricing = {
            organization_id: organization_id,
            item_id: zone,
            base_distance_in_km: 5,
            km_price: 1,
            fix_price: 10
        }
    }


    if (!pricing) {
      return res.status(404).json({ error: 'Pricing not found' });
    }

    const totalPrice = PriceCalculator.calculatePrice(
      pricing.base_distance_in_km,
      total_distance,
      pricing.km_price,
      pricing.fix_price
    );

    return res.json({ total_price: totalPrice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Pricing:
 *       type: object
 *       properties:
 *         organization_id:
 *           type: string
 *         item_id:
 *           type: string
 *         zone:
 *           type: string
 *         base_distance_in_km:
 *           type: integer
 *         km_price:
 *           type: number
 *         fix_price:
 *           type: integer
 */

/**
 * @swagger
 * tags:
 *   name: Pricing
 *   description: API endpoints for managing pricing
 */

/**
 * @swagger
 * /api/price/pricing:
 *   post:
 *     summary: Create new pricing
 *     tags: [Pricing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pricing'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pricing'
 *       '500':
 *         description: Internal server error
 */
router.post('/pricing', async (req, res) => {
  try {
    //Enable for  database
    // const pricing = await Pricing.create(req.body);
    // res.status(201).json(pricing);
    // Dummy
    res.status(201).json(req.body);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/price/pricing:
 *   get:
 *     summary: Get pricing details (Dummy value), (add db connect for real data)
 *     tags: [Pricing]
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pricing'
 *       '404':
 *         description: Pricing not found
 *       '500':
 *         description: Internal server error
 */
router.get('/pricing', async (req, res) => {
  try {
    //Enable for  database
    // const { organization_id, zone, item_type } = req.query;
    // const pricing = await Pricing.findOne({
    //   where: {
    //     organization_id,
    //     zone,
    //     item_id: item_type,
    //   },
    // });

    // if (!pricing) {
    //   return res.status(404).json({ error: 'Pricing not found' });
    // }

    const pricing = { id: "01", type: "perishable", description: "dummyItem"}

    res.json(pricing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/price/pricing/{id}:
 *   put:
 *     summary: Update pricing details
 *     tags: [Pricing]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Pricing ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pricing'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pricing'
 *       '404':
 *         description: Pricing not found
 *       '500':
 *         description: Internal server error
 */
router.put('/pricing/:id', async (req, res) => {
  try {
    //Enable for  database
    // const pricing = await Pricing.findByPk(req.params.id);
    // if (!pricing) {
    //   return res.status(404).json({ error: 'Pricing not found' });
    // }

    //await pricing.update(req.body);
    res.json(req.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/price/pricing/{id}:
 *   delete:
 *     summary: Delete pricing
 *     tags: [Pricing]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Pricing ID
 *     responses:
 *
*/

router.delete('/pricing/:id', async (req, res) => {
    try {
      // const pricing = await Pricing.findByPk(req.params.id);
      // if (!pricing) {
      //   return res.status(404).json({ error: 'Pricing not found' });
      // }
  
      //await pricing.delete(req.body);

      res.status(200).json( {message :`item ${res.body} deleted` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
