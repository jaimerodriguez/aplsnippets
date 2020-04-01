# Environment

The environment object contains runtime information about the operating APL environment.  

## Sample description

Renders the value of the properties in environment object across devices.

## Tips/Notes

- Use the environment object to detect if features are available. For example, video is not allowed on some Alexa third party devices. Always check.
- Use the aplVersion to workaround bugs or breaking changes across APL releases.

## Try It

1. Open the [APL authoring tool](https://developer.amazon.com/alexa/console/ask/displays)
1. Click on `Start from scratch` and go to the `APL` tab on the left handside.
1. Copy the content in `document.json` and paste it into the editor.
1. Deploy the sample to your devices so you can see the environment propertie change.

## References

- [Environment Object](https://developer.amazon.com/en-US/docs/alexa/alexa-presentation-language/apl-data-binding-evaluation.html#environment)
