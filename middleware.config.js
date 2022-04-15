import customProductsQuery from './customQueries/productList';

const config = require('./config.js');
const cookieNames = require('./enums/cookieNameEnum');




module.exports = {
  integrations: {
    magento: {
      location: '@vue-storefront/magento-api/server',
      configuration: {
        api: config.get('magentoGraphQl'),
        cookies: {
          ...cookieNames,
        },
        defaultStore: 'default',
        externalCheckout: {
          enable: config.get('enableMagentoExternalCheckout'),
          cmsUrl: config.get('externalCheckoutUrl'),
          syncUrlPath: config.get('externalCheckoutSyncPath'),
          stores: {
            default: config.get('enableMagentoExternalCheckout'),
          },
        },
        facets: {
          available: ['author_3nd', 'translator_3nd', 'publisher'],
        },
        customApolloHttpLinkOptions: {
          useGETForQueries: false,
        },
      },
      customQueries: {
        products: ({ query, variables }) => {
          return { query: customProductsQuery, variables }; // Your custom query
        },
      },
    },
  },
};
