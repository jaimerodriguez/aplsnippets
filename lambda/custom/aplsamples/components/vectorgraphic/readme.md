# Vector Graphic

Alexa Vector Graphics (AVG) is a format for defining vector graphics. AVG is a parameterized subset of SVG.  
The Vector Graphic component can load an AVG object and render it.

## Sample description

Basic rendering of two VectorGraphic components. One with inlined AVG object, one with a remote object.  

## Tips/Notes

- AVG supports two elements: [AVG Path Item](https://aplspec.aka.corp.amazon.com/release-1.3/html/graphics.html#avg-path-item-section) and [AVG Group Item](https://aplspec.aka.corp.amazon.com/release-1.3/html/graphics.html#avg-group-item-section).
- You  can use tools to convert SVG to AVG.  [e.g., SVG to AVG converter](https://svgtoavg.glitch.me/)
- APL has a payload size limit of 24K bytes (as of APL 1.3). Use the source property to reference external AVG objects. This will not count against payload size of the response.

## Try It

Note: The linked (via source URL) component does not render in the APL authoring tool on the web.  The inlined AVG will render fine.

1. Open the [APL authoring tool](https://developer.amazon.com/alexa/console/ask/displays)
1. Click on `Start from scratch` and go to the `APL` tab on the left handside.
1. Copy the content in `document.json` and paste it into the editor.
1. Deploy to the device by clicking `View on` drop-down in the APL authoring tool.
1. Play with the `viewportHeight`/`viewportWidth` and the `scaleTypeHeight`/`scaleTypeWidth` to understand the relationship between viewports (in AVG) and VectorGraphic component sizes.  Note that the AVG converter defaults to width & height of 100; you will always have to change that.

## References

- [Alexa Vector Graphic format](https://developer.amazon.com/en-US/docs/alexa/alexa-presentation-language/apl-avg-format.html)
- [SVG to AVG converter](https://svgtoavg.glitch.me/)
