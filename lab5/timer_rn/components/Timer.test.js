import React from 'react';
import { render } from '@testing-library/react-native';
import Timer from './Timer';
import { act } from 'react-test-renderer';

jest.useFakeTimers();

test('timer increments count every second', () => {
    const { getByTestId } = render(<Timer />);
    expect(getByTestId('counter').props.children).toBe(0);
    act(() => {
        jest.advanceTimersByTime(1000);
    });
    expect(getByTestId('counter').props.children).toBe(1);
    act(() => {
        jest.advanceTimersByTime(2000);
    });
    expect(getByTestId('counter').props.children).toBe(3);
});
