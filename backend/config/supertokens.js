import SuperTokens from 'supertokens-node';
import ThirdParty from 'supertokens-node/recipe/thirdparty';
import Session from 'supertokens-node/recipe/session';
import dotenv from 'dotenv';
dotenv.config();

SuperTokens.init({
    framework: 'express',
    supertokens: {
        connectionURI: 'http://localhost:3567', // SuperTokens core
    },
    appInfo: {
        appName: 'YourAppName',
        apiDomain: 'http://localhost:5000',
        websiteDomain: 'http://localhost:3000',
    },
    recipeList: [
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [
                    {
                        config: {
                            thirdPartyId: 'google',
                            clients: [{
                                clientId: process.env.GOOGLE_CLIENT_ID,
                                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                            }]
                        }
                    }
                ]
            }
        }),
        Session.init(),
    ],
});

export default SuperTokens;