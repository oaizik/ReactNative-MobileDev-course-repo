import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoadingIndicator from '../components/LoadingIndicator';

describe('loading indicator component tetst', function () {
  test('render loading indicator component with given text', function () {
    const { getByText } = render(<LoadingIndicator text={'indicator text...'} />);
    expect(getByText('indicator text...')).toBeDefined();
  });

  test('render loading indicator component snapshot', function () {
    const { baseElement } = render(<LoadingIndicator text={'indicator text...'} />);
    expect(baseElement).toMatchSnapshot();
  });
});