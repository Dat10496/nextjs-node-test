const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const Lead = require("../models/lead.model");

const leadControllers = {};

leadControllers.getLead = catchAsync(async (req, res, next) => {
  // Get req from client
  let { page, limit, ...filter } = { ...req.query };
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const filterConditions = [];

  //receive newest lead
  const sortConditions = { createdAt: -1 };

  if (filter.name) {
    filterConditions.push({
      name: { $regex: filter.name, $options: "i" },
    });
  }

  if (filter.email) {
    filterConditions.push({
      email: { $regex: filter.email, $options: "i" },
    });
  }

  if (filter.status) {
    filterConditions.push({
      status: { $regex: filter.status, $options: "i" },
    });
  }

  const filterCriteria = filterConditions.length
    ? { $and: filterConditions }
    : {};

  const count = await Lead.countDocuments(filterCriteria);

  const totalLead = await Lead.countDocuments();

  const totalPages = Math.ceil(count / limit);

  const offset = limit * (page - 1);

  let leads = await Lead.find(filterCriteria)
    .sort(sortConditions)
    .limit(limit)
    .skip(offset);

  // Send response
  return sendResponse(
    res,
    200,
    true,
    { leads, totalPages, totalLead },
    null,
    "Get Leads Successfully"
  );
});

leadControllers.createLead = catchAsync(async (req, res, next) => {
  const { name, email, status } = req.body;

  const lead = await Lead.findOne({ email: email });

  if (lead) {
    throw new AppError(409, "Lead already exists", "Create lead failed");
  }
  // Perform database operations to create a new lead
  const newLead = await Lead.create({ name, email, status });

  return sendResponse(
    res,
    200,
    true,
    newLead,
    null,
    "Create lead successfully"
  );
});

module.exports = leadControllers;
