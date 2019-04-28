// Imports
var { QueryFactory, QueryRepository  } = require("./model/model");
var express = require('express');
var bodyParser = require("body-parser");
const fetch = require("node-fetch");


// Config
var port = process.env.PORT || 3000;
var app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));


// Define SPARQL endpoint, TODO: Make dynamic
const endpointUrl = 'https://query.wikidata.org/sparql';


// runQuery : Takes sparqlQueryObject as input and populates sparqlQueryObject.queryResult
runQuery = sparqlQueryObject => {
    endpoint = endpointUrl;
    const fullUrl = endpoint + '?query=' +  encodeURIComponent(sparqlQueryObject.queryString);
    const headers = { 'Accept': 'application/sparql-results+json' };

    return fetch( fullUrl, { headers } )
        .then( body => body.json())
        .then( result => {
            sparqlQueryObject.setResult(result);
            return sparqlQueryObject
        });
}


// Initialize query factory
var queryFactory = new QueryFactory();


// REST API: Handle incoming POST request
app.post("/runQuery", (request, response) => {
    let queryObject = queryFactory.createQueryObject(request.body.query, null);
    runQuery(queryObject)
    .then(queryObject => response.send(queryObject.queryResult.results.bindings))
})


// Start listening
app.listen(port, function () {
    console.log(`SPARQL Query microservice listening on port`, port);
});
