var express = require('express');
const fetch = require("node-fetch");

var port = process.env.PORT || 3000;
var app = express();

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

    var resString = ``;

    wikiData.results.bindings.forEach(item => {
        resString += `<img style="width: 51%; margin: 10px auto" src="${item.pic.value}" />`
    })

    app.get('/', function (req, res) {
        res.send(`
        <div style="text-align: center">
            ${resString}
        </div>
        `);
       });
    app.listen(port, function () {
    console.log(`Example app listening on port`, port);
    });
}) 
.catch( console.log );




