# Viewport profiles 
The viewport defines the screen characeristics of the device your skill is running in.  
Viewport profiles aggregate different characteristics; this should make it easier for you to code to device with similar characteristics, instead of each individual device.   

## Sample description 
This sample shows you the properties that are aggregated into a profile and shows you how to use 'when' clauses to tailor layouts to a device. 

## Tips/Notes 
- You can get access to viewport profiles by importing the "alexa-viewport-profiles" package or the "alexa-layouts" package. This sample used layouts, so we could show that the layouts automatically tailor to devices. 
- In your 'when' clauses, avoid hardcoding any numbers, such as checking for specific width or height. Use @viewportProfile,  @viewportShape and @viewportSize for your checks as much as possible. 


## References 
Docs for [Viewport profile](https://developer.amazon.com/docs/alexa-presentation-language/apl-alexa-viewport-profiles-package.html)   

You can [select the profiles](https://developer.amazon.com/docs/alexa-presentation-language/apl-select-the-viewport-profiles-your-skill-supports.html) that your skill supports

 