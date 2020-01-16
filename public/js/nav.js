var masternodeDashboardApp = {
    'goHooks': {},

    // Switches page
    'go': function(page) {
        if (this.current_page == page)
            return;

        if (this.current_page) {
            $(this.current_page).hide();
        }
        window.scrollTo(0,0);
        $(page).show();
        this.sidebarResizePage();
        this.current_page = page;
        this.setNavActive(page);
        this.onGoHook(page);
    },

    'onGoHook': function(pageName) {
        if (this.goHooks.hasOwnProperty(pageName))
            this.goHooks[pageName]();
    },

    'addGoHook': function(pageName, callback) {
        this.goHooks[pageName] = callback;
    },

    'setNavActive': function(page = null) {
        $('.nav-active').removeClass('nav-active'); // deactivate previously active tabs

        if (page == 'index')    // main index link is a special one
            $('a.navbar-brand').addClass('nav-active');

        else
            $('a[href$="' + page + '"].nav-link').parent('li').addClass('nav-active');
    },

    'bindEvents': function() {
        $('body').resize(function(){
            if ($('.sidebar').hasClass('sidebar-expand'))
                masternodeDashboardApp.sidebarResizePage();
        });

        // Click events on navigation links
        $('.nav-link').not('.dropdown-toggle').add('.navbar-brand').add('.dropdown-item')
            .add('.nav-vertical a').add('.breadcrumb-item a')
            .add('.sidebar a')
            .add('a.nav-page')
            .not('.nav-external-app').not('.spa').click(function(e) {
           e.preventDefault();
           masternodeDashboardApp.go($(this).attr('href'));
        }).addClass('spa');
        console.log(document.location.hash)
    },

    // Fix for sidebar on large screens, when CSS way is just too cumbersome
    'sidebarResizePage': function() {
        var sidebarLeftPadContent = 0;

        if ($('body').width() > 990) {
            $('#content').css('padding-left', 0);
            sidebarLeftPadContent = (($('body').width() * 0.2) - 20 - (($('body').width()-$('#content').width()) / 2));

            if ((($('body').width()-$('#content').width()) / 2) < ($('body').width() * 0.2)) {
                $('#content').css('padding-left', sidebarLeftPadContent+'px');
            } else {
                $('#content-wrapper').css('padding-left', 'unset');
            }
            $('#footer-content').css('padding-left', 0);
            sidebarLeftPadContent = (($('body').width() * 0.2) - 20 - (($('body').width()-$('#content').width()) / 2));

            if ((($('body').width()-$('#footer-content').width()) / 2) < ($('body').width() * 0.2)) {
                $('#footer-content').css('padding-left', sidebarLeftPadContent+'px');
            } else {
                $('#footer-wrapper').css('padding-left', 'unset');
            }
        }
    },

    'start': function() {
        this.sidebarResizePage();
        this.bindEvents();
        this.go('#dashboard');
    }
}

/* Mark current page's tab as active (if found in main nav) */
$(document).ready(function() {
    masternodeDashboardApp.start();
});
