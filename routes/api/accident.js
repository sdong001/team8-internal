const express = require('express');
const router = express.Router();
const has = require('has');

const accidentModel = require('../../models/accident');

const commonApi = require('../common');

const getDefaultProjection = {
    _id: 0
};

module.exports = {
    
    createAccident : (snapshot, callback) => {
        accidentModel.insert(snapshot, (data) => {
            callback(data);
        });
    },
	
    getList : (viewReq, option, callback) => {
        let mongoQuery = commonApi.getFindQuery(viewReq, getDefaultProjection, option);
        
        if( has(mongoQuery.query, 'occured_date') ) {
            let convertQuery = mongoQuery.query;
            
            convertQuery.occured_date.$gte = new Date(convertQuery.occured_date.$gte);
            convertQuery.occured_date.$lt = new Date(convertQuery.occured_date.$lt);
            
            mongoQuery.query = convertQuery;
        }
        
        accidentModel.find(mongoQuery, (data) => {
            callback(data);
        });
    },
};
