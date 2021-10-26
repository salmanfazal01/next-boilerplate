import React from "react";
import config from "src/config/appConfig";

const AppConfigContext = React.createContext(null);

const withAppConfig = (Component: any) => {
  const ChildComponent = (props: any) => {
    return (
      <AppConfigContext.Consumer>
        {() => <Component appConfig={{ ...config }} {...props} />}
      </AppConfigContext.Consumer>
    );
  };

  return ChildComponent;
};

export default withAppConfig;
