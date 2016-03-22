/* global jQuery */

(function ($) {

    'use strict';

    var PagerTom = function (element, options) {
        this.perpage     = this.option(options.perpage, 10);
        this.page        = this.option(options.page, 1);
        this.target      = this.option(options.target, "#pages");
        this.itemtarget  = this.option(options.itemtarget, "div");
        this.previous    = this.option(options.previous, "Previous");
        this.next        = this.option(options.next, "Next");
        this.first       = this.option(options.first, "First");
        this.last        = this.option(options.last, "Last");
        this.pagecount   = this.option(options.pagecount, "Page [page] of [pagecount].");
        this.otherpages  = this.option(options.otherpages, false);
        this.hash        = this.option(options.hash, false);
        this.animate     = this.option(options.animate, false);

        this.init();
    };

    PagerTom.prototype.init = function () {
        var pagination = this;

        // hide the button area, and set it up for the content
        this.resetButtons();
        // get the number of pages needed for the page
        this.pages = this.pageCount();
        // if there is a hash value set, we should look for this in the window
        if (this.hash) {
            this.hashValue();
            // also load when the window hash changes.
            $(window).on('hashchange', function() {
                pagination.hashValue();
            });
        }
        // load the first page
        this.showPage(this.page);
    };

    /**
     * Get the option or default value if it isn't set.
     *
     * @param  {mixed} value
     * @param  {mixed} def
     * @return {mixed}
     */
    PagerTom.prototype.option = function(value, def) {
        if (typeof(value) === undefined || value === null) {
            return def;
        }
        return value;
    };

    /**
     * Get the number of pages.
     *
     * @return {integer}
     */
    PagerTom.prototype.pageCount = function() {
        // get number of elements matching the selector
        var elements = $(this.target + ' ' + this.itemtarget).length;
        if (elements <= 0) {
            elements = 1;
        }
        if (this.perpage <= 0) {
            this.perpage = 1;
        }
        // divide by the number per page
        this.pages = Math.ceil(elements / this.perpage);
        // return the next integer
        return this.pages;
    };

    /**
     * Get the description of the number of pages (default is "Page x of y.").
     *
     * @return {string}
     */
    PagerTom.prototype.pageCountText = function() {
        var str = this.pagecount;
        str = str.replace("[page]", this.page);
        str = str.replace("[pagecount]", this.pages);
        return str;
    };

    /**
     * Get the page number from the hash of the page.  This is loaded when the
     * hash value changes or when the page is visible.
     *
     * @return {integer}
     */
    PagerTom.prototype.hashValue = function() {
        // get current page, based on hash
        if (this.hash) {
            if (window.location.hash) {
                var h = window.location.hash;
                var p = parseInt(h.replace('#' + this.hash));
                if (p >= 1) {
                    this.page = p;
                    return p;
                }
            }
        }
        return 0;
    };

    /**
     * remove the existing content from the pagination container, and setup the
     * empty elements for the pagecount and pagination buttons.
     *
     * @return {void}
     */
    PagerTom.prototype.resetButtons = function() {
        var buttons = '<div class="pager-tom"><div class="pagecount"></div><ul class="pagination"></ul></div>';
        this.element.children('.pager-tom').remove();
        this.element.append(buttons);
    };

    PagerTom.prototype.hashValue = function(page) {
        if (this.hash) {
            return "#" + this.hash + page;
        }
        return "#page-" + page;
    };

    PagerTom.prototype.link = function(page, title, disabled) {
        var href = this.hashValue(page);
        if (disabled === true) {
            return '<li class="disabled"><a href="' + href + '" data-page="' + page + '">' + title + '</a></li>';
        }
        return '<li><a href="' + href + '" data-page="' + page + '">' + title + '</a></li>';
    };

    PagerTom.prototype.activeLink = function(page, title) {
        var href = this.hashValue(page);
        return '<li class="active"><a href="' + href + '" data-page="' + page + '">' + title + '</a></li>';
    };

    /**
     * Fill up the pagination container.  Add the page count and buttons.
     *
     * @return {void}
     */
    PagerTom.prototype.showButtons = function() {
        var i = 1;
        // show text
        this.element.children('.pagecount').html(this.pageCountText());

        var button_ul = this.element.children('ul.pagination');
        button_ul.html("");

        // show first button
        if (this.first) {
            button_ul.append(this.link(1, this.first, ((this.page > 1) ? false : true)));
        }
        // show previous button
        if (this.previous) {
            button_ul.append(this.link(parseInt(this.page - 1), this.previous, ((this.page > 1) ? false : true)));
        }
        // show page buttons
        if (this.otherpages) {
            var minpages = (this.otherpages * 2) + 1;
            if (this.pages <= minpages) {
                for(i = 1; i <= pages; i++) {
                    if (i == this.page) {
                        button_ul.append(this.activeLink(i, i));
                    } else {
                        button_ul.append(this.link(i, i, false));
                    }
                }
            } else {
                var start = 1;
                if (this.page >= this.pages - this.otherpages) {
                    start = this.pages - (this.otherpages * 2);
                } else if (this.page > this.otherpages) {
                    start = this.page - this.otherpages;
                }
                var end = start + (this.otherpages * 2);
                for(i = start; i <= end; i++) {
                    if (i == start && i >= 2) {
                        button_ul.append(this.link(i, '...', true));
                    }
                    if (i == this.page) {
                        button_ul.append(this.activeLink(i, i));
                    } else {
                        button_ul.append(this.link(i, i, false));
                    }
                    if (i == end && i <= this.pages - 2) {
                        button_ul.append(this.link(i, '...', true));
                    }
                }
            }
        } else {
            for(i = 1; i <= this.pages; i++) {
                if (i == this.page) {
                    button_ul.append(this.activeLink(i, i));
                } else {
                    button_ul.append(this.link(i, i, false));
                }
            }
        }
        // show next button
        if (this.next) {
            button_ul.append(this.link(((this.page + 1 > this.pages) ? this.pages : this.page + 1), this.next, ((this.page < this.pages) ? false : true)));
        }
        // show last button
        if (this.last) {
            button_ul.append(this.link(this.pages, this.last, ((this.page < this.pages) ? false : true)));
        }

        // override click function on buttons
        var pagination = this;
        $('ul.pagination li a').click(function() {
            var new_page = parseInt($(this).attr('data-page'));
            pagination.showPage(new_page);
            if (pagination.hash) {
                window.location.hash = pagination.hash + new_page;
            }
            return false;
        });
    };

    /**
     * Move the paginator to the specified page.
     *
     * @param  {integer} page
     * @return {void}
     */
    PagerTom.prototype.showPage = function(page) {
        if (page < 1) {
            page = 1;
        }
        if (page > this.pages) {
            page = this.pages;
        }
        this.page = page;
        // change buttons
        this.showButtons();

        // change the page
        var selector = this.target + ' ' + this.itemtarget;
        // get first element to show
        var start = this.perpage * (this.page - 1);
        // get last element to show
        var end = this.perpage * this.page;
        // hide elements
        $(selector).each(function() {
            $(this).hide();
        });

        // show elements
        if (this.animate) {
            $(selector + ":gt(" + start + "):lt(" + end + ")").each(function() {
                $(this).fadeIn();
            });
        } else {
            $(selector + ":gt(" + start + "):lt(" + end + ")").each(function() {
                $(this).show();
            });
        }
    };

    /**
     * Show the first page
     *
     * @return {void}
     */
    PagerTom.prototype.firstPage = function() {
        this.showPage(1);
    };

    /**
     * Show the last page
     *
     * @return {void}
     */
    PagerTom.prototype.lastPage = function() {
        this.showPage(this.pages);
    };

    /**
     * Show the next page
     *
     * @return {void}
     */
    PagerTom.prototype.nextPage = function() {
        this.showPage(this.page + 1);
    };

    /**
     * Show the previous page
     *
     * @return {void}
     */
    PagerTom.prototype.previousPage = function() {
        this.showPage(this.page - 1);
    };

    $.fn.extend({
        PagerTom: function(options) {
            return new PagerTom(this, options);
        }
    });

}(jQuery));
