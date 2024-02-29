const Joi = require('joi');

const taskValidationSchema = Joi.object({
    title: Joi.string().required(),
    dueDate: Joi.date().allow(null), // Allow null as a valid value
    priority: Joi.string().valid('Low', 'Moderate', 'High').default('Low').required(),
    status: Joi.string().valid('BackLog', 'ToDo', 'InProgress', 'Done').default('ToDo').required(),
    checklists: Joi.array().items(Joi.object({
        checklist: Joi.string().required(),
        type: Joi.string().required() 
    })).required(),
    userRefId: Joi.string().hex().length(24).required(),
    shared: Joi.number().default(0)
});

module.exports = taskValidationSchema;
