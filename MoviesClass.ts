import {DataMapper} from '@aws/dynamodb-data-mapper';
import DynamoDB = require('aws-sdk/clients/dynamodb');
import {
    attribute,
    hashKey,
    rangeKey,
    table,
} from '@aws/dynamodb-data-mapper-annotations';

@table('Movies')
class MoviesClass {
    @hashKey()
    yearkey: number;

    @rangeKey()
    title: string;
    
}