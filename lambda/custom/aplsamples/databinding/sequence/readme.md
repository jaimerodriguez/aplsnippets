# Data-Binding in Sequence

Use data-binding expressions to bind data in the data source to component properties in your APL document. You could bind the data source to the `data` property of a [Sequence](https://developer.amazon.com/en-US/docs/alexa/alexa-presentation-language/apl-sequence.html) to provide your document with the set of items in the items property.

## Sample description

The example shows a `Sequence` that displays the 3 `listItem` defined in the `animals.json` data source file.

## Tips/Notes

- Declare a parameter in the `mainTemplate.parameters` array that matches the key for the data source object.
- Use the syntax `${dataSourceName.propertyName}` where `dataSourceName` is the same key you used in `mainTemplate.parameters` to bind your component properties to the data source.

## Try It

Brief instructions on how to preview this page.  Here is a useful start:

1. Open the [APL authoring tool](https://developer.amazon.com/alexa/console/ask/displays)
1. Click on `Start from scratch` and go to the `APL` tab on the left handside.
1. Copy the content in `document.json` and paste it into the editor.
1. Click on the `Data` tab on the left handside.
1. Copy the content in `../aplsamples/datasources/animals.json` and paste it into the editor.
1. Try change the `width` of `Container` in the `layout` from `50vw` to `33vw` to see all 3 items being displayed.
1. Play with the Data-Bidning syntax and render other images from datasource.
1. Click on the `view on` dropdown in the editor to deploy to device.

## References

- [APL Data Sources](https://developer.amazon.com/en-US/docs/alexa/alexa-presentation-language/apl-data-source.html)
- [APL Data-Binding Syntax](https://developer.amazon.com/en-US/docs/alexa/alexa-presentation-language/apl-data-binding-syntax.html)
- [APL Data-Binding Sequence](https://developer.amazon.com/en-US/docs/alexa/alexa-presentation-language/apl-data-source.html#sequence-size)
- [APL Data-Binding Evaluation](https://developer.amazon.com/en-US/docs/alexa/alexa-presentation-language/apl-data-binding-evaluation-v1.html)