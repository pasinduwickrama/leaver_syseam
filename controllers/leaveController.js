const asyncHandler = require("express-async-handler");
const Leave = require("../models/leaverModel");



// Create leave
const createLeave = asyncHandler(async (req, res) => {
  const { name, day, numberday,  description } = req.body;

 
  if (!name || !day || !numberday ||  !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
    
  }


  const leave = await Leave.create({
    user: req.user.id,
    name,
    day,
    numberday,
    description,

   
   
  });

  res.status(201).json(leave);
});

// Get all leave
const getLeaves = asyncHandler(async (req, res) => {
  const leave = await Leave.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(leave);
});

// Get single leave
const getLeave = asyncHandler(async (req, res) => {
  const leave = await Leave.findById(req.params.id);
 
  if (!leave) {
    res.status(404);
    throw new Error("Leave not found");
  }
 
  if (leave.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(leave);
});

// Delete leave
const deleteLeave = asyncHandler(async (req, res) => {
  const leave = await Leave.findById(req.params.id);
  
  if (!leave) {
    res.status(404);
    throw new Error("leave not found");
  }
 
  if (leave.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await leave.remove();
  res.status(200).json({ message: "leave deleted." });
});

// Update leave
const updateLeave = asyncHandler(async (req, res) => {
  const {name, day, numberday,  description } = req.body;
  const { id } = req.params;

  const leave = await Leave.findById(id);

  
  if (!leave) {
    res.status(404);
    throw new Error("leave not found");
  }

  if (leave.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

 

  // Update Leave
  const updatedLeave = await Leave.findByIdAndUpdate(
    { _id: id },
    {
        name,
        day,
        numberday,
        description,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedLeave);
});

module.exports = {
  createLeave,
  getLeaves,
  getLeave,
  deleteLeave,
  updateLeave,
};
