// express : async handler - handles all the async functions
const asyncHandler = require('express-async-handler')
const DB_access = require("../Models/CmpDataModel")

// @desc : Get contact
// @route : GET /api/contacts
// @access : public
const GetCmpData = asyncHandler(async (req, res) => {
  const op = await DB_access.find();
  if(!op){
    res.status(404)
    process.exit(1);
  }
  res.send(op);
});

const GetMonthlySales = asyncHandler(async (req, res) => {

  const op = await DB_access.find();
  
  if(!op){
    res.status(404)
    process.exit(1);
  }

  const prm_year = req.query.year;
  const prm_product = req.query.product; 
  var arr = [];

  for (let i=0; i < 12; i++) {
    arr.push(0);
  }  

  for(var i in op){
    var date = new Date(op[i].date);
    if(op[i].software == prm_product && date.getFullYear() == prm_year){
      arr[date.getMonth()-1] += op[i].seats;
    }
  }

  res.json(arr);
});

const PercSales = asyncHandler(async (req, res) => {

  const op = await DB_access.aggregate(
    [
      {
        $group:
        {
            _id: { department: "$department" },
            totval: { $sum: "$seats" }
        }
      }
    ]);

    var totalseats = 0;
    var msg = [];
    for(var i in op){
      totalseats += op[i].totval;
    }
    for(var i in op){
      msg[i] = op[i]._id.department + " : " + (op[i].totval * 100)/totalseats;
    }

    res.status(200).json(msg);


});

const GetTotalSales = asyncHandler(async (req, res) => {

  const n = req.query.n;
  const item_by = req.query.item_by;

  const GET_op = await DB_access.find();
  let map_seats = new Map()
    map_seats["Zapier"] = 0;
    map_seats["Teams"] = 0;
    map_seats["Sentry"] = 0;
    map_seats["Google"] = 0;
    map_seats["Notion"] = 0;
    map_seats["Apple"] = 0;
    map_seats["Figma"] = 0;
    map_seats["Discord"] = 0;
    map_seats["Height"] = 0;
    map_seats["Slack"] = 0;
    map_seats["Github"] = 0;
    map_seats["Zoho"] = 0;
    map_seats["Fullstory"] = 0;
    map_seats["Appolo"] = 0;
    map_seats["Outplay"] = 0;
    map_seats["Circleci"] = 0;



    // quantity = seats
  for(var i in GET_op){
    var ldate = new Date(GET_op[i].date); 
    if( ldate.getMonth() >= 10){
      // console.log(GET_op[i].software);
        map_seats[GET_op[i].software] += GET_op[i].seats;
      }
    }
    
    // amount = price
    let map_amount =new Map()
    map_amount["Zapier"] = 0;
    map_amount["Teams"] = 0;
    map_amount["Sentry"] = 0;
    map_amount["Google"] = 0;
    map_amount["Notion"] = 0;
    map_amount["Apple"] = 0;
    map_amount["Figma"] = 0;
    map_amount["Discord"] = 0;
    map_amount["Height"] = 0;
    map_amount["Slack"] = 0;
    map_amount["Github"] = 0;
    map_amount["Zoho"] = 0;
    map_amount["Fullstory"] = 0;
    map_amount["Appolo"] = 0;
    map_amount["Outplay"] = 0;
    map_amount["Circleci"] = 0;
  
      // quantity = seats
    for(var i in GET_op){
      var ldate = new Date(GET_op[i].date); 
      if( ldate.getMonth() >= 10){
          map_amount[GET_op[i].software] += GET_op[i].amount;
        }
      }
      
      // res.status(200).json(map_seats[1] ,map_amount[3]);
      var cmp_name = [], total = [];
      for(var i=0; i<16; i++){
        
        cmp_name[i] = "";
      }
      
      var tmp_1 = 0, cmp_1 = "";
      for(var i in map_seats){
        

      }
      console.log(tmp_1, cmp_1);

      var tmp_2 = 0, cmp_2 = "";
      for(var i in map_amount){
        if(tmp_2 <= map_amount[i]){
          cmp_2 = i;
          tmp_2 = map_amount[i];
        }
      }
      console.log(tmp_2, cmp_2);
  
      var msg = "By seats: "+cmp_1+ "-" + tmp_1 +" "+ " By amount: " +cmp_2+"-"+tmp_2;
      // var msg = "OK";

  res.status(200).json(msg);
});


const GetTotalAmount = asyncHandler(async (req, res) => {

  const dept = req.query.department;
  const GET_op = await DB_access.find({
    department: dept
  });

  var tot_cost = 0;

  for(var i in GET_op){
    var ldate = new Date(GET_op[i].date); 
    if( ldate.getMonth() >= 9 && ldate.getMonth() <= 12)
      tot_cost += GET_op[i].seats;
      
  }
  res.status(200).json(tot_cost);
});

// @desc : Create a new contact
// @route : POST /api/contacts
// @access : public
const CreateCmpdata = asyncHandler(async (req, res) => {
  console.log("Requested body is : ", req.body);

  const { id,
    date,
    department,
    software,
    seats,
    amount } = req.body;
  // const data = await DB_access.find({id : Nid});

  if (!id ||
    !date ||
    !department ||
    !software ||
    !seats ||
    !amount ) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const entry = await DB_access.create({
    id,
    date,
    department,
    software,
    seats,
    amount
  });

  res.status(201).json(entry);
});

// @desc : get a contact by id
// @route : GET /api/contacts/:id
// @access : public
const GetCmpData_byId = asyncHandler(async (req, res) => {
  const entry = await DB_access.findById(req.params.id);

  if(!entry){
    res.status(404);
    throw new Error("entry not found in DB");
  }
  
  res.status(202).json(entry);
});

// @desc : Update a contact
// @route : PUT /api/contacts/:id
// @access : public
const UpdateCmpData_byId = asyncHandler(async (req, res) => {
  const entry = await DB_access.findById(req.params.id);
  if(!entry){
    res.status(404);
    throw new Error("entry not found in DB");
  }

  const updated_entry = await DB_access.findByIdAndUpdate(
    req.params.id, 
    req.body,
    {new : true}
  );
    res.status(200).json(updated_entry);
});

// @desc : Delete a contact by id
// @route : DELETE /api/contacts/:id
// @access : public
const DeleteCmpData_byId = asyncHandler(async (req, res) => {
  const entry = await DB_access.findById(req.params.id);
  if(!entry){
    res.status(404);
    throw new Error("entry not found in DB");
  }

  await DB_access.deleteOne({ _id: req.params.id });
  res.status(200).json(entry);
});

module.exports = {
  GetCmpData,
  CreateCmpdata,
  GetCmpData_byId,
  UpdateCmpData_byId,
  DeleteCmpData_byId,
  GetTotalAmount,
  GetTotalSales,
  PercSales,
  GetMonthlySales
};
