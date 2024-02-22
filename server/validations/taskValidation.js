const Joi = require('joi');

const taskValidationSchema = Joi.object({
    title: Joi.string().required(),
    dueDate: Joi.date().required(),
    priority: Joi.string().valid('Low', 'Moderate', 'High').default('Low').required(),
    status: Joi.string().valid('BackLog', 'ToDo', 'InProgress', 'Done').default('BackLog').required(),
    checklists: Joi.array().items(Joi.object({
        checklist: Joi.string().required(),
        type: Joi.string().required() 
    })).required(),
    userRefId: Joi.string().required()
});

module.exports = taskValidationSchema;
