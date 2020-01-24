const Alexa = require('ask-sdk-core');
const { AlexaUtils } = require('../utils/skillhelpers.js');
const { pages , menuPage } = require('./demopages');
const { SLOTNAMES } = require('./constants');

async function renderPage(handlerInput, pageElement, pageOverrides) {
  const responseBuilder = handlerInput.responseBuilder;
  const speechText = pageElement.speechText;
  const reprompt = pageElement.reprompt;

  if (pageElement.name === 'speaklist' & false ) {
    const retval = await require('./SpeakListResponse.json');
    return retval;
  }
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
    if (typeof (pageElement.datasource) === 'string') {
      // eslint-disable-next-line import/no-dynamic-require
      renderDatasource = require(pageElement.datasource);
    } else {
      renderDatasource = pageElement.datasource;
    }
  }

  const renderToken = pageElement.token || 'default';
  const renderVersion = pageElement.version || '1.1';

  responseBuilder.addDirective({
    type: 'Alexa.Presentation.APL.RenderDocument',
    token: renderToken,
    version: renderVersion,
    document: renderDocument,
    datasources: renderDatasource,
  });
  if (pageElement.commands) {
    console.assert(renderToken === pageElement.token);
    const dir = AlexaUtils.createAPLCommandDirective(renderToken, pageElement.commands);
    responseBuilder.addDirective(dir);
  }
  return responseBuilder.getResponse();
}

const localizedPages = [];

async function renderMainMenu(handlerInput) {
  const locale = AlexaUtils.getLocale(handlerInput);
  const resourceManager = handlerInput.responseBuilder.i18n;
  const pageMetadata = menuPage ;
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

  console.log(JSON.stringify(pagesDataSource));
  const response = await renderPage(handlerInput, page, { datasource: pagesDataSource });
  return response;
}

async function handleUserEvent(handlerInput) {
  const userEvent = handlerInput.requestEnvelope.request;
  const source = userEvent.source.type;
  const handler = userEvent.source.handler;
  let userArgs = '';

  if (userEvent.arguments && userEvent.arguments.length > 0) {
    if (userEvent.arguments[0] === 'goBack') {
      return renderMainMenu();
    }

    if (userEvent.arguments[0] === 'Cached_Pager_Next' || userEvent.arguments[0] === 'Cached_Pager_Previous') {
      const direction = (userEvent.arguments[0] === 'Cached_Pager_Previous') ? -1 : 1;
      // TODO :make resources
      const responseText = `user event handled for ${source}'s ${handler} with arguments ${userArgs}`;
      const response = handlerInput.responseBuilder
        .speak(responseText)
        .addDirective({
          type: 'Alexa.Presentation.APL.ExecuteCommands',
          token: 'cachedPagerToken',
          commands: [
            {
              'type': 'SetPage',
              'componentId': 'pagerId',
              'position': 'relative',
              'value': direction,
            },
          ],
        })
        .getResponse();
      return response;
    }

    console.log(`processing ${userEvent.arguments.join(',')}`);
    userEvent.arguments.forEach((arg) => {
      // eslint-disable-next-line template-curly-spacing
      console.log(`userEvent: ${arg}`);
      const kvp = arg.split(':');
      if (kvp.length > 1) {
        userArgs += `name: ${kvp[0]}, value: ${kvp[1]}  , `;
      } else { userArgs += `${arg},`; }
    });
  }
  // TODO: localize
  const responseText = `user event handled for ${source}'s ${handler} with arguments ${userArgs}`;
  const response = handlerInput.responseBuilder
    .speak(responseText)
    .getResponse();

  return response;
}

async function showFeature(handlerInput) {
  let pageName = Alexa.getSlotValue(handlerInput.requestEnvelope, SLOTNAMES.PAGENAME);
  let response = null;
  const locale = Alexa.getLocale(handlerInput.requestEnvelope);
  const resourceManager = handlerInput.responseBuilder.i18n;

  if (!pages.has(pageName)) {
    // Find the match based on other criteria ..
    // TODO: extract into utils. it is here for now to find niche cases..

    console.log('page not found');
    const slot = Alexa.getSlot(handlerInput.requestEnvelope, SLOTNAMES.PAGENAME);
    if (slot && slot.resolutions
          && slot.resolutions.resolutionsPerAuthority
          && slot.resolutions.resolutionsPerAuthority.length > 0) {
      const values = slot.resolutions.resolutionsPerAuthority[0].values;
      if (values && values.length > 0) {
        // eslint-disable-next-line no-restricted-syntax
        for (const item of values) {
          const value = item.value;
          if (pages.has(value.id)) {
            pageName = value.id;
            break;
          } else {
            console.log(`no match for slot {value.name} with id: ${value.id}`);
          }
        }
      }
    }
  }

  if (!pages.has(pageName)) {
    pageName = 'notfound';
    console.assert(pages.has(pageName));
  }

  if (pages.has(pageName)) {
    const page = await pages.get(pageName).resolveToLocale(resourceManager, locale);
    response = await renderPage(handlerInput, page);
  }
  // FIXME: handle case when response is null
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
      speechText = responseBuilder.i18n.sformat('ANAPHORICSELECTION', anaphorValue, anaphorIdentifier);
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

module.exports = {
  renderMainMenu: renderMainMenu,
  renderPage: renderPage,
  handleUserEvent: handleUserEvent,
  showFeature: showFeature,
  handleSelection: handleSelection,
};
