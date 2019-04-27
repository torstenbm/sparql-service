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

class QueryResult {
    constructor(result){
        this.result = result;
    }
}

class SPARQLQuery {
	constructor(queryString, queryResult) {
        this.queryString = queryString;
        this.queryResult = queryResult;

        this.setResult = result => { this.queryResult = result }
    }
}


class QueryFactory {
    createQueryObject(queryString, queryResult) {
        return new SPARQLQuery(queryString, queryResult);
    }
}

class QueryRepository {
    constructor(DBConfig){}
    saveSPARQLQueries(){}
    getSPARQLQueries(){}
}

module.exports = {SPARQLQueryDispatcher, QueryFactory, QueryRepository}