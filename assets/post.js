var duoshuoQuery = {short_name:"thx"};

KISSY.use('node,event', function(S, Node) {
    S.one('#J_toggler').on('click', function(e) {
        if (Node(e.currentTarget).outerWidth() > 0) {
            S.one('#page').toggleClass('page-dodged')
            e.stopPropagation()
        }
    })

    S.one('body').on('click', function() {
        S.one('#page').removeClass('page-dodged')
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

        ol.children().addClass('folded')
        ol.one('li').removeClass('folded')

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

        S.all('article').all('h1,h2,h3').each(function(heading) {
            var id = heading.attr('id')
            heading.prepend('<a name="' + id + '" class="anchor"></a>')
            heading.prepend('<a name="' + id + '" class="anchor-link" href="#' + id + '">#</a>')
        })
    }
})
