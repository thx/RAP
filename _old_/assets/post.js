/*jshint asi: true */
var duoshuoQuery = {short_name: 'thx'}

KISSY.use('node,event', function(S, Node) {

    function store(p, v) {
        if (!window.localStorage) {
            return
        }

        if (typeof v == 'undefined') {
            return localStorage.getItem(p)
        }
        else {
            localStorage.setItem(p, v)
        }
    }

    var settings = store('settings') ? JSON.parse(store('settings')) : {}
    var classList = []

    for (var p in settings) {
        if (typeof settings[p] === 'boolean' && settings[p]) {
            classList.push('body-' + p)
        }
        else {
            classList.push(settings[p])
        }
    }
    S.one('body').addClass(classList.join(' '))

    S.one('#J_toggler').on('click', function(e) {
        if (Node(e.currentTarget).outerWidth() > 0) {
            S.one('#page').toggleClass('page-dodged')
            e.stopPropagation()
        }
    })

    S.one('#J_settingsToggler').on('click', function(e) {
        S.one('.settings').toggleClass('settings-visible')
        e.stopPropagation()
    })

    S.one('body').on('click', function() {
        S.one('#page').removeClass('page-dodged')
        S.one('.settings').removeClass('settings-visible')
    })

    S.one('.settings').delegate('click', '.type-set-label', function(e) {
        var fontSize = e.currentTarget.getAttribute('data-font-size')
        var klass = e.currentTarget.getAttribute('data-class')
        var body = S.one('body')

        if (fontSize) {
            klass = 'body-font-' + fontSize
            body.removeClass('body-font-small')
            body.removeClass('body-font-middle')
            body.removeClass('body-font-large')
            body.addClass(klass)
            settings.fontSize = klass
        }
        else if (klass) {
            body.toggleClass('body-' + klass)
            settings[klass] = body.hasClass('body-' + klass)
        }

        store('settings', JSON.stringify(settings))
    })

    S.one(window).on('scroll', function(e) {
        var ceilingHeight = S.one('#ceiling').outerHeight()
        if (S.one('body').scrollTop() > ceilingHeight) {
            S.one('#nav').addClass('fixed')
            S.one('#stoc').addClass('fixed')
        }
        else {
            S.one('#nav').removeClass('fixed')
            S.one('#stoc').removeClass('fixed')
        }
    })

    S.ready(function() {
        S.getScript('http://static.duoshuo.com/embed.js')
    })
})

KISSY.config('packages', {
    mosaics: {
        base: 'http://g.tbcdn.cn/a',
        combine: true,
        debug: false,
        ignorePackageNameInUri: true,
        tag: '20130905'
    }
})

KISSY.use('brix/app,node', function(S, app, Node) {
    app.config({
        imports: {
            mosaics: {
                stoc: '0.0.2'
            }
        }
    })

    app.bootStyle(function() {
        app.boot().done(function(root) {
            root.on('ready', pageReady)
        })
    })

    function pageReady() {
        var ol = S.one('#stoc ol')

        if (matchMedia('(min-width: 1200px)').matches) {
            ol.one('li').removeClass('folded')
        }

        this.find('mosaics/stoc').on('mosaics:stoc:change', function(e) {
            var li = e.currentEntry

            while (li.parent('li')) {
                li = li.parent('li')
            }
            li.siblings().addClass('folded')
            li.removeClass('folded')
        })

        ol.delegate('click', '.folded', function(e) {
            var li = Node(e.currentTarget)

            li.siblings().addClass('folded')
            li.removeClass('folded')
        })

        S.all('article').all('h2,h3,h4').each(function(heading) {
            var id = heading.attr('id')
            heading.removeAttr('id')
            heading.prepend('<a class="anchor-link" href="#' + id + '"></a>')
            heading.prepend('<a id="' + id + '" class="anchor"></a>')
        })

        S.one('#J_tocToggler').on('click', function() {
            S.one('.stoc ol').children().toggleClass('folded')
        })
    }
})
