import React from 'react';
import { render } from '@testing-library/react';
import App from '../../src/App';
describe('app', () => {
  it('open first test',async () => {
    const { queryByTestId } = render(<App />);
    const msgComp = queryByTestId('test-message');

    expect(msgComp.innerHTML).toBe('1234');
  });
});
