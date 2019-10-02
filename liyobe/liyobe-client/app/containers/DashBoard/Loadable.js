/**
 *
 * Asynchronously loads the component for DashBoard
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
