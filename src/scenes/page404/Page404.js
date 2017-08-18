import React from 'react';
import { Icon } from 'semantic-ui-react';
import './page404.css';
const Page404 = () => {
  return (
    <div className="page404-root">
      <div className="page404-title">Ooops!</div>
      <div className="page404-moto">
        This is not the web page you are looking for.<br />
        Click on the above links to navigate
      </div>
      <Icon
        className="page404-ico"
        name="warning sign"
        size="massive"
        inverted
        color="grey"
      />
    </div>
  );
};

export default Page404;
