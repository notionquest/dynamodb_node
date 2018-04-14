import {DataMapper} from '@aws/dynamodb-data-mapper';
import DynamoDB = require('aws-sdk/clients/dynamodb');
import {
    attribute,
    hashKey,
    rangeKey,
    table,
} from '@aws/dynamodb-data-mapper-annotations';
import {MoviesClass} from './MoviesClass';


const client = new DynamoDB({region: 'us-west-2', endpoint : 'http://localhost:8000'});
const mapper = new DataMapper({client});

// Now you can save instances of this item to DynamoDB
const toFetch = new MoviesClass();
toFetch.yearkey = 2016;
toFetch.title = 'The Big New Movie 1';
const movie = mapper.get({item: toFetch}).then(() => {    
    console.log(movie);
});