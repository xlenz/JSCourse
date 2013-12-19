utils = {}
# Your code can
# be put here.

class LoggerInterface
    log: (args...) ->
        if args.length is 0 then throw Error
        console.log args

    padding: (str, len, symbol) ->
        if arguments.length is 0 then throw Error
        if str.length < len
            unless symbol? then symbol  = ' '
            i = len - str.length
            while i > 1
                symbol += symbol
                i--
            str = symbol + str
        return str

class RegularLogger extends LoggerInterface
    methods: -> ['log', 'padding']


utils.LoggerInterface = LoggerInterface
utils.RegularLogger = RegularLogger
module.exports = {utils}
