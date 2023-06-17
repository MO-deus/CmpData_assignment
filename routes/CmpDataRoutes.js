
const express = require("express");
const router = express.Router();
const { GetCmpData, CreateCmpdata, GetCmpData_byId, UpdateCmpData_byId,
    DeleteCmpData_byId,GetTotalAmount,GetTotalSales,PercSales,GetMonthlySales } = require("../Controllers/CmpDataController")

// since the routes [/api/contacts/]  aare same for the requests they can be written in the same line
// fetching contacts
// creating contact
router.route('/cmp_data').get(GetCmpData).post(CreateCmpdata)

// API questions : 
router.route('/total_items').get(GetTotalAmount);
router.route('/nth_most_total_item').get(GetTotalSales);
router.route('/percentage_of_department_wise_sold_items').get(PercSales);
router.route('/monthly_sales').get(GetMonthlySales);

// gettin contact for particular id
// updating contact for a id
// delete contact with id
router.route('/:id').get(GetCmpData_byId).delete(DeleteCmpData_byId).put(UpdateCmpData_byId);

module.exports = router;