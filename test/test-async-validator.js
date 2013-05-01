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
        return it("can register a custom validator", function(done) {
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
            return v.foo().validate('hogehoge2', function(err, str) {
              err.should.equal('not hogehoge');
              return done();
            });
          });
        });
      });
      describe("required and option", function() {
        it("should validate string", function(done) {
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
            should.not.exist(err);
            should.not.exist(str);
            return done();
          });
        });
        it("should validate null", function(done) {
          return asyncValidator.string().required().notNullable().validate(null, function(err, str) {
            err.should.equal('Not nullable');
            return done();
          });
        });
        it("should validate option string (undefined)", function(done) {
          return asyncValidator.string().option().validate(void 0, function(err, str) {
            should.not.exist(err);
            should.not.exist(str);
            return done();
          });
        });
        it("should validate option array (null)", function(done) {
          return asyncValidator.array().option().validate(void 0, function(err, str) {
            should.not.exist(err);
            should.not.exist(str);
            return done();
          });
        });
        it("should validate array nullable", function(done) {
          return asyncValidator.array().required().validate(null, function(err, str) {
            should.not.exist(err);
            should.not.exist(str);
            return done();
          });
        });
        return it("should validate array nullable", function(done) {
          return asyncValidator.array().required().notNullable().validate(null, function(err, str) {
            err.should.equal('Not nullable');
            return done();
          });
        });
      });
      describe('numeric', function() {
        it("should validate numeric string(1)", function(done) {
          return asyncValidator.number().isInt().validate('123', function(err, number) {
            should.not.exist(err);
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
      describe('boolean', function() {
        it("should validate bool(true)", function(done) {
          return asyncValidator.bool().validate(true, function(err, bool) {
            should.not.exist(err);
            bool.should.equal(true);
            return done();
          });
        });
        it("should validate bool(false)", function(done) {
          return asyncValidator.bool().validate(true, function(err, bool) {
            should.not.exist(err);
            bool.should.equal(true);
            return done();
          });
        });
        return it("should validate bool with options", function(done) {
          return asyncValidator.bool()["in"]([false]).validate(true, function(err, bool) {
            err.should.equal("Unexpected value");
            return done();
          });
        });
      });
      return describe('object', function() {
        var V;

        V = asyncValidator;
        return it("should validate object", function(done) {
          var registerValidator;

          registerValidator = V.obj({
            name: V.string().required().len(1, 100),
            clientId: V.string().required().regex(/[a-zA-Z0-9-]*/).len(1, 100),
            policy: V.string().len(3000),
            redirectUris: V.array(V.string().required())
          });
          return registerValidator.validate({
            name: 'aiueo',
            clientId: 'abcde'
          }, function(err, obj) {
            should.not.exist(err);
            return done();
          });
        });
      });
    });
  });

}).call(this);
