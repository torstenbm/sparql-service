var express = require('express');
const fetch = require("node-fetch");

var port = process.env.PORT || 3000;
var app = express();

var wikiData = "Heyhey";

class SPARQLQueryDispatcher {
	constructor( endpoint ) {
		this.endpoint = endpoint;
	}

	query( sparqlQuery ) {
		const fullUrl = this.endpoint + '?query=' + encodeURIComponent( sparqlQuery );
		const headers = { 'Accept': 'application/sparql-results+json' };

		return fetch( fullUrl, { headers } ).then( body => body.json() );
	}
}

const endpointUrl = 'https://query.wikidata.org/sparql';
const sparqlQuery = `#Cats, with pictures
#added before 2016-10

#defaultView:ImageGrid
SELECT ?item ?itemLabel ?pic
WHERE
{
?item wdt:P31 wd:Q146 .
?item wdt:P18 ?pic
SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en" }
}`;

const queryDispatcher = new SPARQLQueryDispatcher( endpointUrl );
queryDispatcher.query( sparqlQuery ).then( wikiData => {
    console.log("got here");
    console.log(wikiData.results.bindings);
    app.get('/', function (req, res) {
        res.send(JSON.stringify(wikiData.results.bindings));
       });
    app.listen(port, function () {
    console.log(`Example app listening on port`, port);
    });
}) 
.catch( console.log );




