should = require("chai").should()
sinon = require("sinon")
utils = require("../utils").utils
describe "utils", ->
  it "should be defined", ->
    should.exist utils

  describe "utils.LoggerInterface", ->
    it "should be defined", ->
      should.exist utils.LoggerInterface

    it "should throw on everything", ->
      instance = new utils.LoggerInterface
      (instance.log).should.throw()
      (instance.padding).should.throw()

  describe "utils.RegularLogger", ->
    it "should be defined", ->
      should.exist utils.RegularLogger

    it "should be descendant of LoggerInterface", ->
      (new utils.RegularLogger).should.be.an.instanceOf(utils.LoggerInterface)

    describe "it's instance", ->
      instance = null
      consoleLogSpy = null
      beforeEach ->
        instance = new utils.RegularLogger
        consoleLogSpy = sinon.spy console, 'log'

      afterEach ->
        console.log.restore()

      it "should inherit  #methods method", ->
        (instance.methods()).should.eql ['log', 'padding']

      it "should implement interface methods", ->
        (instance.log).should.not.throw('Not implemented Error')
        (instance.padding).should.not.throw('Not implemented Error')

      it "should put #log arguments to console", ->
        instance.log 'Lol this is strange'
        sinon.assert.calledWith(consoleLogSpy, ['Lol this is strange'])
        instance.log 'Lol', 'this', 'is', 'even', 'stranger'
        sinon.assert.calledWith(consoleLogSpy, ['Lol', 'this', 'is', 'even', 'stranger'])

      describe "#padding method", ->
        it "should exist", ->
          should.exist instance.padding

        it "should accept 3 arguments", ->
          (instance.padding.length).should.equal 3

        it "should do nothing if string is longer than needed", ->
          instance.padding('This', 2).should.equal 'This'

        it "should fill extra space with specified symbol", ->
          instance.padding('I', 3, ' ').should.equal '  I'
          instance.padding('1', 2, '0').should.equal '01'

        it "should default to space", ->
          instance.padding('1', 2).should.equal ' 1'
          instance.padding('I', 3).should.equal '  I'
