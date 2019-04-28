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

// TODO: implement database interface in repository
class QueryRepository {
    constructor(DBConfig){}
    saveSPARQLQueries(){}
    getSPARQLQueries(){}
}

module.exports = { QueryFactory, QueryRepository }