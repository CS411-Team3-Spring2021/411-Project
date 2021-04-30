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
        apikey: FETCHCONFIG.fetchOptions.apikey
    }),
    serviceUrl: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/59dcf27e-c7e4-4b16-a7de-15e2d8083d20'
});


const options = {
    method: 'GET',
    url: 'https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi',
    qs: {
        q: 'get:new7-!1900,2018-!0,5-!0,10-!0-!Any-!Any-!Any-!gt100-!{downloadable}',
        t: 'ns',
        cl: 'all',
        st: 'adv',
        ob: 'Relevance',
        p: '1',
        sa: 'and'
    },
    headers: {
        'x-rapidapi-key': FETCHCONFIG.fetchOptions.apikey,
        'x-rapidapi-host': 'unogs-unogs-v1.p.rapidapi.com',
        useQueryString: true
    }
};

const joyOptions = {
    method: 'GET',
    url: 'https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi',
    qs: {
        q: 'get:new7-!1900,2018-!0,5-!0,10-!6548-!Any-!Any-!Any-!gt100-!{downloadable}',
        t: 'ns',
        cl: 'all',
        st: 'adv',
        ob: 'Relevance',
        p: '1',
        sa: 'and'
    },
    headers: {
        'x-rapidapi-key': FETCHCONFIG.fetchOptions.apikey,
        'x-rapidapi-host': 'unogs-unogs-v1.p.rapidapi.com',
        useQueryString: true
    }
};

const sadOptions = {
    method: 'GET',
    url: 'https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi',
    qs: {
        q: 'get:new7-!1900,2018-!0,5-!0,10-!5763-!Any-!Any-!Any-!gt100-!{downloadable}',
        t: 'ns',
        cl: 'all',
        st: 'adv',
        ob: 'Relevance',
        p: '1',
        sa: 'and'
    },
    headers: {
        'x-rapidapi-key': FETCHCONFIG.fetchOptions.apikey,
        'x-rapidapi-host': 'unogs-unogs-v1.p.rapidapi.com',
        useQueryString: true
    }
};

const fearOptions = {
    method: 'GET',
    url: 'https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi',
    qs: {
        q: 'get:new7-!1900,2018-!0,5-!0,10-!8711-!Any-!Any-!Any-!gt100-!{downloadable}',
        t: 'ns',
        cl: 'all',
        st: 'adv',
        ob: 'Relevance',
        p: '1',
        sa: 'and'
    },
    headers: {
        'x-rapidapi-key': FETCHCONFIG.fetchOptions.apikey,
        'x-rapidapi-host': 'unogs-unogs-v1.p.rapidapi.com',
        useQueryString: true
    }
};

const disgustOptions = {
    method: 'GET',
    url: 'https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi',
    qs: {
        q: 'get:new7-!1900,2018-!0,5-!0,10-!8933-!Any-!Any-!Any-!gt100-!{downloadable}',
        t: 'ns',
        cl: 'all',
        st: 'adv',
        ob: 'Relevance',
        p: '1',
        sa: 'and'
    },
    headers: {
        'x-rapidapi-key': FETCHCONFIG.fetchOptions.apikey,
        'x-rapidapi-host': 'unogs-unogs-v1.p.rapidapi.com',
        useQueryString: true
    }
};

const angerOptions = {
    method: 'GET',
    url: 'https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi',
    qs: {
        q: 'get:new7-!1900,2018-!0,5-!0,10-!0-!Any-!Any-!Any-!gt100-!{downloadable}',
        t: 'ns',
        cl: 'all',
        st: 'adv',
        ob: 'Relevance',
        p: '1',
        sa: 'and'
    },
    headers: {
        'x-rapidapi-key': FETCHCONFIG.fetchOptions.apikey,
        'x-rapidapi-host': 'unogs-unogs-v1.p.rapidapi.com',
        useQueryString: true
    }
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
    return body;
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
                console.log(JSON.stringify(analysisResults, null, 2))
                res.render('ps4', {'entry': req.body.entry,
                    'joy': JSON.stringify(analysisResults.result.emotion.document.emotion.joy),
                    'sadness': JSON.stringify(analysisResults.result.emotion.document.emotion.sadness),
                    'fear': JSON.stringify(analysisResults.result.emotion.document.emotion.fear),
                    'disgust': JSON.stringify(analysisResults.result.emotion.document.emotion.disgust),
                    'anger': JSON.stringify(analysisResults.result.emotion.document.emotion.anger),
                    'recommendations': JSON.stringify(request(joyOptions, function (error, response, body) {
                        if (error) throw new Error(error);
                        console.log(body);
                        return body;
                    }))
            })
            .catch(err => {
                    console.log('error:', err);
                    return err;
                }
            );
    })
})})

const doRequest = async value => {
    let rawReturnValue = await fetch(FETCHCONFIG.fetchOptions.url + value);
    let cleanReturnValue = await rawReturnValue.json();
    console.log(cleanReturnValue);
    return cleanReturnValue;
};

module.exports = router;
