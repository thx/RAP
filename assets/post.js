var duoshuoQuery = {short_name:"thx"};

KISSY.use('node,event', function(S) {
    var toggler = S.one('#J_toggler')

    if (toggler.outerWidth() > 0) {
        toggler.on('click', function(e) {
            var page = S.one('#page')

            page.css(
                'left',
                parseInt(page.css('left'), 10) > 0 ? 0 : S.one('#nav').outerWidth()
            )
            e.stopPropagation()
        })
        S.one('body').on('click', function() {
            S.one('#page').css('left', 0)
        })
    }

    S.one(window).on('scroll', function(e) {
        var ceilingHeight = S.one('#ceiling').outerHeight()
        if (S.one('body').scrollTop() > ceilingHeight) {
            S.one('#nav').addClass('fixed')
        }
        else {
            S.one('#nav').removeClass('fixed')
        }
    })

    S.getScript('http://static.duoshuo.com/embed.js')
})