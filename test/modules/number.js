/**
 * Created by JT on 8/24/16.
 */
var chai = require('chai'),
    should = chai.should(),
    expect = chai.expect;

// module to test
var number = require('./../../lib/modules/number');
var numberConfig = require('./../../lib/modules/config/number');

describe('NUMBER', function () {
   
    describe('int', function () {
        describe('between', function () {
            it('should return an int between the entered range', function (done) {
                let min = 0;
                let max = 1000;
                let result = number.int.between(min, max);
                
                result.should.be.a('number');
                result.should.be.within(min, max);
                done();
            });

            it('should return an error due to the range', function (done) {
                let min = numberConfig.minInt - 1;
                let max = numberConfig.maxInt + 1;
                let between;

                number.int.between.bind(between, min, max).should.throw('min and max must be from ' + numberConfig.minInt + ' and ' + numberConfig.maxInt);
                done();
            });

            it('should return an error due to max being less than min', function (done) {
                let min = 10;
                let max = -10;
                let between;

                number.int.between.bind(between, min, max).should.throw('max must be greater than min');
                done();
            });
        });

        describe('ofLength', function () {
            it('should return an int of the length entered', function (done) {
                let length = 9;
                let result = number.int.ofLength(length);
                
                result.should.be.a('number');
                result.toString().length.should.equal(length);
                done();
            });
            
            it('should return an error due to the length of the wanted int', function (done) {
                let length = numberConfig.maxInt.toString().length;
                let ofLength;

                number.int.ofLength.bind(ofLength, length).should.throw('length must be from 1 to ' + numberConfig.maxInt.toString().length);
                done();
            });
        });

        describe('array', function () {
            it('should return an int array of the length entered', function (done) {
                let length = 9;
                let result = number.int.array(length);

                result.should.be.an('array');
                result.length.should.equal(length);
                for (var i in result) {
                    result[i].should.be.within(0, 99);
                }
                done();
            });

            it('should return an int array of the length entered and int between min and max', function (done) {
                let length = 9;
                let min = 0;
                let max = 50;
                let result = number.int.array(length, min, max);

                result.should.be.an('array');
                result.length.should.equal(length);
                for (var i in result) {
                    result[i].should.be.within(min, max);
                }
                done();
            });

            it('should return an error due to the range', function (done) {
                let length = 9;
                let min = numberConfig.minInt;
                let max = numberConfig.maxInt;
                let array;

                number.int.array.bind(array, length, min, max).should.throw('min and max must be from ' + (numberConfig.minInt + 1) + ' and ' + (numberConfig.maxInt - 1));
                done();
            });

            it('should return an error due to max being less than min', function (done) {
                let length = 9;
                let min = 10;
                let max = -10;
                let array;

                number.int.array.bind(array, length, min, max).should.throw('max must be greater than min');
                done();
            });
        });
    });

    describe('decimal', function () {
        describe('between', function () {
            it('should return an decimal between the entered range', function (done) {
                let min = 0;
                let max = 10;
                let precision = 5;
                let result = number.decimal.between(min, max, precision);
                let resultDecimals = result.toString().substring(result.toString().indexOf('.') + 1);

                result.should.be.a('number');
                result.should.be.within(min, max+1);
                resultDecimals.length.should.equal(precision);
                done();
            });

            it('should return an decimal between the entered range as a string', function (done) {
                let min = 0;
                let max = 1000;
                let precision = 5;
                let result = number.decimal.between(min, max, precision, true);
                let resultDecimals = result.substring(result.indexOf('.') + 1);
                
                result.should.be.a('string');
                result.should.be.within(min, max+1);
                resultDecimals.length.should.equal(precision);
                done();
            });
        });

        describe('ofLength', function () {
            it('should return a decimal of the length entered', function (done) {
                let length = 9;
                let precision = 3;
                let result = number.decimal.ofLength(length, precision);
                let resultDecimals = result.toString().substring(result.toString().indexOf('.') + 1);
                let resultInt = result.toString().substring(0, result.toString().indexOf('.'));

                result.should.be.a('number');
                result.toString().length.should.equal(length + precision + 1);
                resultDecimals.length.should.equal(precision);
                resultInt.length.should.equal(length);
                done();
            });

            it('should return a decimal of the length entered as a string', function (done) {
                let length = 9;
                let precision = 3;
                let result = number.decimal.ofLength(length, precision, true);
                let resultDecimals = result.toString().substring(result.toString().indexOf('.') + 1);
                let resultInt = result.substring(0, result.indexOf('.'));

                result.should.be.a('string');
                result.length.should.equal(length + precision + 1);
                resultDecimals.length.should.equal(precision);
                resultInt.length.should.equal(length);
                done();
            });
        });
    });
});