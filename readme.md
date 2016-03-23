# Pager Tom

**Please note that this is work in progress and not production ready**

This is a Javascript pagination library.  There is no reason for the name
except that it's a pun.

> This is Ground Control to Pager Tom...

## Quickstart

To use this library, put a link to `dist/pager-tom.min.js` at the bottom of
your page, after your JQuery library is loaded.  You can put it in the header
if you want, but you probably shouldn't because that was what we did 15 years
ago when we didn't know any better and thought Javascript made your website
bad.

The `dist/pager-tom.min.css` file *should* be included in your header.  Feel
free to edit this or use the less files included to produce your own version or
merge it with your own file. Whatever.

You then need to place an element on the page where you want the pagination
buttons to appear.

```
<div id="paginate"></div>
```

Once you've done this you need to add a script that invokes the pagination, and
starts the magic.  You should include your options when initialising this.  You
can then call API methods on the pagination object.

```
<script>
var pagination = $('#paginate').PagerTom({
        'target': '#pagination',
        'itemtarget': 'div.item',
        'perpage': 10,
        'hash': 'page-'
    });

pagination.openPage(5);

</script>
```

The `target` and `itemtarget` options are really important because they are the
things it's looking at paginating.  In this example you would have something on
the page that looks a bit like this.  Not exactly like this though, that would
be a bit pointless.

```
<div id="pagination">
    <div class="item">Item 1</div>
    <div class="item">Item 2</div>
    <div class="item">Item 3</div>
    <div class="item">Item 4</div>
    <div class="item">Item 5</div>
    <div class="item">Item 6</div>
    <div class="item">Item 7</div>
    <div class="item">Item 8</div>
    <div class="item">Item 9</div>
    <div class="item">Item 10</div>
    <div class="item">Item 11</div>
</div>
```

## Prerequisites

JQuery is used to handle the DOM manipulation.  Basically because we all know,
it brings cross-browser compatibility, and because I'm lazy and it's less
typing to write `$('#id')` than `document.getElementById('id')`.

You can load any of the prerequisites by installing the npm packages.

## LESS/CSS

This uses a very Bootstrap-like design for the pagination elements.  However,
you can easily overwrite these using the included CSS/LESS.

#### `.paginate`

This is the class used for the pagination buttons.  It's a HTML `ul`.

#### `.paginate li`

This is the class for a single pagination button.

#### `.paginate li.active`

This is the current page.

#### `.paginate li.disabled`

This is a button that can't be clicked.

#### Less Variables

A number of variables are used for the colours and various sizing used.  These
are configured in the `variables.less` file.

<table>
    <thead>
        <tr>
            <th>Variable Name</th>
            <th>Default Value</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>@pt-border-radius</td>
            <td>3px;</td>
            <td>The corner radius of the pagination boxes.</td>
        </tr>
        <tr>
            <td>@pt-margin</td>
            <td>2px;</td>
            <td>The margin between each pagination box.</td>
        </tr>
        <tr>
            <td>@pt-msg-colour</td>
            <td style="background-color: #40a977; color: #fff;">#40a977;</td>
            <td>The colour of the "Page x of y" text.</td>
        </tr>
        <tr>
            <td>@pt-msg-size</td>
            <td>.86em;</td>
            <td>The size of the "Page x of y" text.</td>
        </tr>
        <tr>
            <td>@pt-side-padding</td>
            <td>6px;</td>
            <td>The horizontal (left/right) padding of the pagination boxes.</td>
        </tr>
        <tr>
            <td>@pt-top-padding</td>
            <td>4px;</td>
            <td>The vertical (bottom/top) padding of the pagination boxes.</td>
        </tr>
        <tr>
            <td>@pt-line-height</td>
            <td>1.5em;</td>
            <td>The line height of the pagination boxes.</td>
        </tr>
        <tr>
            <td>@pt-font-size</td>
            <td>1.2em;</td>
            <td>The font size of the pagination boxes.</td>
        </tr>
        <tr>
            <td>@pt-default-colour</td>
            <td style="background-color: #252525; color: #fff;">#252525;</td>
            <td>The default font colour of the pagination boxes.</td>
        </tr>
        <tr>
            <td>@pt-default-border-colour</td>
            <td style="background-color: #b0b0b0; color: #252525;">#b0b0b0;</td>
            <td>The default border colour of the pagination boxes.</td>
        </tr>
        <tr>
            <td>@pt-default-bg-colour</td>
            <td style="background-color: #efefef; color: #252525;">#efefef;</td>
            <td>The default background colour of the pagination boxes.</td>
        </tr>
        <tr>
            <td>@pt-active-colour</td>
            <td style="background-color: #f6f6f6; color: #252525;">#f6f6f6;</td>
            <td>The font colour of the current/active pagination box.</td>
        </tr>
        <tr>
            <td>@pt-active-border-colour</td>
            <td style="background-color: #358b62; color: #fff;">#358b62;</td>
            <td>The border colour of the current/active pagination box.</td>
        </tr>
        <tr>
            <td>@pt-active-bg-colour</td>
            <td style="background-color: #40a977; color: #fff;">#40a977;</td>
            <td>The background colour of the current/active pagination box.</td>
        </tr>
        <tr>
            <td>@pt-disabled-colour</td>
            <td style="background-color: #aaaaaa; color: #252525;">#aaaaaa;</td>
            <td>The font colour of any disabled pagination boxes.</td>
        </tr>
        <tr>
            <td>@pt-disabled-border-colour</td>
            <td style="background-color: #b0b0b0; color: #252525;">#b0b0b0;</td>
            <td>The border colour of any disabled pagination boxes.</td>
        </tr>
        <tr>
            <td>@pt-disabled-bg-colour</td>
            <td style="background-color: #dddddd; color: #252525;">#dddddd;</td>
            <td>The background colour of any disabled pagination boxes.</td>
        </tr>
    </tbody>
</table>

## Options

When loading the PagerTom object, you can include a number of options.  Some of
these you will almost certainly want to include, but for most of them the
default values should be fine.

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>perpage</td>
            <td>integer</td>
            <td>10</td>
            <td>The number of items that should appear on a page</td>
        </tr>
        <tr>
            <td>page</td>
            <td>integer</td>
            <td>1</td>
            <td>The page to load</td>
        </tr>
        <tr>
            <td>target</td>
            <td>string</td>
            <td>"#pages"</td>
            <td>
                The overall target element that you want to paginate.  It will
                show `perpage` child `itemtarget` elements per page.
            </td>
        </tr>
        <tr>
            <td>itemtarget</td>
            <td>string</td>
            <td>div</td>
            <td>The selector for items within a page.</td>
        </tr>
        <tr>
            <td>previous</td>
            <td>boolean|string</td>
            <td>"Previous"</td>
            <td>
                What do you want the text on the previous button to be.  If
                this is `false`, no previous button will be shown.
            </td>
        </tr>
        <tr>
            <td>next</td>
            <td>boolean|string</td>
            <td>"Next"</td>
            <td>
                What do you want the text on the next button to be.  If
                this is `false`, no next button will be shown.
            </td>
        </tr>
        <tr>
            <td>first</td>
            <td>boolean|string</td>
            <td>"First"</td>
            <td>
                What do you want the text on the first button to be.  If this
                is `false`, no first button will be shown.  If it is `true` it
                will show "1" as the first page.
            </td>
        </tr>
        <tr>
            <td>last</td>
            <td>boolean|string</td>
            <td>"Last"</td>
            <td>
                What do you want the text on the last button to be.  If this is
                `false`, no last button will be shown. If it is `true` it
                will show the number of the last page.
            </td>
        </tr>
        <tr>
            <td>otherpages</td>
            <td>boolean|integer</td>
            <td>false</td>
            <td>
                If an integer is passed to this value, it will only show that
                number of pages either side of the current page.  So if this is
                `1` and you are on page `5`, only pages `4`, `5`, and `6` will
                be shown.
            </td>
        </tr>
        <tr>
            <td>pagecount</td>
            <td>string|boolean</td>
            <td>Page [page] of [pagecount].</td>
            <td>
                This allows you to specify whether the pagecount text is
                displayed.  A `false` value will hide this.
                <br><br>
                The available options are:
                <ul>
                <li>[page] - the number of the current page being viewed.</li>
                <li> [pagecount] - the total number of pages available.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>hash</td>
            <td>boolean|string</td>
            <td>false</td>
            <td>
                Do you want the hash of the window to change. If this is a
                string, the window hash will change when clicking on a page.  
                This is useful if you want to allow a page to pick up the
                current page when refreshed.  The value will contain the
                page number as a suffix, so if it is set as "page", the URL
                will change to "#page5" if the fifth page is selected.
            </td>
        </tr>
        <tr>
            <td>animate</td>
            <td>boolean</td>
            <td>true</td>
            <td>Do you want to fade in the next page?</td>
        </tr>
    </tbody>
</table>

## API

### `.openPage(page);`

Closes the current page and opens the page specified.  If the current page is
the specified page, this will not fire.  If the specified page does not exist,
the closest possible page will be opened (ie it will open the first or last
page).

### `.nextPage();`

Closes the current page and opens the next page.  If the current page is the
last page, this will not fire.

### `.previousPage();`

Closes the current page and opens the previous page.  If the current page is
the first page, this will not fire.

### `.firstPage();`

Closes the current page and opens the first page.  If the current page is the
first page, this will not fire.

### `.lastPage();`

Closes the current page and opens the last page.  If the current page is the
last page, this will not fire.

### `.pageCount();`

Returns the number of pages.

### `.pageCountText();`

Returns the text showing the number of pages, based on the `pagecount` option.

### `.showButtons();`

Will redraw the buttons on the page.

### `.resetButtons();`

Will hide the buttons on the page.

### `.hashValue();`

Returns the page number that the window hash value is suggesting we are looking
at.  This will return 0 if it doesn't recognise the number.
