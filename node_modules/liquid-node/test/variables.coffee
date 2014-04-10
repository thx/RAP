Liquid = require("../src/index")

module.exports =
  test_variable: (onExit, assert) ->
    variable = new Liquid.Variable('hello')
    assert.equal variable.name, 'hello'

  test_filters: (onExit, assert) ->
    v = new Liquid.Variable('hello | textileze')
    assert.equal 'hello', v.name
    assert.deepEqual [["textileze",[]]], v.filters

    v = new Liquid.Variable('hello | textileze | paragraph')
    assert.equal 'hello', v.name
    assert.deepEqual [["textileze",[]], ["paragraph",[]]], v.filters

    v = new Liquid.Variable("""hello | strftime: '%Y'""")
    assert.equal 'hello', v.name
    assert.deepEqual [["strftime",["'%Y'"]]], v.filters

    v = new Liquid.Variable("""'typo' | link_to: 'Typo', true""")
    assert.equal """'typo'""", v.name
    assert.deepEqual [["link_to",["'Typo'", "true"]]], v.filters

    v = new Liquid.Variable("""'typo' | link_to: 'Typo', false""")
    assert.equal """'typo'""", v.name
    assert.deepEqual [["link_to",["'Typo'", "false"]]], v.filters

    v = new Liquid.Variable("""'foo' | repeat: 3""")
    assert.equal """'foo'""", v.name
    assert.deepEqual [["repeat",["3"]]], v.filters

    v = new Liquid.Variable("""'foo' | repeat: 3, 3""")
    assert.equal """'foo'""", v.name
    assert.deepEqual [["repeat",["3","3"]]], v.filters

    v = new Liquid.Variable("""'foo' | repeat: 3, 3, 3""")
    assert.equal """'foo'""", v.name
    assert.deepEqual [["repeat",["3","3","3"]]], v.filters

    v = new Liquid.Variable("""hello | strftime: '%Y, okay?'""")
    assert.equal 'hello', v.name
    assert.deepEqual [["strftime",["'%Y, okay?'"]]], v.filters

    v = new Liquid.Variable(""" hello | things: "%Y, okay?", 'the other one'""")
    assert.equal 'hello', v.name
    assert.deepEqual [["things",["\"%Y, okay?\"","'the other one'"]]], v.filters

  test_filter_with_date_parameter: (onExit, assert) ->
    v = new Liquid.Variable(""" '2006-06-06' | date: "%m/%d/%Y" """)
    assert.equal "'2006-06-06'", v.name
    assert.deepEqual [["date",["\"%m/%d/%Y\""]]], v.filters

  # TODO

  test_simple_variable: renderTest (render, assert) ->
    render('worked', '{{test}}', test:'worked')
    render('worked wonderfully', '{{test}}', test:'worked wonderfully')

  test_local_filter: (onExit, assert) ->
    MoneyFilter =
      money: (input) ->
        require('util').format(' %d$ ', input)

      money_with_underscore: (input) ->
        require('util').format(' %d$ ', input)

    context = new Liquid.Context()
    context.set 'var', 1000
    context.addFilters(MoneyFilter)

    called = false
    new Liquid.Variable("var | money").render(context).nodeify (err, result) ->
      assert.equal ' 1000$ ', result
      called = true

    onExit ->
      assert.equal true, called
