var should = chai.should;
var expect = chai.expect;
/*
describe('Test suite 1', function() {

   var module;
   before(function() {
      module = angular.module("angularSpa");
   });

   it("App module should be registered", function() {
      //expect(module).not.to.equal(null);
   });

   describe('test case 1', function() {

      //expect(ROUTER.routeDefined('signup_path')).to.equal(true);
      //var url = ROUTER.routePath('signup_path');
      //expect(url).to.equal('/signup');
   });

});
*/

describe("Midway: Testing Modules", function() {
   describe("App Module:", function() {

      var module;
      before(function() {
         module = angular.module("angularSpa");
      });

      it("should be registered", function() {
         expect(module).not.to.equal(null);
      });
   })
})
