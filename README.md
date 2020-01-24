# APL snippets  
This repo is a collection of snippets for developers building Alexa APL skills.   


## Goals:
Each snippet is a working APL document you can use to  understand an APL feature. The snippets are unpolished by design, to avoid adding noise to the core goal of understanding the feature.  
Use the snippets  to explore and expand your understanding on each feature. 
Some of the snippets can help you get on right track for a specific structure or pattern, but they are not clean enough for copy/paste reuse. 

## Non-goals:
This is not a comprehensive introduction to APL.  It is aimed at intermediate developers who are already familiar with the basics.   
If you are just started, try the [visual cakewalk[(https://alexa.design/apl-cake-walk)] course first. 
 


## Repo structure
This is a working Alexa skill. You can clone it and run it (see instructions below).

- *&lt;root&gt;/lambda/custom/aplsamples*   
This folder has the feature snippets. Each feature has their own folder and within the folder you will have the APL document and a readme file describing the contents of this feature snippet. 
All snippets are self-contained, so it should be OK to copy/paste the documents contents i

- &lt;root&gt;/lambda/custom/skill    
Contains the files needed for the demo to host/load the skills based on voice commands. 

- &lt;root&gt;/model/en-US.json   
 Has the voice interaction model. Use it to extract the utterances supported by the skill. 



## Contents
[Will be updated to links in a coupe days]
 
Components: 
- Text 
- Image
- TouchWrapper 
- Video 
- Pager 
- Sequence 


Commands:
- SpeakItem using speech 
- SpeakItem using transformers 
- SpeakList 
- OpenUrl 

Features: 
- Profile 
- Animation 
- Databinding  
- Cached Pager 
- States 
- Environment 
- Transport controls 

Scenario demos 
- Spinner 
- Tic-tac-toe
