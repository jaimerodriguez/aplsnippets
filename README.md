# APL snippets
This repo is a collection of snippets for developers building Alexa APL skills.


## Goals:
Each snippet is a working APL document you can use to  understand an APL feature. Use the snippet to expand your understanding for that feature.


## Non-goals:
- This is not a comprehensive introduction to APL.  It is aimed at intermediate developers who are already familiar with the basics.
- If you are just started, try the [visual cakewalk](https://alexa.design/apl-cake-walk) course first.

- The snippets are not clean (or polished) enough for copy/paste reuse.

## Repo structure
This is a working Alexa skill. You can clone it and run it (see instructions below).

Here is the hierarchy, so you can navigate through the code:

- &lt;root&gt;/lambda/custom/aplsamples/
Contains all the snippets.
Each feature has their own subfolder with an APL document and a readme file.
Most snippets are self-contained, you should be able to copy/paste the document contents to the APL editor. When the snippet requires a data source commands, the readme will call it out.

- &lt;root&gt;/lambda/custom/skill
Contains the files needed for the demo to load and display the snippets. It has the intent handlers for the voice interactions.

- &lt;root&gt;/model/en-US.json
 Has the voice interaction model. Use it to extract the utterances supported by the skill.

## Contents
[Will be updated to links soon]

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


## Deploying/testing the script
In a system with [ASK CLI](https://developer.amazon.com/en-US/docs/alexa/smapi/quick-start-alexa-skills-kit-command-line-interface.html) and [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) installed:

1. Clone this repo.
    ```
    git clone https://github.com/jaimerodriguez/aplsnippets
    ```
1. Change directory to the root of the project.
    ```
    cd aplsnippets
    ```
1. Associate the project with your Alexa developer account and your AWS account.
    ```
    ask init
    ```
1. Deploy the project.
    ```
    ask deploy
    ```
1. Go to the [Alexa developer portal](https://developer.amazon.com/alexa/console/ask), click on the skill, and then go into the test tab and invoke the skill. Alternatively, you can invoke the skill on any Alexa-enabled devices that are tied to the same Amazon user account as your developer account.

1. Having a local environment for debugging is super helpful. Follow this [Alexa Blog](https://developer.amazon.com/blogs/alexa/post/77c8f0b9-e9ee-48a9-813f-86cf7bf86747/setup-your-local-environment-for-debugging-an-alexa-skill) to setup your local debug workflow.



## Contributing to the sample (or the docs)
If you want to contribute a new snippet, or you want to contribute to the (very incomplete) documentation, you are very welcome to do so. Please submit a pull request.
