var duoshuoQuery = {short_name:"thx"};

KISSY.use('node,event', function(S) {
    S.one('#J_toggler').on('click', function(e) {
        if (e.currentTarget.outerWidth() > 0) {
            var page = S.one('#page')

            page.css(
                'left',
                parseInt(page.css('left'), 10) > 0 ? 0 : S.one('#nav').outerWidth()
            )
            e.stopPropagation()
        }
    })

    S.one('body').on('click', function() {
        if (S.one('#J_toggler').outerWidth() > 0) {
            S.one('#page').css('left', 0)
        }
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
        base: 'http://g.tbcdn.cn/thx/m',
        combine: true,
        debug: false,
        tag: '20130905'
    }
})

KISSY.use('brix/app', function(S, app) {
    app.config({
        imports: {
            mosaics: {
                stoc: '0.0.1'
            }
        }
    })

    app.bootStyle(function() {
        app.boot()
    })
})
