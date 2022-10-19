import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import whyDidYouRender from '@welldone-software/why-did-you-render';

whyDidYouRender(React, {
  onlyLogs: true,
  trackAllPureComponents: true,
});
