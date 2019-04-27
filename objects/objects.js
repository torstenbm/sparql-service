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

module.exports = { QueryFactory, QueryRepository }