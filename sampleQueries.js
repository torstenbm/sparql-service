const sparqlQuery = `SELECT ?item ?itemLabel ?pic WHERE { ?item wdt:P31 wd:Q146 . ?item wdt:P18 ?pic SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en" }}`;


module.exports = sparqlQuery;