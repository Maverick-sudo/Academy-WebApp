# Cascading Style Sheet

## Summary
Cascading Style Sheets (CSS) is used to format the layout of a webpage. It handles variations in display for different devices and screen sizes (desktops, tablets, and phones). With CSS, you can control the color, font, the size of text, the spacing between elements, how elements are positioned and laid out, what background images or background colors are to be used, different displays for different devices and screen sizes, and much more.

---

## Introduction

Cascading Style Sheets (CSS) is used to format the layout of a webpage.

Responsive Web Design is about using HTML and CSS to automatically resize, hide, shrink, or enlarge a website, to make it look good on all devices (desktops, tablets, and phones). It handles variations in display for different devices and screen sizes.

With CSS, you can control the color, font, the size of text, the spacing between elements, how elements are positioned and laid out, what background images or background colors are to be used, different displays for different devices and screen sizes, and much more.

### Comments

CSS comment syntax:

```css
/* content */
```

Cheatsheet(http://www.cheat-sheets.org/sites/css.su/) & (https://overapi.com/css)

### Ruleset / Style Sheet Terms

- **Selector** — The beginning of the ruleset used to target the element that will be styled.
- **Declaration block** — The code in-between (and including) the curly braces `({ })` that contains the CSS declaration(s).
- **Declaration** — The group name for a property and value pair that applies a style to the selected element.
- **Property** — The first part of the declaration that signifies what visual characteristic of the element is to be modified.
- **Value** — The second part of the declaration that signifies the value of the property.

### Selectors (overview)

- **Universal selector** — `* {declaration block}`
- **Type selector** — `p / h1 / div {declaration block}`
- **Multiple selectors** — Separate selectors by a comma `(,)` to apply the same styling values without repetitive code.
- **Class selector** — `.className {declaration block}`
- **Chaining** — Require an element to match two or more selectors at the same time by combining selectors (separate by a full stop `.`).
- **ID selector** — `#idValue {declaration block}`
- **Descendant combinator** — Select nested elements (descendants) by separating selectors by whitespace.
- **Attribute selectors (href/src)** — Target elements with an `href` / `src` attribute, or where the attribute contains an instance of a specified value.

Pseudo-class selectors `:focus`, `:visited`, `:disabled`, `:hover`, `:active` are all pseudo-classes. Factors such as user interaction, site navigation, and position in the DOM can all give elements a different state with pseudo-class.

Syntax= `p/a/h1/div :hover {declaration block}`

Specificity is a common reason why your CSS-rules don't apply to some elements, although you think they should. IDs are the most specific selector in CSS, followed by classes, and finally, `[type]`. To make styles easy to edit, it’s best to style with a type selector, if possible. If not, add a class selector. If that is not specific enough, then consider using an ID selector.

`[href]{declaration block}` or `a[href*=‘embedLink’]{declaration block}`

`[src]{declaration block}` or `img[src*=‘value’]{declaration block}`

Note: Specificity takes priority to Chaining.
### Speciﬁcity Hierarchy

Every selector has its place in the specificity hierarchy.
There are four categories which deﬁne the speciﬁcity level of a selector:

- **Inline styles** — An inline style is attached directly to the element to be styled.

	Example:

	```html
	<h1 style="color: #ffffff;">
	```

- **IDs** — An ID is a unique identifier for the page elements, such as `#navbar`.
- **Classes, attributes and pseudo-classes** — This category includes `.classes`, `[attributes]` and pseudo-classes such as `:hover`, `:focus` etc.
- **Elements and pseudo-elements** — This category includes element names and pseudo-elements, such as `h1`, `div`, `:before` and `:after`.

The `!important` rule in CSS is used to add more importance to a property/value than normal. In fact, if you use the `!important` rule, it will override ALL previous styling rules for that specific property on that element!

The `inherit` keyword speciﬁes that a property should inherit its value from its parent element. The `inherit` keyword can be used for any CSS property, and on any HTML element.

### All CSS Attribute Selectors

| Selector | Example | Example description |
| --- | --- | --- |
| `[attribute]` | `[target]` | Selects all elements with a target attribute |
| `[attribute=value]` | `[target=_blank]` | Selects all elements with target="_blank" |
| `[attribute~=value]` | `[title~=flower]` | Selects all elements with a title attribute containing the word "flower" |
| `[attribute\|=value]` | `[lang\|=en]` | Selects all elements with a lang attribute value starting with "en" |
| `[attribute^=value]` | `a[href^="https"]` | Selects every `<a>` element whose href attribute value begins with "https" |
| `[attribute$=value]` | `a[href$=".pdf"]` | Selects every `<a>` element whose href attribute value ends with ".pdf" |
| `[attribute*=value]` | `a[href*="w3schools` | Selects every `<a>` element whose href attribute value contains the substring "w3schools" |

### CSS Colors / Syntax — `color`

- `rgb(red, green, blue)` / `color:rgb(x, y, z);`
- `rgbA(red, green, blue, alpha)` / `color:rgb(x, y, z, opacity: 0.0-1.0)`
- HEX: `#rrggbb` or `#rgb` (3-digit type)
- `hsl(hue, saturation, lightness)` / `color:hsl(a, b, c);`
- `hslA(hue, saturation, lightness, alpha)` / `color:hsla(a, b, c, opacity: 0.0-1.0);`

Alpha channels present in background-color contain set values of 0.0-1.0 to set transparency levels.

### Background Properties

| Property | Description / examples |
| --- | --- |
| `background` | Sets all the background properties in one declaration |
| `background-attachment` | Sets whether a background image is fixed (`background-attachment: fixed;`) or scrolls with the rest of the page (`background-attachment: scroll;`) |
| `background-clip` | Specifies the painting area of the background |
| `background-color` | Sets the background color of an element |
| `background-image` | Sets the background image for an element with URL. `background-image: url("paper.gif");` |
| `background-origin` | Specifies where the background image(s) is/are positioned |
| `background-position` | Sets the starting position of a background image. `background-position: right top;` |
| `background-repeat` | Sets how a background image will be repeated vertical or horizontal: `background-repeat: repeat-y;` / `background-repeat: repeat-x;` / `background-repeat: no-repeat;` |
| `background-size` | Specifies the size of the background image(s) |

Shorthand Background Property Syntax.

```css
background: #ffffff url("img_tree.png") no-repeat right top;
background-color: #ffffff;
background-image: url("img_tree.png");
background-repeat: no-repeat;
background-position: right top;
```

### Gradients

CSS gradients let you display smooth transitions between two or more specified colors.

**Linear gradients** (goes down/up/left/right/diagonally), direction can be in angles (deg). The `repeating-linear-gradient()` function is used to repeat linear gradients.

Syntax:

```css
background-image: linear-gradient(direction, color-stop1, color-stop2, ...);
```

**Radial gradients** (defined by their center) — To create a radial gradient you must also define at least two color stops.

Syntax:

```css
background-image: radial-gradient(shape size at position, start-color, ..., last-color);
```

### All CSS Text Properties

| Property | Description |
| --- | --- |
| `color` | Sets the color of text |
| `direction` | Specifies the text direction/ writing direction: `rtl;` |
| `unicode-bidi` | Used together with the direction property to set or return whether the text should be overridden to support multiple languages in the same document |
| `letter-spacing` | Increases or decreases the space between characters in a text |
| `line-height` | Sets the line height |
| `text-align` | Specifies the horizontal alignment of text: `center;` `left;` `right;` `justify` |
| `text-decoration` | Specifies the decoration added to text: `none;` `overline;` `underline;` `line-through` |
| `text-indent` | Specifies the indentation of the first line in a text-block |
| `text-shadow` | Specifies the shadow effect added to text. In its simplest use, you only specify the horizontal shadow (px) and the vertical shadow (px) with space. Can add color to shadow. |
| `text-transform` | Controls the capitalization of text: `uppercase;` `lowercase;` `capitalize;` |
| `text-overflow` | Specifies how overflowed content that is not displayed should be signaled to the user: `clip;` `ellipsis;` |
| `vertical-align` | Sets the vertical alignment of an element: `baseline;` `text-top;` `text-bottom;` `sub;` `super` |
| `white-space` | Specifies how white-space inside an element is handled |
| `word-spacing` | Increases or decreases the space between words in a text |

### All CSS Font Properties

| Property | Description |
| --- | --- |
| `font` | Shorthand syntax Use — Sets all the font properties in one declaration `{family style size weight}` |
| `font-family` | Specifies the font family for text |
| `font-size` | Specifies the font size of text |
| `font-style` | Specifies the font style for text. Normal, italic or oblique; |
| `font-variant` | Specifies whether or not a text should be displayed in a small-caps font |
| `font-weight` | Specifies the boldness of a font |

### CSS `@font-face` Rule

Web fonts allow Web designers to use fonts that are not installed on the user's computer.

Google Fonts provides free fonts that can be used in an HTML ﬁle with the `<link>` tag or the `@font-face` property.

Downloaded Local fonts can be added to a .CSS document with the `@font-face` property ruleset and the path to the font’s source in this syntax. With format verifying the file type downloaded.

```css
@font-face {

font-family: ‘myFont'; src: url(‘path’of’downloaded’font’) format('woff2’);
```

Deﬁned a name for the font e.g myFont, and then point to the font ﬁle source include font format (‘woff2’), most commonly supported by all major browsers. Whilst using bold text, you must add another `@font-face` rule containing descriptors for bold text.

The four links states are

When setting the style for several link states, there are some order rules: Links can be styled with any CSS property (e.g. color, font-family, background, etc.).

### Pseudo-classes and Pseudo-elements

What are Pseudo-classes? A pseudo-class is used to deﬁne a special state of an element. Example it can be used to:

- Style an element when a user mouses over it
- Style visited and unvisited links differently
- Style an element when it gets focus

CSS Syntax `selector :pseudo-class {}`

What are Pseudo-Elements? A CSS pseudo-element is used to style specified parts of an element. Example, it can be used to:

- Style the first letter, or line, of an element
- Insert content before, or after, the content of an element

CSS Syntax `selector ::pseudo-element {}`

Link states:

- `a:link` - a normal, unvisited link
- `a:visited` - a link the user has visited
- `a:hover` - a link when the user mouses over it
- `a:active` - a link the moment it is clicked

Syntax `a:link/visited/hover/active {declaration}`

Multiple Syntax can be declared with comma operator to separate.

### Transparent Hover Effect

The opacity property is often used together with the `:hover` selector to change the opacity on mouse-over. The opacity property can take a value from 0.0 - 1.0. The lower value, the more transparent:

```css
img {opacity: 0.5;}
```

Makes the image 50% transparent

```css
img:hover {opacity: 1.0;}
```

declare to make the image clear. Non-tansparent.

### All CSS List Properties for `<ol>` & `<ul>`

| Property | Description |
| --- | --- |
| `list-style: type position image;` | Sets all the properties for a list in one declaration |
| `list-style-image: url(‘xyz.gif/jpg’)` | Specifies an image as the list-item marker |
| `list-style-position: inside/ outside;` | Specifies the position of the list-item markers (bullet points) |
| `list-style-type: circle/ square/upper-roman/lower-alpha;` | Specifies the type of list-item marker |

### CSS Table Properties for `<table>` `<th>` `<td>`

| Property | Description |
| --- | --- |
| `border` | Sets all the border properties in one declaration |
| `border-collapse` | Specifies whether or not table borders should be collapsed |
| `border-spacing` | Specifies the distance between the borders of adjacent cells |
| `caption-side` | Specifies the placement of a table caption |
| `empty-cells` | Specifies whether or not to display borders and background on empty cells in a table |
| `table-layout` | Sets the layout algorithm to be used for a table |

### Overflow Property

The overflow property controls what happens to content that spills, or overflows, outside its box. The `overflow-x` and `overflow-y` properties specifies whether to change the overflow of content just horizontally or vertically (or both).

- `overflow: visible;` — when set to this value, the overflow content will be displayed outside of the containing element. Note, this is the default value
- `overflow: hidden;` — when set to this value, any content that overflows will be hidden from view.

Parent Element containing children element can have overflow values of:

- `overflow: inherit;`
- `overflow: initial;`
- `overflow: revert;`
- `overflow: unset;`
- `overflow: scroll;` — when set to this value, a scrollbar will be added to the element’s box so that the rest of the content can be viewed by scrolling.
- `overflow: clip;`
- `overflow: auto;`
- `overflow: hidden visible;`

### CSS Outline

An outline is a line that is drawn around elements, OUTSIDE the borders, to make the element "stand out". With properties style, color, width, offset.

#### Shorthand Property——>

- `outline: width style color;`
- `outline-color` — Sets the color of an outline
- `outline-offset` — Specifies the space between an outline and the edge or border of an element
- `outline-style` — Sets the style of an outline
- `outline-width` — Sets the width of an outline

### Display property:—> inline, block, and inline-block

Inline by default (examples): `<em>`, `<strong>`, `<span>`, `<img>` and `<a>`.

Inline elements cannot be altered in size with the height or width CSS properties.

Elements that are block-level by default include all levels of heading elements (`<h1>` through `<h6>`), `<li>`, `<p>`, `<div>`, `<form>`, `<header>`, `<section>` and `<footer>`.

`<img>` are the best example of default inline-block elements. However we can make adjusted to this elements using this declaration in respective element selector
```css
{display: inline;}
```

The CSS display property provides the ability to make any

element an inline element. This includes elements that are not inline by default.
```css
{display: block;}
```

The CSS display property provides the ability to make any element a block element.
```css
{display: inline-block}
```

### Inline-block display combines features of both inline and

block elements. Inline-block elements can appear next to each other and we can

specify their dimensions using the width and height properties, the top and

bottom margins/paddings are respected. Compared to display: block; the major

difference is that display: inline-block; does not add a line-break after the

element, so the element can sit next to other elements. One common use for

display: inline-block is to display list items horizontally instead of vertically. The following example creates horizontal navigation links:
```css
{display: visibility}
```

Specifies whether or not an element should be visible
### 𝟏 Display & Positioning Property CONTENT-BOX MODEL

All elements on a web page are interpreted by the browser as “living” inside of a
box. This is what is meant by the box model. The content box model allows us to

add a border around elements, and to define space between elements living in a one-dimensional layout.

**Content/element** — The content of the box, where text and images appear.

**CSS Setting Content/Element height and width**

The height and width properties are used to set the height and width of an element. The height and width properties do not include padding, borders, or margins. It sets the height/width of the area inside the padding, border, and margin of the element.

The height and width properties may have the following values:

- `auto` - This is default. The browser calculates the height and width
- `length` - Defines the height/width in px, cm etc.
- `%` - Defines the height/width in percent of the containing block
- `initial` - Sets the height/width to its default value
- `inherit` - The height/width will be inherited from its parent value

NOTE: Using max-width instead, in this situation, will improve the browser's handling of small windows.

**Padding** — Clears an area around the content. The padding is transparent

CSS Padding: The CSS padding properties are used to generate space around an element's content, inside of any defined borders.

`padding-top:` & `padding-right:` & `padding-bottom:` & `padding-left:`

**Margin** — Clears an area outside the border. The margin is transparent

CSS Margins: The CSS margin properties are used to create space around elements, outside of defined borders.

`margin-top:` & `margin-right:` & `margin-bottom:` & `margin-left:`

- `auto` - the browser calculates the margin
- `length` - specifies a margin in px, pt, cm, etc.
- `%` - specifies a margin in % of the width of the containing element
- `inherit` - specifies that the margin should be inherited from the parent element.

**Border** — A border that goes around the padding and content

`{border-style: dotted/dashed/ double/groove/ridge/inset/ outset/hidden/;}`

`border-width:` (in px, pt, cm, em, etc); or thin, medium, or thick;

`border-color:` (colors, rgb values, #hex, hsl values etc)

SHORTHAND SYNTAX
```css
{width/lengthPX:…; border:….: padding:…; margin:…;}
```

SYNTAX margin: value(auto, length in px,)

SYNTAX padding: value(auto, length in px,); SYNTAX border: width style color;
### ﬂoat & clear property

Used for positioning and formatting content e.g. let an image ﬂoat left to the

text in a container. In its simplest use, the ﬂoat property can be used to wrap

text around images. When we use the ﬂoat property, and we want the next

element below (not on right or left), we will have to use the clear property.
The ﬂoat/clear property can have one of the following values

- `left` - The element floats to the left of its container/The element is pushed below left ﬂoated elements
- `right` - The element floats to the right of its container/The element is pushed below right ﬂoated elements
- `none` - The element does not ﬂoat (will be displayed just where it occurs in the text). This is default float./The element is not pushed below left or right floated elements. This is default clear.
- `inherit` - The element inherits the float/clear value of its parent element.
### Navigation bars (via display / float)

We can use display properties to set Navigation bars vertically or horizontally using inline or float to create Horizontal navigation bar, & Block to create Vertical navigation bar.

### 𝟐 Display & Positioning Property:—> Flexbox Model

The Content-box model However has a limitation as most browsers use a default dimensional value for sizing.

NOTE

TO solve this limitation , border-box model/ﬂexbox is not affected by border thickness or padding as with content-box model.

However both Content-Box Model & FlexBox is mostly useful for positioning items in a one-dimensional layout.

This syntax `* {box-sizing: border-box;}` we insert before `body{}` element.

Box-sizing property allows us to include the padding and border in an element's total width and height.

There are two important components to a ﬂexbox layout: ﬂex containers and ﬂex items.

A flex container is an element on a page that contains flex items. All direct child elements of a flex container are flex items.

Flex containers are helpful tools for creating websites that respond to changes in screen sizes. To designate an element as a flex container, set the element’s display properties to either flex or inline-flex.
```css
{display: ﬂex;}
```

changes an element to a block-level container with flex items inside of it.
```css
{display: inline-ﬂex;}
```

allows multiple flex containers to appear inline with each other.
Flexbox is an art and a science; you can use it to make laying out multiple elements a piece of cake.

Flex containers can be nested inside of each other by declaring `{display: flex ;}` / `{display: inline-flex;}` for children of flex containers.

There are two axes in a layout — the column (or block) axis and the row (or inline) axis.

Shorthand Syntax `{flex:  flex-grow flex-shrink flex-basis;}` in one declaration.

Shorthand Syntax `{flex-flow: flex-wrap flex-direction;}` in one declaration.

- `display: flex` changes an element to a block-level container with flex items inside of it.
- `display: inline-flex` allows multiple flex containers to appear inline with each other.
- `flex-shrink` is used to specify how much flex items shrink and in what proportions along the main axis.
- `flex-basis` is used to specify the initial size of an element styled with `flex-grow` and/or `flex-shrink`.
- `justify-content` is used to space items along the main axis.
- `flex-wrap` specifies that elements should shift along the cross axis if the flex container is not large enough.
- `align-items` is used to space items along the cross axis.
- `align-content` is used to space rows along the cross axis (rows).
- `flex-grow` is used to specify how much space (and in what proportions) flex items absorb along the main axis.
- `flex-direction` is used to specify the main (columns) and cross axis (rows).

### Display & Positioning Property:—> CSS Grids

Content-Box Model & FlexBox is mostly useful for positioning items in a one-dimensional layout. CSS grid is most useful for two-dimensional layouts, providing many tools for aligning and moving elements across both rows and columns.

A grid layout consists of a parent element, with one or more child elements.

To set up a grid, you need to have both a grid container and grid items.

The CSS Grid Layout Module offers a grid-based layout system, with rows and columns, making it easier to design web pages without having to use floats and positioning.

To turn an HTML element into a grid container, you must set the element’s display property to one of two values:

- `{display: grid;}` for a block-level grid
- `{display: inline-grid;}` for an inline grid

`justify-items` specifies how individual elements should spread across the row axis

Rows are defined as a percentage of the grid’s height, and columns are defined as a percentage of its width.

By default grids contain one columns, to add more we use the syntax below. Likewise for rows.

```css
{grid-template-columns: px/%value px%value;}
{grid-template-rows: px/%value px/ %value;}
```

Shorthand Syntax

```css
{grid-template: px/% Rows / px/% columns;}
```

To prevent irregular shrinking/ enlargement of grids due to browser size specifications, we can set a minimax to prevent rows & columns from getting too big or too small. Don’t use fraction.

Syntax:

```css
{grid-template-rows or grid-template-columns: 10px minmax(10px, 20px) 50px;}
```

`justify-content` specifies how groups of elements should spread across the row axis

NOTE: percentages (%), px, ems and rems.

CSS Grid introduced a new relative sizing unit — fr, fraction of the grid’s length and width.

Using fr makes it easier to prevent grid items from overflowing the boundaries of the grid.

Consider the syntax `{grid-template: 2fr 1fr 1fr / 1fr 3fr 1fr;}`.

Note: The repeat function will duplicate the specifications for rows or columns a given number of times, a relationship where grid property takes function as a value.

Syntax `{grid-template-columns/rows: repeat(X, fr);` it will duplicate the designated fractional rates by number X times. We can apply this to grid-template.

`justify-self` specifies how a single element should position itself with respect to the row axis

The CSS properties `grid-row-gap:` and `grid-column-gap:` will put blank space between every row and column in the grid. It is important to note that grid gap properties does not add space at the beginning or end of the grid.

Unlike other CSS grid properties, this shorthand does not take a / between values! If only one value is given, it will set the column gap & the row gap to that value.

Syntax will be `{grid-gap: row-gap-px column-gap-px;}`

`align-items` specifies how individual elements should spread across the column axis

To enable elements sitting inside the grid take more than 1 row/column, using `{grid-row/column-start:}` or `{grid-row/column-end:}`.

The value for start should be the row at which you want the grid item to begin. The value for end should be one greater(+1) than the row at which you want the grid item to end.

Shorthand Syntax `{grid-row or column: start/ end;}`

We can use the word span when specifying grid row/columns end to avoid miscalculating the ending grid line. For instance, we want row/columns to span 1/2/3 rows we specify it in our syntax.

Note `{grid-area: grid-row-start(w) / grid-column-start(x) / grid-row-end(y) / grid-column-end(z);}` or `{grid-area: w / x / y / z;}`

`align-content` specifies how groups of elements should spread across the column axis

Grid Template Areas

The `grid-template-areas` property allows you to name sections of your web page to use as values in the grid-row-start, grid-row-end, grid-column-start, grid-column-end, and grid-area properties.

This property is declared on grid containers.

```css
{grid-template-areas: ⇔”rows” ↕”columns”;
⇔”rows1” ↕”columns1”;
⇔”rows2” ↕”columns2”;}
```

Also declare their grid-area in their respective class declaration block. `{grid-area: row1;}` Either in header, nav, footer, etc.

`align-self` specifies how a single element should position itself with respect to the column axis
## Implicit & Explicit Grids

The implicit grid is an algorithm built into the specification for CSS Grid that determines default behavior for the placement of elements when there are more than fit into the grid specified by the CSS.

CSS Grid provides two properties to specify the size of grid tracks added implicitly: `grid-auto-rows` and `grid-auto-columns`. These properties are declared on grid containers.

Explicit Grid / Auto Flow

In addition to setting the dimensions of implicitly-added rows and columns, we can specify the order in which they are rendered.

- `grid-auto-rows:` specifies the height of implicitly added grid rows.
- `grid-auto-columns:` specifies the width of implicitly added grid columns.
- `grid-auto-flow:` specifies whether new elements should be added to rows or columns, and is declared on grid containers.

`grid-auto-rows` & `grid-auto-columns` accept the unit of values as their explicit counterparts, `grid-template-rows` and `grid-template-columns`: pixels (px) / percentages (%) / fractions (fr) / the repeat() function.

`grid-auto-flow` accepts these values:

- `row;` — specifies the new elements should fill rows from left to right and create new rows when there are too many elements (default)
- `column;` — specifies the new elements should fill columns from top to bottom and create new columns when there are too many elements
- `dense;` — this keyword invokes an algorithm that attempts to fill holes earlier in the grid layout if smaller elements are added

You can pair row or column with dense, like this:

```css
grid-auto-flow: row dense
```
### All CSS Positioning Properties

An element with `position: static;` is not positioned in any special way; it is always positioned according to the normal ﬂow of the page.

An element with `position: relative;` is positioned relative to its normal position.

An element with `position: ﬁxed;` is positioned relative to the viewport, which means it always stays in the same place even if the page is scrolled.

An element with `position: absolute;` is positioned relative to the nearest positioned ancestor (instead of positioned relative to the viewport, like fixed).

An element with `position: sticky;` is positioned based on the user's scroll position.

| Property | Description |
| --- | --- |
| `{position: static/relative/ fixed/absolute/sticky;}` | Specifies the type of positioning for an element |
| `bottom/left/right/top` | Sets the bottom/left/right/ top margin edge for a positioned box |
| `clip` | Clips an absolutely positioned element |
| `z-index: x/-y(integer);` | When elements are positioned, they can overlap other elements. The z-index property specifies the stack order of an element (which element should be placed in front of, or behind, the others). Sets the stack order of an element |

### Transitions

CSS transitions allow us to control the timing of visual state changes.

We can control the following four aspects of an element’s transition:

- Which CSS (properties) transition
- How long a transition lasts (Duration)
- How much time there is before a transition begins (Delay)
- How a transition accelerates

Which CSS (properties) transition

To declare which property transitions we use this syntax:

```css
{transition-property: property(color/background-color/font-size, etc);}
```

How long a transition lasts (Duration)

After declaring transition on a property we can declare:

```css
{transition-duration: s;}
```

in seconds or milliseconds.

How much time there is before a transition begins (Delay)

Delay speciﬁes the time to wait before starting the transition.

```css
{transition-delay: s;}
```

in seconds or milliseconds.

How a transition accelerates

```css
{transition-timing-function: ease-in / ease-out / ease-in-out / linear;}
```

The timing function describes the pace of the transition. The default value is ease, which starts the transition slowly, speeds up in the middle, and slows down again at the end.

Shorthand Syntax
```css
{transition: property duration timing-function delay;}
```

To clean up your work since multiple declaration of transition properties might be messy. We can use the shorthand syntax and a comma operator for separate properties.
Such as:

```css
{transition: color duration timing-function delay, background-color duration timing-function delay, font-size duration timing-function delay;}
```

This

“chaining” is a powerful tool for expressing complicated animations. Even with the shorthand, specifying transitions for many properties can be tedious. It is common to use the same duration, timing function, and delay for multiple properties. When this is the case you can set the transition-property value to all. This will apply
the same values to all properties. To effect this, you can use all as a value for transition-property.
all means every value that changes will be transitioned in the same way. You can

use all with the separate transition properties, or the shorthand syntax. This

allows you to describe the transition of many properties with a single line:

### Responsive design

Responsive design refers to the ability of a website to resize and reorganize its content based on:

- The size of other content on the website
- The size of the screen the website is being viewed on

Relative measurements offer an advantage over hard coded measurements (pixels), as they allow for the proportions of a website to remain intact regardless of screen size or layout.

#### Relative Units & What elements they apply too

To size text based HTML elements:

- The em however represents the font-size of the current element in relation to the default base font-size set by the browser if none is given. i.e 1em = 16px (most browsers default font size).
- The rem stands for root em, it works similarly to em, however its measured related to the root element—>the `<html>` tag with syntax. `html {font-size: rem;}`

If you are interested in sizing elements consistently across an entire website, the rem measurement is the best unit for the job. If you’re interested in sizing elements in comparison to other elements nearby, then the em unit would be better suited for the job.

To size non-text HTML elements:

Percentages are often used to size box-model values, like width and height.

Padding, border, and margins are sized relative to the dimensions their parent element (container). They can also be used to set positioning properties (top, bottom, left, right).

Note: Because the box model includes (padding + borders + margins) as total content width & height, setting an element’s width to 100% may cause content to overﬂow its parent container. While tempting, 100% should only be used when element content will not have padding, border, or margin.

Note: When the height of an image or video is set, then its width can be set to auto so that the media scales proportionally. Reversing these two properties and values will also achieve the same result.

A background image of an HTML element will scale proportionally when its background-size property is set to cover.

#### What is The Viewport?

The viewport is the user's visible area of a web page. The viewport varies with the device, and will be smaller on a mobile phone than on a computer screen.

Setting The Viewport

HTML5 introduced a method to let web designers take control over the viewport, through the `<meta>` tag. You should include the following `<meta>` viewport element in all your web pages:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

This gives the browser instructions on how to control the page's dimensions and scaling.

The width=device-width part sets the width of the page to follow the screen-width of the device (which will vary depending on the device). The initial-scale=1.0 part sets the initial zoom level when the page is first loaded by the browser.

#### Responsive Web design

CSS uses media queries to adapt a website’s content to different screen sizes.

With media queries, CSS can detect the size of the current screen and apply different CSS styles depending on the width of the screen.

Media queries can set rules based on features like the screen width, the screen resolution and device orientation.

Media query syntax. The declaration block containing rules can be from any CSS element ruleset in your programming.

```css
@media only screen and (max-width: 480px) body {font-size: 12px;}
```

This syntax (@media) instructs the CSS compiler which type of devices (only screen) with (max-width 480px) to apply the CSS styles to devices with a width of 480 pixels or smaller.

CSS rules (body) are nested inside the media query curly brackets. The rule is element & declaration block you want to be applied for screen type 480px nd lower.

We can also add ranges for screen sizes height (both minimum and maximum px values).

```css
@media only screen and (min-width: px) and (max-width: px) {}
@media only screen and (min-height: px) and (max-height: px) {}
```

Many times we will want to supply higher quality media (images, video, etc.) only to users with screens that can support high resolution media. Targeting screen resolution also helps users avoid downloading high resolution (large ﬁle size) images that their screen may not be able to properly display.

```css
@media only screen and (min-resolution: dpi) and (max-resolution: dpi)
{background-image {}}
```

The rule can be applied to background image, or videos sources. Min and max-resolutions can be supplied. This code will exchange the existing image/video with a higher/lower resolution logo.

We can use the and* operator to chain multiple media features.

```css
@media only screen and (min/max-width/height: px) and (min/max-resolution dpi) {declare multiple element content ruleset corresponding to media queries}
```

If only one of multiple media features in a media query must be met, media features can be separated in a comma separated list.

Note: The orientation media feature detects if the page has more width than height. If a page is wider, it’s considered landscape, and if a page is taller, it’s considered portrait.

```css
@media only screen and (orientation: landscape/portrait) {declare element content ruleset corresponding to media queries}
```

## CSS Variables

Variables allow information to be maintained and referenced in multiple locations.

CSS has variables in its own style—more speciﬁcally, they are called Custom Properties.

These variables can be used to hold specific values that can be reused throughout the stylesheet. When we deﬁne variables in place of hardcoded properties, the variable does not immediately take the place of that property’s value until we call that variable.

Syntax for declaring variables in CSS must begin with a double hyphen (`--`) followed by the variable name.

Good practice to avoid using capital letters in variable names, it is also common to use single hyphen in between for multiple strings.

`element{--name: diablo;}` , `element{—my-name: diablo;}`.

By using variables alongside media queries, we can dynamically change styles according to changes in viewport size and general system preference.

When using media queries with CSS variables, the main point of note is that we just need to redefine variable values for the effect to take place.

Variables must be used as an argument inside of the var() function.

```css
h1 { --main-background-color: #DADECC; background-color: var(--main-background-color);
/*declared a variable & assigned it to #HEX color values*/
/* it replaces value of property in declaration{} using var
```

Variables are subject to both scope and inheritance.

Globally scoped variables are defined inside the `:root{}` pseudo-class.

Locally scoped variables are defined inside the desired selector ruleset.

Overriding a variable is done by redefining that variable’s value inside of the desired selector ruleset.

Fallback values can be used to provide a backup value if the initial variable is invalid.

Multiple fallback values can be provided by adding more values inside cascading `var()` functions.

```css
body {background: var(--main-background-color, #F3F3F3);}

/* #F3F3F3 is fallback value, if —main-background-color is invalid*/

body { font-color: var(--main-color, var(--favorite-orange, red));
/* --favorite-orange if --main-color is invalid and red if --favorite-orange is invalid */
```

## CSS Functions

CSS functions—are blocks of organized and reusable code that help to perform a single, related action.

Functions have the beneﬁt of keeping code modular and allowing for a high degree of reusability. However they are limited.

url(), var(), repeat(), min(), max(), calc(), clamp().

Some CSS functions are used specifically for certain properties i.e Color Functions rgb(), rgba(), hsl(), hsla().

To use a function in CSS, follow the standard functional notation syntax: `h1 { property: function-name(argument);`

The calc() function can be used to perform mathematical operations on a mix of units (rem, vw, px, etc).

When performing addition (+) or subtraction (-), both numbers being operated on must have speciﬁed units.

Division (/) requires the divisor (second operand) to be a unit-less number, and multiplication (*) requires one of the operands to be unit-less.

The function can also be used as one of the multiple values for a property or argument in another function.

Ex:

```css
{margin: calc(1.5vw + 5px);}
```

The min() function will select the smallest value from a range of values and set that as the associated property’s value.

The max() function will select the largest value from a range of values, which will be used as the associated property’s value.

The clamp() function enables a specified value to be kept within an upper and lower bound.

The clamp(x, y, z) function takes three parameters in a speciﬁc order

- The ﬁrst argument speciﬁes the minimum value(x). If the preferred value (second argument), is less than this value, then the minimum value will be used.
- The second argument specifies the preferred value(y). This value is used as long as it is greater than the value of the ﬁrst argument (lower bound) and less than the value of the third argument (upper bound).
- The third argument speciﬁes the maximum value(y). This value is the largest value that the property will be set to.

The Filter Function, are specifically for the filter & backdrop-filter properties.

These functions create a variety of visual effects for desired elements with properties values such as brightness(), blur(), saturate(), drop-shadow(offset-x offset-y blur-radius color)

Both offset-x and offset-y are required arguments that determine the horizontal and vertical offset respectively.

While blur-radius is an optional argument that determines the shadow’s blur radius—the larger the value, the more blurred the shadow.

Finally, the color argument is also optional and determines the shadow’s color.

Notice that it is not necessary to separate each of the function’s arguments with commas etc

### Transform Functions

We can transform any HTML element using the transform property combined with CSS functions that scale(x-axis, y-axis), rotate(︒deg), translate(x-axisPX, y-axisPX) and skew(x-angle,y-angle).

These functions apply both 2D transformations to elements.

The matrix() method combines all the 2D transform methods into one.

The matrix() method take six parameters, containing mathematic functions, which allows you to rotate, scale, move (translate), and skew elements.

Syntax:

```css
matrix(scaleX(),skewY(),skewX(),scaleY(),translateX(),translateY());
```

Check CSS references for list of 3D transformation functions.

## Introduction to Web Accessibility

Properties Recommendation:

- font-size a minimum size between 18 to 20 pixels is recommended for smaller screen sizes.
- Line height/spacing between lines of text. recommend a minimum of 1.5 within paragraphs.
- Text alignment and paragraph width It is recommended to have 45 to 85 characters per line, with the ideal being suggested as 65 characters.
- Visual Readability: Color The solution to this is to provide adequate contrast between foreground and background elements

https://www.google.com/ chrome/canary/

Contextual Readability: Interactivity

- Using `<abbr>` to make full information provided. Hovering over the text contained in this element will display an alternative name for the user.
- Underlining links is another way to provide clarity.
- Use of interactive elements such as button with cursor property indicating potential interactivity.

Contextual Readability: Color

Color can also be used as a contextual indicator of intent or meaning, indication of success and error states.

Visibility

Hiding content from everyone, hiding content from screen readers, & hiding content from both.

Design Reflecting Structure

An important consideration when applying CSS to a page is the relationship that the CSS stylesheet has with the HTML document’s underlying structure.

Accessibility Across Mediums.

`@media screen{}` vs `@media print{}` considering the other ways in which users can consume the content of your web page.

For example, how does the page look when printed?

The print query syntax can be used to remove element such as `<nav>` reducing clutter when printed.

Or to display values of elements otherwise couldn’t be understood such as links.
### Browser Compatibility

The ability for a website to be rendered in the same way across all available modern browsers.

The availability of CSS features differs across browsers and their versions. Using a CSS property supported only on select browsers will create inconsistent experiences for users. Thankfully, there are tools such as caniuse.com that can help you find out what browsers support a particular CSS feature.

Browsers are based on browser engines—the core component responsible for rendering HTML, CSS, and JavaScript in the browser.

For example, Chrome, Opera, and Edge use Blink as their browser engine, whereas Firefox uses Gecko and Safari uses Webkit.

Each of these engines renders features such as margins, padding, colors, or text slightly differently. This is because different browsers have different default styles.

We can use tools such as browserdefaultstyles.com to compare default styles across browsers.

There are also tools that we can use, such as normalize.css and minireset.css, to eliminate differences between browser default styles and ensure that all elements are rendered the same way across browsers.

Vendor preﬁxes are preﬁxes for property names that were developed as a way of testing new CSS features or standards before browsers fully supported them.

These preﬁxes were never intended to be used on production websites, but they are sometimes required to use certain new and cutting-edge features or to support older versions of browsers when those features were cutting edge.

Rather than looking through every CSS feature on your site to determine which features require vendor preﬁxes, you can also use tools such as https://github.com/postcss/autoprefixer to automatically include all vendor prefixes for the features that require them.

Polyﬁlls are JavaScript codes that allow older browsers to behave as though they understand more advanced features than they actually do. These codes rewrite the HTML and CSS codes to simulate features that have not yet been adopted by that version of the browser.

For a more comprehensive solution, we can use tools such as https://github.com/Modernizr/Modernizr or https://github.com/financial-times/polyfill-service to automatically identify and provide all of the polyfills that our website might need, ensuring that it can run as smoothly as possible on older browsers.

/*BootStrap*/

## Bootstrap

Bootstrap is a framework of readily available code that integrates with HTML to create stylized websites that adapt the layout to users’ screen sizes.

Bootstrap simplifies the layout of a website using a grid system. This framework allows us to cut down on the time needed to style a website, simplifies the complexity of how to layout elements, works across multiple browsers, and reduces the frustration of using plain CSS.

Using the Bootstrap grid also allows for responsive design, in other words, a website’s layout can change based on the user’s screen size.

All it takes to use Bootstrap is a few additional lines in our HTML document.

To incorporate Bootstrap into a project, the Bootstrap CSS library for styling & layout. Use Content Delivery Network (CDN).

```html
<!-- CSS only -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

<!-- JavaScript Bundle with Popper -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
```

Or Download Bootstrap 4 from getbootstrap.com & use their search button to find syntax template & examples for anything.

```css
$theme-colors: (
	"primary": $primary,
	"secondary": $secondary,
	"success": $success,
	"info": $info,
	"warning": $warning,
	"danger": $danger,
	"light": $light,
	"dark": $dark
)
```

### ScreenWidth & Small Prefix

xs (<=576px), sm (>=576px), md (>=768px), lg (>=992px) or xl (>=1200px)

Sizing utilities class: Xs-extraSmall Sm-small Md-medium Lg-large Xl-extraLarge

Set the width of an element with the w-* classes (.w-25, .w-50, .w-75, .w-100, .mw-100) &

Set the height of an element with the h-* classes (.h-25, .h-50, .h-75, .h-100, .mh-100)

The classes are used in the format: `{property}{sides}-{size}` for xs and `{property}{sides}-{breakpoint}-{size}` for sm, md, lg, and xl.

Where property is one of:

- m - sets margin
- p - sets padding

Where sides is one of:

- t - sets margin-top or padding-top
- b - sets margin-bottom or padding-bottom
- l - sets margin-left or padding-left
- r - sets margin-right or padding-right
- x - sets both padding-left and padding-right or margin-left and margin-right
- y - sets both padding-top and padding-bottom or margin-top and margin-bottom
- blank - sets a margin or padding on all 4 sides of the element

Where size is one of:

- 0 - sets margin or padding to 0
- 1 - sets margin or padding to .25rem (4px if font-size is 16px)
- 2 - sets margin or padding to .5rem (8px if font-size is 16px)
- 3 - sets margin or padding to 1rem (16px if font-size is 16px)
- 4 - sets margin or padding to 1.5rem (24px if font-size is 16px)
- 5 - sets margin or padding to 3rem (48px if font-size is 16px)
- auto - sets margin to auto

margins can also be negative, by adding an "n" in front of size:

- n1 - sets margin to -.25rem (-4px if font-size is 16px)
- n2 - sets margin to -.5rem (-8px if font-size is 16px)

- n3 - sets margin to -1rem (-16px if font-size is 16px)
- n4 - sets margin to -1.5rem (-24px if font-size is 16px)
- n5 - sets margin to -3rem (-48px if font-size is 16px)

Classes ref(https://www.w3schools.com/bootstrap4/bootstrap_ref_all_classes.asp)

Bootstrap uses classes to apply CSS rulesets — these rulesets dictate the layout and styling of the <element>.

### Containers and Jumbotron

- The .container class provides a responsive fixed width container
- The .container-fluid class provides a full width container, spanning the entire width of the viewport.
- The max-width of the container will change on different screen sizes/viewports.

Or

A jumbotron indicates a big grey box for calling extra attention to some special content or information.

Use a `<div>` element with class .jumbotron to create a jumbotron, full-width Jumbotron with class .jumbotron-fluid

### Typography and colors

Bootstrap 4 styles HTML headings (`<h1>` to `<h6>`) with a bolder font-weight and an increased font-size using display classes:

(.display-1, .display-2, .display-3, .display-4)

Display headings are used to stand out more than normal headings (larger font-size and lighter font-weight), and there are four classes to choose from.

Bootstrap 4 has some contextual classes that can be used to provide "meaning through colors".

The classes for text colors are:

.text-muted, .text-primary, .text-success, .text-info, .text-warning, .text-danger, .text-secondary, .text-white, .text-dark, .text-body (default body color/often black) and .text-light.

The classes for background colors are:

.bg-primary, .bg-success, .bg-info, .bg-warning, .bg-danger, .bg-secondary, .bg-dark and .bg-light.

Note that background colors do not set the text color, so in some cases you'll want to use them together with a .text-* class.

### Display utilities

Block Elements

To make an element into a block element, add the .d-block class.

Use any of the d-*-block classes to control WHEN the element should be a block element on a specific screen width (I.e * = sm,md,lg,xl).

.d-inline-block makes an element inline block

### Images

<img> classes include

- .rounded
- .rounded-circle
- .img-thumbnail

We can align images to left/right using .float-left/.float-right class.

Or centered aligned images with .mx-auto (margin:auto) & .d-block (display:block)

Images come in all sizes. So do screens. Responsive images automatically adjust to fit the size of the screen.

Create responsive images by adding an .img-fluid class to the `<img>` tag. The image will then scale nicely to the parent element.

The .img-fluid class applies `max-width: 100%;` and `height: auto;` to the image.

### Alerts

Alerts are created with the .alert class, followed by one of the contextual classes:

.alert-success, .alert-info, .alert-warning, .alert-danger, .alert-primary, .alert-secondary, .alert-light or .alert-dark.

You may add alert-link class to any links inside the alert box to create “matching colored links”

To close the alert message, add a .alert-dismissible class to the alert parent container.

Then add `class="close"` and `data-dismiss="alert"` to a link or a button child element (when you click on this the alert box will disappear).

### Buttons

Bootstrap provides different styles of buttons with colors. The button classes can be used on `<a>`, `<button>`, `<input>` elements.

Buttons are creates with the .btn class, followed by any one of conceptual classes for sizes, color, active/disabled states.

Use the .btn-lg class for large buttons or .btn-sm class for small buttons.

Add class .btn-block to create a block level button that spans the entire width of the parent element.

```html
class="btn btn-primary btn-lg"
class="btn btn-primary active"
```

Bootstrap 4 allows you to group a series of buttons together (on a single line) in a button group.

Use a `<div>` element with class .btn-group to create a button group.

Use the class .btn-group-vertical to create a vertical button group

### Badges

Badges are used to add additional information to any content.

Use the .badge class together with a contextual class .badge-* (I.e .badge-secondary) within `<span>` elements to create rectangular badges with color.

Note that badges scale to match the size of the parent element (if any).

Use the .badge-pill class to make the badges more round

### Spinners / loaders

To create a spinner/loader, use the .spinner-border class.

Use text color utilities to add color to the spinner.

.spinner-grow class if you want the spinner/loader to grow instead of spin.

Use .spinner-border-sm or .spinner-grow-sm to create a smaller spinner

### Pagination

To create a basic pagination, add the .pagination class to an `<ul>` element.
Then add the .page-item to each `<li>` element.

For redirect link add a .page-link class to each link `<a>` tag inside `<li>`

### Basic List Groups

The most basic list group is an unordered list with list items

To create a basic list group, use an `<ul>` element with class .list-group, and `<li>` elements with class .list-group-item

Use the .active class to highlight the current item……

If you want the list items to display horizontally instead of vertically (side by side instead of on top of each other), add the .list-group-horizontal class to .list-group….

The classes for coloring list-items are:

.list-group-item-success, list-group-item-secondary, list-group-item-info, list-group-item-warning, .list-group-item-danger, .list-group-item-primary, list-group-item-dark and list-group-item-light

### Dropdown menus

A dropdown menu is a toggleable menu that allows the user to choose one value from a predefined list.

The .dropdown class indicates a dropdown menu.

To open the dropdown menu, use a button or a link with a class of .dropdown-toggle and the `data-toggle="dropdown"` attribute.

⎋(https://www.w3schools.com/bootstrap4/bootstrap_ref_js_dropdown.asp)

Add the .dropdown-menu class to a `<div>` element to actually build the dropdown menu.

Then add the .dropdown-item class to each element (links or buttons) inside the dropdown menu.

The .dropdown-divider class is used to separate links inside the dropdown menu with a thin horizontal border.

They also come with .active & .disabled classes.

To position

```html
<div class="dropdown">
	<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
		Dropdown button
	</button>
	<div class="dropdown-menu">
		<a class="dropdown-item" href="#">Link 1</a>
		<a class="dropdown-item" href="#">Link 2</a>
		<a class="dropdown-item" href="#">Link 3</a>
	</div>
</div>
```

### Collapsibles

Collapsibles are useful when you want to hide and show large amount of content.

By default, the collapsible content is hidden. However, you can add the .show class to show the content by default.

⎋(https://www.w3schools.com/bootstrap4/bootstrap_ref_js_collapse.asp)

### Nav Menus

If you want to create a simple horizontal menu, add the .nav class to a `<ul>` element, followed by .nav-item for each `<li>` and add the .nav-link class to their links `<a>` tags.

Add the .justify-content-center class to center the nav, and the .justify-content-end class to right-align the nav. Left-align is default….

For Vertical Nav Menus use .nav flex-column class on parent `<ul>` tags…..

Turning Nav menu into Navigation tabs with a contextual class of .nav-tabs…

.nav-pills class if you want pilled shaped nav tabs.

Justify the tabs/pills with the .nav-justified class (equal width), also add .dropdown-menu class to tabs.

When using the .navbar-brand class on images, Bootstrap 4 will automatically style the image to fit the navbar vertically.

The navigation bar can also be fixed at the top or at the bottom of the page.

A fixed navigation bar stays visible in a fixed position (top or bottom) independent of the page scroll.

The .fixed-top class makes the navigation bar fixed at the top inverse for .fixed-bottom class.

Use the .sticky-top class to make the navbar fixed/stay at the top of the page when you scroll past it.

### Bootstrap  Forms

Form controls automatically receive some global styling with Bootstrap:

All textual `<input>`, `<textarea>`, and `<select>` elements with class .form-control have a width of 100%.

Bootstrap provides two types of form layouts:

Stacked (full-width) with class .form-group, around each form control, to ensure proper margins.

Inline form a wrapper element with class .form-inline…However inline forms

are compressed and will look much better with spacing utilities. You can use different validation classes to provide valuable feedback to users.
Add either .was-validated or .needs-validation to the <form> element

depending on whether you want to provide validation feedback before or after

submitting the form. The input fields will have a green (valid) or red (invalid)

border to indicate what's missing in the form. You can also add a .valid-

feedback or .invalid-feedback message to tell the user explicitly what's

missing, or needs to be done before submitting the form

The .input-group class is a container to enhance an input by adding an icon, text or a button in front or behind the input field as a "help text".
Use .input-group-prepend to add the help text in front of the input

and .input-group-append to add it behind the input. At last, add the .input-group-text class to style the specified help text
### Visibility

Use the .visible /.invisible classes to control the visibility of elements.

Note: These classes do not change the CSS display value. They only add `visibility:visible` or `visibility:hidden`

### Screenreaders

Use the .sr-only class to hide an element on all devices, except screen readers:

### Bootstrap Carousel

The Carousel is a slideshow for cycling through elements mostly images & profiles.

### Flexbox

The biggest difference between Bootstrap 3 and Bootstrap 4 is that Bootstrap 4 now uses flexbox, instead of floats, to handle the layout.

The Flexible Box Layout Module, makes it easier to design flexible responsive layout structure without using float or positioning.

To create a flexbox container and to transform direct children into flex items, use the .d-flex class.

To create an inline flexbox container, use the d-inline-flex class.

Use .flex-column to display the flex items vertically (on top of each other), or .flex-column-reverse to reverse the vertical direction, default is horizontal.

We can Justify….Grow…Shrink….Wrap…Align….

### Grid System

Bootstrap's grid system is built with flexbox and allows up to 12 columns across the page.

At the heart of it, containers are the basis of Bootstrap’s grid.

Inside containers, we nest rows as immediate children. Then, nested inside rows are columns. Inside columns, we put our actual content.

Take a look below at an example of this nesting pattern.

```html
<div class="container">
	<div class="row">
		<div class="col">
			<!-- A column inside a row inside a container! -->
		</div>
	</div>
</div>
```

We can gain even more control of our layout once we start nesting rows inside columns and setting widths for our columns!

But, first, let’s review how to create a layout using Bootstrap.


---

*Document converted from PDF: :*Cascading Style Sheet*.pdf*
