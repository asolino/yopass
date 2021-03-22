import { Route } from 'react-router-dom';

import CreateSecret from './createSecret/CreateSecret';
import DisplaySecret from './displaySecret/DisplaySecret';

export const Routes = () => {
  return (
    <div>
      <Route path="/" exact={true} component={CreateSecret} />
      <Route exact={true} path="/s/:key" component={DisplaySecret} />
      <Route exact={true} path="/f/:key" component={DisplaySecret} />
    </div>
  );
};
