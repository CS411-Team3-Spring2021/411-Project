const express = require('express');
const router = express.Router();
const request = require('request');
const fetch = require('node-fetch');
const FETCHCONFIG = require('../config/config')
const prompt = require('prompt-sync')()

const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2020-08-01',
    authenticator: new IamAuthenticator({
        apikey: 'X-R68qVNYwoRJfhW158a_ZmhrGhqrLmvc7N5hnbqw1Ce'
    }),
    serviceUrl: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/59dcf27e-c7e4-4b16-a7de-15e2d8083d20'
});

router.route('/').post((req, res, next) => {
    let info = doRequest(req.body.entry).then(cleanReturnValue => {
        const analyzeParams = {
            'features': {
                'emotion': {}
            },
            'text': req.body.entry
        };
        const output = naturalLanguageUnderstanding.analyze(analyzeParams)
            .then(analysisResults => {
                res.render('ps4', {'entry': req.body.entry,
                    'joy': JSON.stringify(analysisResults.result.emotion.document.emotion.joy),
                    'sadness': JSON.stringify(analysisResults.result.emotion.document.emotion.sadness),
                    'fear': JSON.stringify(analysisResults.result.emotion.document.emotion.fear),
                    'disgust': JSON.stringify(analysisResults.result.emotion.document.emotion.disgust),
                    'anger': JSON.stringify(analysisResults.result.emotion.document.emotion.anger)});
            })
            .catch(err => {
                    return err;
                }
            );
    })
})

const doRequest = async value => {
    let rawReturnValue = await fetch(FETCHCONFIG.fetchOptions.url + value);
    let cleanReturnValue = await rawReturnValue.json();
    console.log(cleanReturnValue);
    return cleanReturnValue;
};

const analyzeParams = {
    'features': {
        'emotion': {}
    },
    'text': "This is our CS411 project."
};

naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
        console.log(JSON.stringify(analysisResults, null, 2));
    })
    .catch(err => {
        console.log('error:', err);
    });

const output = naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
        return JSON.stringify(analysisResults, null, 2);
    })
    .catch(err => {
            return err;
        }
    );

const something = naturalLanguageUnderstanding.analyze(analyzeParams);

module.exports = router;
