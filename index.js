const KeycloakAdminClient = require('@keycloak/keycloak-admin-client');
const axios = require('axios');

const serverUrl = "https://chat.ptsecurity.com";
const clientId = "pt";
const realmName = "internal";
const clientSecret = "19666a4f-32dd-4049-b082-684c74115f28";

(async () => {
    try {
        // Получение конфигурации .well-known
        const wellKnownUrl = `${serverUrl}/realms/${realmName}/.well-known/openid-configuration`;
        const { data: wellKnownConfig } = await axios.get(wellKnownUrl);

        // Получение токена
        const tokenUrl = wellKnownConfig.token_endpoint;
        const tokenResponse = await axios.post(tokenUrl, null, {
            params: {
                client_id: clientId,
                client_secret: clientSecret,
                username: "givaschenkov",
                password: "w$b7*M9RzSHMxq",
                grant_type: "password",
            },
        });

        const token = tokenResponse.data;

        // Получение информации о пользователе
        const userInfoUrl = wellKnownConfig.userinfo_endpoint;
        const userInfoResponse = await axios.get(userInfoUrl, {
            headers: {
                Authorization: `Bearer ${token.access_token}`,
            },
        });

        const userInfo = userInfoResponse.data;

        if (!userInfo) {
            console.error("User Info:", userInfo);
        }

        console.log("User Info:", userInfo);
        
        // TODO: получение списка чатов
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
    }
})();
