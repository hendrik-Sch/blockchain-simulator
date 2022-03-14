import React from 'react';

const ConfigContext = React.createContext({
    websocketUrl: ""
});

export const ConfigProvider = ConfigContext.Provider;
export const ConfigConsumer = ConfigContext.Consumer;

export default ConfigContext; 