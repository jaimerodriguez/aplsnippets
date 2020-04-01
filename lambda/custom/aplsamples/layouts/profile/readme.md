# Viewport profiles

The viewport defines the screen characeristics of the device your skill is running in.  
Viewport profiles aggregate different characteristics; this should make it easier for you to code to device with similar characteristics, instead of each individual device.

## Sample description

This sample shows you the properties that are aggregated into a profile.
It also shows how to use 'when' clauses to tailor layouts to a device.

## Tips/Notes

- You can get access to viewport profiles by importing the `alexa-viewport-profiles` package or the `alexa-layouts` package. This sample used layouts, so we could show that the layouts automatically tailor to devices.
- In your `when` clauses, avoid hardcoding any numbers, such as checking for specific width or height. Use `@viewportProfile`,  `@viewportShape` and `@viewportSize` for your checks as much as possible.

## Try It

Brief instructions on how to preview this page.  Here is a useful start:

1. Open the [APL authoring tool](https://developer.amazon.com/alexa/console/ask/displays)
1. Click on `Start from scratch` and go to the `APL` tab on the left handside.
1. Copy the content in `document.json` and paste it into the editor.
1. Review all the properties and values.
1. Change the device in the authoring tool and see how the profile changes
1. Press F12 in the browser and change the APL, while looking at network activity. Checkout the alexa-viewport-profiles file. Explore its contents.

## References

- [Viewport Profile](https://developer.amazon.com/docs/alexa-presentation-language/apl-alexa-viewport-profiles-package.html)
- How to [select the profiles](https://developer.amazon.com/docs/alexa-presentation-language/apl-select-the-viewport-profiles-your-skill-supports.html) that your skill supports
