

class APLSamplePage {
  constructor(obj) {
    this.name = obj.name || '';
    this.id = obj.id || '';
    this.nameResourceId = obj.nameResourceId || '';
    this.speechTextResourceId = obj.speechTextResourceId || '';
    this.speechText = obj.speechText || '';
    this.repromptResourceId = obj.repromptResourceId || '';
    this.reprompt = obj.reprompt || '';
    this.document = obj.document;
    this.datasource = obj.datasource;
    this.directives = obj.directives;
    this.description = obj.description || '';
    this.descriptionResourceId = obj.descriptionResourceId || '';
    this.categoryName = obj.category || '';
    this.displayCategory = this.categoryName || '';
    this.commands = obj.commands;
    this.token = obj.token;
  }

  hasValidId() {
    return this.id !== undefined && this.id !== '';
  }

  async resolveToLocale(resourcemanager, locale) {
    if (!resourcemanager || !locale) { throw new Error('ResourceManager & locale are required for localization'); }

    const publicCopy = {
      id: this.id,
      name: this.name,
      document: this.document,
      directives: this.directives,
      commands: this.commands,
      description: this.description,
      datasource: this.datasource,
      token: this.token,
    };

    if (this.name === '' && this.nameResourceId !== '') {
      publicCopy.name = resourcemanager.s(this.nameResourceId);
    }

    if (this.speechText === '' && this.speechTextResourceId !== '') {
      publicCopy.speechText = resourcemanager.s(this.speechTextResourceId);
    }
    if (this.reprompt === '' && this.repromptResourceId !== '') {
      publicCopy.reprompt = resourcemanager.s(this.repromptResourceId);
    }
    if (this.description === '' && this.descriptionResourceId !== '') {
      publicCopy.description = resourcemanager.s(this.descriptionResourceId);
    }

    publicCopy.displayCategory = resourcemanager.s(this.categoryName);

    return publicCopy;
  }
}

const pagesMetadata = Object.freeze(new Map(
  [

    ['text', new APLSamplePage({
      'nameResourceId': 'TEXT_PAGE.NAME',
      'speechTextResourceId': 'TEXT_PAGE.TEXT',
      'repromptResourceId': 'SHARED_PAGE.GOBACK',
      'document': '../aplsamples/components/text/document.json',
      'descriptionResourceId': 'TEXT_PAGE.DESCRIPTION',
      'category': 'components',
    })],


    ['video', new APLSamplePage({
      'nameResourceId': 'VIDEO_PAGE.NAME',
      'speechTextResourceId': 'VIDEO_PAGE.TEXT',
      'repromptResourceId': 'SHARED_PAGE.GOBACK',
      'document': '../aplsamples/components/video/document.json',
      'descriptionResourceId': 'VIDEO_PAGE.DESCRIPTION',
      'category': 'components',
    })],

    ['image', new APLSamplePage({
      'nameResourceId': 'IMAGE_PAGE.NAME',
      'speechTextResourceId': 'IMAGE_PAGE.TEXT',
      'repromptResourceId': 'SHARED_PAGE.GOBACK',
      'document': '../aplsamples/components/image/document.json',
      'descriptionResourceId': 'IMAGE_PAGE.DESCRIPTION',
      'category': 'component',

    })],

    ['touchwrapper', new APLSamplePage({
      'nameResourceId': 'TOUCHWRAPPER_PAGE.NAME',
      'speechTextResourceId': 'TOUCHWRAPPER_PAGE.TEXT',
      'repromptResourceId': 'SHARED_PAGE.GOBACK',
      'document': '../aplsamples/components/touchwrapper/document.json',
      'descriptionResourceId': 'TOUCHWRAPPER_PAGE.DESCRIPTION',
      'category': 'components',

    })],

    ['states', new APLSamplePage({
      'nameResourceId': 'STATES_PAGE.NAME',
      'speechTextResourceId': 'STATES_PAGE.TEXT',
      'repromptResourceId': 'SHARED_PAGE.GOBACK',
      'document': '../aplsamples/components/states/document.json',
      'descriptionResourceId': 'STATES_PAGE.DESCRIPTION',
      'category': 'component',
      'token': 'statesToken',
    })],

    ['speakitem', new APLSamplePage({
      'nameResourceId': 'SPEAKITEM_SPEECH_PAGE.NAME',
      'speechTextResourceId': 'SPEAKITEM_SPEECH_PAGE.TEXT',
      'repromptResourceId': 'SHARED_PAGE.GOBACK',
      'document': '../aplsamples/commands/speakitem/speechfile/document.json',
      'descriptionResourceId': 'SPEAKITEM_SPEECH_PAGE.DESCRIPTION',
      'category': 'components',
      'token': 'speakItemToken',
    })],

    ['speaklist', new APLSamplePage({
      'nameResourceId': 'SPEAKLIST_PAGE.NAME',
      'speechTextResourceId': 'SPEAKLIST_PAGE.TEXT',
      'repromptResourceId': 'SHARED_PAGE.GOBACK',
      'document': '../aplsamples/commands/speaklist/document.json',
      'datasource': '../aplsamples/datasources/animals_speaklist_shape.json',
      'descriptionResourceId': 'SPEAKLIST_PAGE.DESCRIPTION',
      'token': 'speakListToken',
      'category': 'components',

    })],


    ['transformer', new APLSamplePage({
      'nameResourceId': 'SPEAKITEM_TRANSFORMER_PAGE.NAME',
      'speechTextResourceId': 'SPEAKITEM_TRANSFORMER_PAGE.TEXT',
      'repromptResourceId': 'SHARED_PAGE.GOBACK',
      'document': '../aplsamples/commands/speakitem/transformer/document.json',
      'descriptionResourceId': 'SPEAKITEM_TRANSFORMER_PAGE.DESCRIPTION',
      'category': 'components',
      'token': 'speakItemToken',
      'datasource': '../aplsamples/datasources/singleanimal.json',
    })],

    ['pager', new APLSamplePage({
      'nameResourceId': 'PAGER_PAGE.NAME',
      'speechTextResourceId': 'PAGER_PAGE.TEXT',
      'repromptResourceId': 'SHARED_PAGE.GOBACK',
      'document': '../aplsamples/components/pager/document.json',
      'descriptionResourceId': 'PAGER_PAGE.DESCRIPTION',
      'category': 'components',
      'token': 'pagerToken',
    })],

    ['openurl', new APLSamplePage({
      'nameResourceId': 'OPENURL_PAGE.NAME',
      'speechTextResourceId': 'OPENURL_PAGE.TEXT',
      'repromptResourceId': 'SHARED_PAGE.GOBACK',
      'document': '../aplsamples/commands/openurl/document.json',
      'descriptionResourceId': 'OPENURL_PAGE.DESCRIPTION',
      'category': 'command',

      'token': 'openURLToken',
    })],

    ['cached_pager', new APLSamplePage({
      'nameResourceId': 'CACHED_PAGER_PAGE.NAME',
      'speechTextResourceId': 'CACHED_PAGER_PAGE.TEXT',
      'repromptResourceId': 'SHARED_PAGE.GOBACK',
      'document': '../aplsamples/scenarios/cachedPager/document.json',
      'descriptionResourceId': 'CACHED_PAGER_PAGE.DESCRIPTION',
      'category': 'scenario',
      'token': 'cachedPagerToken',
    })],

    ['animation', new APLSamplePage({
      'nameResourceId': 'ANIMATION_PAGE.NAME',
      'speechTextResourceId': 'ANIMATION_PAGE.TEXT',
      'repromptResourceId': 'SHARED_PAGE.GOBACK',
      'document': '../aplsamples/animation/document.json',
      'descriptionResourceId': 'ANIMATION_PAGE.DESCRIPTION',
      'category': 'component',

      'token': 'animationToken',
    })],

    ['profile', new APLSamplePage({
      'nameResourceId': 'PROFILE_PAGE.NAME',
      'speechTextResourceId': 'PROFILE_PAGE.TEXT',
      'repromptResourceId': 'SHARED_PAGE.GOBACK',
      'document': '../aplsamples/layouts/profile/document.json',
      'descriptionResourceId': 'PROFILE_PAGE.DESCRIPTION',
      'category': 'device',
    })],


    ['environment', new APLSamplePage({
      'nameResourceId': 'ENVIRONMENT_PAGE.NAME',
      'speechTextResourceId': 'ENVIRONMENT_PAGE.TEXT',
      'repromptResourceId': 'SHARED_PAGE.GOBACK',
      'document': '../aplsamples/layouts/environment/document.json',
      'descriptionResourceId': 'ENVIRONMENT_PAGE.DESCRIPTION',
      'category': 'basic',

    })],

    ['spinner', new APLSamplePage({
      'nameResourceId': 'SPINNER_PAGE.NAME',
      'speechTextResourceId': 'SPINNER_PAGE.TEXT',
      'repromptResourceId': 'SHARED_PAGE.GOBACK',
      'document': '../aplsamples/scenarios/spinner/document.json',
      'descriptionResourceId': 'SPINNER_PAGE.DESCRIPTION',
      'category': 'component',
      'token': 'spinnerToken',
      'datasource': '../aplsamples/scenarios/spinner/initialDataSource.json',
    })],

    ['tictactoe', new APLSamplePage({
      'nameResourceId': 'TICTACTOE_PAGE.NAME',
      'speechTextResourceId': 'TICTACTOE_PAGE.TEXT',
      'repromptResourceId': 'SHARED_PAGE.GOBACK',
      'document': '../aplsamples/scenarios/tictactoe/document.json',
      'descriptionResourceId': 'TICTACTOE_PAGE.DESCRIPTION',
      'category': 'basic',

      'datasource': '../aplsamples/scenarios/tictactoe/data.json',
    })],

    ['videotransport', new APLSamplePage({
      'nameResourceId': 'VIDEOTRANSPORT_PAGE.NAME',
      'speechTextResourceId': 'VIDEOTRANSPORT_PAGE.TEXT',
      'repromptResourceId': 'SHARED_PAGE.GOBACK',
      'document': '../aplsamples/layouts/videotransport/document.json',
      'descriptionResourceId': 'VIDEOTRANSPORT_PAGE.DESCRIPTION',
      'category': 'basic',

      'datasource': '../aplsamples/scenarios/tictactoe/data.json',
    })],
  ],
));


const menuPage = new APLSamplePage({
  'nameResourceId': 'MAINMENU_PAGE.NAME',
  'speechTextResourceId': 'MAINMENU_PAGE.TEXT',
  'repromptResourceId': 'MAINMENU_PAGE.REPROMPT',
  'document': './main_menu/document.json',
  'datasource': './main_menu/design.datasource.json',
  'descriptionResourceId': 'MAINMENU_PAGE.DESCRIPTION',
  'category': 'nav',
});


module.exports = {
  APLSamplePage: APLSamplePage,
  pages: pagesMetadata,
  menuPage: menuPage,
};
