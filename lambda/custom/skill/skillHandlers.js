const Alexa = require('ask-sdk-core');
const { AlexaUtils, Utils } = require('../utils/skillhelpers.js');
const { pages, menuPage } = require('./demopages');
const { SlotNames , UserEventArgs } = require('../constants');
const { CachedPagerUserEventHandler } = require ( './scenarioHandlers');  

async function renderPage(handlerInput, pageElement, pageOverrides) {
  const {responseBuilder} = handlerInput;
  const { speechText, reprompt} = pageElement ;
  responseBuilder.speak(speechText);

  if (reprompt && reprompt !== '') {
    responseBuilder.reprompt(reprompt);
  }

  /* eslint-disable import/no-dynamic-require */
  /* eslint-disable global-require */
  const renderDocument = require(pageElement.document);

  let renderDatasource = null;

  if (pageOverrides && pageOverrides.datasource) {
    renderDatasource = pageOverrides.datasource;
  } else if (pageElement.datasource) {
    // passing a path to a file to load 
    if (typeof (pageElement.datasource) === 'string') {
      // eslint-disable-next-line import/no-dynamic-require
      renderDatasource = require(pageElement.datasource);
    }  
    else { // passing an object 
      renderDatasource = pageElement.datasource;
    }
  }

  const renderToken = pageElement.token || 'default';
  const renderVersion = pageElement.version || '1.3';
  responseBuilder.addDirective({
    type: 'Alexa.Presentation.APL.RenderDocument',
    token: renderToken,
    version: renderVersion,
    document: renderDocument,
    datasources: renderDatasource,
  });
  if (pageElement.commands) {
    console.assert(renderToken === pageElement.token);
    const directive = AlexaUtils.createAPLCommandDirective(renderToken, pageElement.commands);
    responseBuilder.addDirective(directive);
  }
  return responseBuilder.getResponse();
}

function pageNotFound(handlerInput) {
  const {responseBuilder} = handlerInput;  
  const errorMessage = responseBuilder.i18n.s('PAGE_NOT_FOUND');
  const reprompt = responseBuilder.i18n.s('PAGE_NOT_FOUND_REPROMPT');
  responseBuilder.speak(errorMessage);
  responseBuilder.reprompt(reprompt);
  return responseBuilder.getResponse();
}

const localizedPages = [];

async function renderMainMenu(handlerInput) {
  const locale = AlexaUtils.getLocale(handlerInput);
  const resourceManager = handlerInput.responseBuilder.i18n;
  const pageMetadata = menuPage;
  const page = await pageMetadata.resolveToLocale(resourceManager, locale);


  if (localizedPages.length === 0) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of pages) {
      const currentPage = value;
      if (!currentPage.hasValidId()) {
        currentPage.id = key;
      }
      // eslint-disable-next-line no-await-in-loop
      const localizedPage = await currentPage.resolveToLocale(resourceManager, locale);
      localizedPages.push(localizedPage);
    }
  }
  const pagesDataSource = {
    'listData': {
      'pages': localizedPages,
    },
  };
   
  const response = await renderPage(handlerInput, page, { datasource: pagesDataSource });
  return response;
}


async function handleUserEvent(handlerInput) {
  const userEvent = handlerInput.requestEnvelope.request;
  const source = userEvent.source.type;
  const handler = userEvent.source.handler;
  const resourceManager = handlerInput.responseBuilder.i18n;
  let userArgs = '';

  if (userEvent.arguments && userEvent.arguments.length > 0) {
    if (userEvent.arguments[0] === 'goBack') {
      return renderMainMenu();
    }

    if ( userEvent.arguments[0] === UserEventArgs.CachedPager_Next 
      || userEvent.arguments[0] === UserEventArgs.CachedPager_Previous) {
        return CachedPagerUserEventHandler.handle(handlerInput); 
    } 

    if ( userEvent.arguments[0] === UserEventArgs.MainMenuSelection 
      && userEvent.arguments.length > 1 ) { 
      const pageName = userEvent.arguments[1]; 
      const locale = Alexa.getLocale(handlerInput.requestEnvelope);
      const page = await pages.get(pageName).resolveToLocale(resourceManager, locale);
      const response = await renderPage(handlerInput, page);
      return response; 
    }
    //Generic handler ...  
    userEvent.arguments.forEach((arg) => {
      // eslint-disable-next-line template-curly-spacing     
      const kvp = arg.split(':');
      if (kvp.length > 1) {
        userArgs += `${kvp[0]}: ${kvp[1]}  , `;
      } else { userArgs += `${arg},`; }
    });
  }
   
  const responseText = resourceManager.sformatByName ( 
    'USER_EVENT_WITHARGS_FORMAT' ,  
    {source: source, handler: handler , userArgs: userArgs});

  const response = handlerInput.responseBuilder
    .speak(responseText)
    .getResponse();

  return response;
}

async function showFeature(handlerInput  ) {
  
  const locale = Alexa.getLocale(handlerInput.requestEnvelope);
  const resourceManager = handlerInput.responseBuilder.i18n;
  let response = null;
  let pageName =  Alexa.getSlotValue(handlerInput.requestEnvelope, SlotNames.PageName);
  
  
  if (!pages.has(pageName)) {
    // Find the match based on other criteria ..     
    const slot = Alexa.getSlot(handlerInput.requestEnvelope, SlotNames.PageName);
    if (slot && slot.resolutions !== undefined
          && slot.resolutions.resolutionsPerAuthority !== undefined
          && slot.resolutions.resolutionsPerAuthority.length > 0) {
      const values = slot.resolutions.resolutionsPerAuthority[0].values;
      if (values && values.length > 0) {
        // eslint-disable-next-line no-restricted-syntax
        for (const item of values) {
          const value = item.value;
          if (pages.has(value.id)) {
            pageName = value.id;
            break;
          }  
        }
      }
    }
  }

  if (!pages.has(pageName)) {
    // There is no page name, try an index ...
    const demoIndex = Alexa.getSlotValue(handlerInput.requestEnvelope, SlotNames.PAGEINDEX);
    if (demoIndex) {
      try {
        const numericIndex = parseInt(demoIndex, 10);
        if (numericIndex < pages.size) {
          pageName = Utils.getKeyFromIndexOnMap(numericIndex, pages);
        }
      } catch (err) {
        console.log(`Failed to parse ${demoIndex} as a number`);
      }
    }
  }


  if (pages.has(pageName)) {
    const page = await pages.get(pageName).resolveToLocale(resourceManager, locale);
    response = await renderPage(handlerInput, page);
  } else {
    response = pageNotFound(handlerInput);
  }
  return response;
}

async function handleSelection(handlerInput) {
  const listPositionSlot = handlerInput.requestEnvelope.request.intent.slots.ListPosition;
  const listPositionValue = (listPositionSlot) ? listPositionSlot.value : null;
  const anaphorSlot = handlerInput.requestEnvelope.request.intent.slots.Anaphor;
  const anaphorValue = anaphorSlot.value;

  const responseBuilder = handlerInput.responseBuilder;

  let speechText = '';

  if (anaphorValue != null) {
    const anaphorIdentifier = AlexaUtils.getVisualContextAuthorityResolvedIdentifier(anaphorSlot);
    if (anaphorIdentifier != null) {
      speechText = responseBuilder.i18n.sformatByPosition('ANAPHORICSELECTION', anaphorValue, anaphorIdentifier);
    } else {
      speechText = responseBuilder.i18n.s('INVALIDANAPHORICREQUEST');
    }
  } else if (listPositionValue != null) {
    const index = parseInt(listPositionValue, 10);
    if (localizedPages.length > index) {
      // decrease by 1 because array is 0 index, listPosition is index base 1
      return renderPage(handlerInput, localizedPages[index - 1]);
    }

    speechText = responseBuilder.i18n.s('INVALIDINDEXREQUEST');
  }

  const response = handlerInput.responseBuilder
    .speak(speechText)
    .reprompt("To render a sample, say show followed by the name of the sample, for example, say 'show profile'")
    .getResponse();

  return response;
}


function createNoAPLResponse ( handlerInput ) { 
  const {responseBuilder} = handlerInput;
  const speechText = responseBuilder.i18n.s('APL_REQUIRED');   

  return responseBuilder 
    .speak(speechText)
    .withShouldEndSession(true)
    .getResponse();   
}

module.exports = {
  renderMainMenu ,
  renderPage ,
  handleUserEvent ,
  showFeature ,
  handleSelection ,
  createNoAPLResponse
};
