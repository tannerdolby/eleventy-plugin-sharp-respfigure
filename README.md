# eleventy-plugin-sharp-respfigure
An Eleventy [paired shortcode](https://www.11ty.dev/docs/shortcodes/#paired-shortcodes) that performs build-time image transformations with [Sharp](https://sharp.pixelplumbing.com/) to resize large images into `.jpeg` and `.webp` formats with varying dimensions and generates `<picture>` tags for responsive images inside a `<figure>`.

## Installation
In your Eleventy project, [install the plugin](https://www.npmjs.com/package/eleventy-plugin-sharp-respfigure) from npm:
```
npm install eleventy-plugin-sharp-respfigure
```
Then add it to your [Eleventy Config](https://www.11ty.dev/docs/config/) file:
```js
const respfigure = require("eleventy-plugin-sharp-respfigure");

module.exports = (eleventyConfig) => {
    eleventyConfig.addPlugin(respfigure);
}
```

## What does it do?
It turns paired shortcodes like this:

```js
{% respfigure 
    "test.png",
    "Some alt text",
    "./images/",
    "Figure caption",
    "className",
    {
        "one": {
            "width": "320",
            "media": "(max-width: 449px)"
        },
        "two": {
            "width": "550",
            "media": "(min-width: 550px)"
        }
    }
%}{% endrespfigure %}
```
into responsive image markup using `<figure>` and `<picture>` tags like this:
```html
<figure class='className'>
    <picture>
        <source type='image/webp' media='(max-width: 449px)' srcset='./images/test-320.webp'>
        <source type='image/webp' media='(min-width: 550px)' srcset='./images/test-550.webp'>
        <source type='image/jpeg' media='(max-width: 449px)' srcset='./images/test-320.jpg'>
        <source type='image/jpeg' media='(min-width: 550px)' srcset='./images/test-550.jpg'>
        <img src='./images/test-320.jpg' alt='Some alt text' loading='lazy'>
    </picture>
    <figcaption>Figure caption</figcaption>
</figure>
```
- The images are responsive by using a `<picture>` element which contains zero or more `<source>` elements and one `<img>` element to offer alternative versions of an image for different display/device scenarios. 

## Transform mulitple images
The real power of using this paired shortcode is the ability to use data from [global data files](https://www.11ty.dev/docs/data-global/) or [front matter](https://www.11ty.dev/docs/data-frontmatter/) to transform multiple images at once.

If you have global JSON data stored in `data.json` which is an array of objects like this:

```json
[
    {
        "src": "car.jpg",
        "alt": "Photo of a car",
        "imgDir": "./images/",
        "caption": "Figure caption text",
        "className": "carClass",
        "widths": {
            "one": {
                "width": "320",
                "media": "(max-width: 449px)"
            },
            "two": {
                "width": "550",
                "media": "(min-width: 550px)"
            }
        }
    },
    {
        "src": "flower.jpg",
        "alt": "Photo of a flower",
        "imgDir": "./images/",
        "caption": "Figure caption text",
        "className": "flowerClass",
        "widths": {
            "one": {
                "width": "500",
                "media": "(max-width: 799px)"
            },
            "two": {
                "width": "800",
                "media": "(min-width: 800px)"
            }
        }
    }
]
```
you can use the paired shortcode to transform multiple images at build-time into responsive image markup using a `for` loop like this:

```js
{% for image in data %}
    {% respfigure 
        image.src, 
        image.alt, 
        image.imgDir,
        image.caption, 
        image.className,
        image.widths 
    %}{% endrespfigure %}
{% endfor %}
```

## Paired shortcode options

| Parameter | type | Description |
| ------    | ------- | -------     |
| src       | String | The filename for an image. |
| alt       | String | A text description of the image. |
| imgDir | String | The directory where the image file is located. |
| caption | String | The figure caption text. |
| className | String | The classname for `<figure>`. |
| widthData | Object | The desired image widths and `media` conditions. |

## Limitations
The paired shortcode currently supports up to 4 widths specified in the width data parameter. The utility will only generate transformed images for the number of widths specified. 

If you specify only one width and media argument to `widthData` parameter, the shortcode will only generate 1 transformed `.webp` and `.jpg` image to be injected into `<picture>` along with the fallback `<img>` and `<figure>` & `<figcaption>`.

## Notes
- Use `./` when declaring the image directory parameter as Sharp expects this.
- Use `.addPassthroughCopy` to include the images directory in your `_site` output with `eleventyConfig.addPassthroughCopy("image-directory");`.
- The `<picture>` and `<img>` tags generated by the paired shortcode don't have any styling out of the box. But they can be manipulated with a bit of CSS to apply different `width` or `height` attributes.

## TODO
- [ ] Allow for more than 4 widths to be specified.

## Other Responsive Image Plugins
- [eleventy-img](https://github.com/11ty/eleventy-img)
- [eleventy-respimg](https://github.com/eeeps/eleventy-respimg)
- [eleventy-plugin-sharp-respimg](https://github.com/tannerdolby/eleventy-plugin-sharp-respimg)