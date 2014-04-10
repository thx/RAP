module.exports = class Liquid
  @log = ->
    return unless debug?

    try
      console.log(arguments...)
    catch e
      console.log "Failed to log. %s", e

  @FilterSeparator             = /\|/
  @ArgumentSeparator           = /,/
  @FilterArgumentSeparator     = /\:/
  @VariableAttributeSeparator  = /\./
  @TagStart                    = /\{\%/
  @TagEnd                      = /\%\}/
  @VariableSignature           = /\(?[\w\-\.\[\]]\)?/
  @VariableSegment             = /[\w\-]/
  @VariableStart               = /\{\{/
  @VariableEnd                 = /\}\}/
  @VariableIncompleteEnd       = /\}\}?/
  @QuotedString                = /"[^"]*"|'[^']*'/
  @QuotedFragment              = ///#{@QuotedString.source}|(?:[^\s,\|'"]|#{@QuotedString.source})+///
  @StrictQuotedFragment        = /"[^"]+"|'[^']+'|[^\s|:,]+/
  @FirstFilterArgument         = ///#{@FilterArgumentSeparator.source}(?:#{@StrictQuotedFragment.source})///
  @OtherFilterArgument         = ///#{@ArgumentSeparator.source}(?:#{@StrictQuotedFragment.source})///
  @SpacelessFilter             = ///^(?:'[^']+'|"[^"]+"|[^'"])*#{@FilterSeparator.source}(?:#{@StrictQuotedFragment.source})(?:#{@FirstFilterArgument.source}(?:#{@OtherFilterArgument.source})*)?///
  @Expression                  = ///(?:#{@QuotedFragment.source}(?:#{@SpacelessFilter.source})*)///
  @TagAttributes               = ///(\w+)\s*\:\s*(#{@QuotedFragment.source})///
  @AnyStartingTag              = /\{\{|\{\%/
  @PartialTemplateParser       = ///#{@TagStart.source}.*?#{@TagEnd.source}|#{@VariableStart.source}.*?#{@VariableIncompleteEnd.source}///
  @TemplateParser              = ///(#{@PartialTemplateParser.source}|#{@AnyStartingTag.source})///
  @VariableParser              = ///\[[^\]]+\]|#{@VariableSegment.source}+\??///

  @async = require("./liquid/async")
