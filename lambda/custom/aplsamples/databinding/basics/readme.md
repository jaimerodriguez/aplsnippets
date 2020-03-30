# Data-Binding

A data source is a JSON structure that defines data you can bind to an APL document.

## Sample description

Use data-binding expressions to bind data in the data source to component properties in your APL document.

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
1. Try updating the url for `largeImage` and text property for `name` objects see changes.
1. Play with the Data-Bidning syntax and render other images from datasource.
1. Click on the `view on` dropdown in the editor to deploy to device.

## References

- [APL Data Sources](https://developer.amazon.com/en-US/docs/alexa/alexa-presentation-language/apl-data-source.html)
- [APL Data-Binding Syntax](https://developer.amazon.com/en-US/docs/alexa/alexa-presentation-language/apl-data-binding-syntax.html)
