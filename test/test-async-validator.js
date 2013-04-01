// Generated by CoffeeScript 1.6.2
(function() {
  var asyncValidator, should;

  if (typeof this.asyncValidator === 'undefined') {
    try {
      asyncValidator = require("../");
    } catch (_error) {}
  } else {
    asyncValidator = this.asyncValidator;
  }

  if (typeof this.should === 'undefined') {
    try {
      should = require('should');
    } catch (_error) {}
  } else {
    should = this.should;
  }

  describe("async-validator", function() {
    return describe("String validator", function() {
      describe("object feature", function() {
        return it("should be different objects when add new validation", function() {
          var v1, v2, v3;

          v1 = asyncValidator.string();
          v2 = v1.required();
          v1.should.not.equal(v2);
          v3 = v2.isEmail();
          return v2.should.not.equal(v3);
        });
      });
      describe("validator registration", function() {
        return it("can register a custom validator to string validator", function(done) {
          var v;

          asyncValidator.Validator.register('foo', function() {
            return function(str, next) {
              if (str === 'hogehoge') {
                return next(null, str);
              } else {
                return next('not hogehoge');
              }
            };
          });
          v = asyncValidator.string();
          return v.foo().validate('hogehoge', function(err, str) {
            str.should.equal('hogehoge');
            return done();
          });
        });
      });
      describe("required and option", function() {
        it("should validate string", function(done) {
          asyncValidator.string().required().validate();
          return asyncValidator.string().required().validate("a", function(err, str) {
            str.should.equal('a');
            return done();
          });
        });
        it("should validate empty string", function(done) {
          return asyncValidator.string().required().validate("", function(err, str) {
            str.should.equal('');
            return done();
          });
        });
        it("should validate required string", function(done) {
          return asyncValidator.string().required().validate(null, function(err, str) {
            err.should.equal('Required');
            return done();
          });
        });
        return it("should validate option string", function(done) {
          return asyncValidator.string().option().validate(null, function(err, str) {
            should.equal(str, null);
            return done();
          });
        });
      });
      return describe('numeric', function() {
        it("should validate numeric string(1)", function(done) {
          return asyncValidator.number().isInt().validate('123', function(err, number) {
            should.equal(null, err);
            number.should.equal(123);
            return done();
          });
        });
        return it("should validate numeric string(2)", function(done) {
          return asyncValidator.number().isInt().validate('abc', function(err, number) {
            err.should.equal('Invalid Integer');
            return done();
          });
        });
      });
    });
  });

}).call(this);
