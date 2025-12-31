import React from 'react';
import '@testing-library/jest-dom';

vi.mock('framer-motion', () => {
  const actual = vi.importActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: (props) => React.createElement('div', props, props.children),
      form: (props) => React.createElement('form', props, props.children),
    },
  };
});
