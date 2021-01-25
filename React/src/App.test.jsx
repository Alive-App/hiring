import React from 'react';

import { mount } from 'enzyme';
import App from './App';
import toJson from 'enzyme-to-json';

import StockItem from './components/StockItem';
import store from './config/store';
import { Provider } from 'react-redux';
import Stock from './pages/Stock';
import StockDetails from './components/StockDetails';
import StockChart from './components/StockChart';
import StockCompare from './components/StockCompare';
import StockProjection from './components/StockProjection';
import Home from './pages/Home';
import { addToPortfolio, removeFromPortfolio } from './actions/portfolio';

describe('rendering components', () => {

  it('should render app without crashing', () => {
    const app = mount(<App />);
    expect(toJson(app)).toMatchSnapshot();
  });

  it('should render header', () => {
    const app = mount(<App />);
    expect(app.find('#header')).toHaveLength(1);
  });

  it('should open search modal', () => {
    const app = mount(<App />);

    app.find('#search-btn').forEach((el) => el.simulate('click'));

    expect(app.find('#search-input')).toHaveLength(1);
  });

  it('should type some search', () => {
    const app = mount(<App />);
    app.find('#search-btn').forEach((el) => el.simulate('click'));
    const input = app.find('#search-input');
    input.simulate('focus');
    input.instance().value = 'apple';

    expect(input.instance().value).toBe('apple');
  });

  it('should render a stock item', () => {
    const item = mount(<StockItem data={{ symbol: 'AAPL', name: 'Apple inc' }} />);
    expect(toJson(item.find('.product-name'))).toMatchSnapshot();
  });

  it('should render the Stock screen without crashing', () => {
    const screen = mount(
      <Provider store={store}>
        <Stock id="AAPL" />
        );
      </Provider>,
    );
    expect(screen.find('StockDetails')).toHaveLength(1);
  });

  it('should render StockDetails without crashing', () => {
    const screen = mount(
      <Provider store={store}>
        <StockDetails id="AAPL" />
        );
      </Provider>,
    );
    expect(toJson(screen)).toMatchSnapshot();
  });

  it('should render StockChart without crashing', () => {
    const screen = mount(
      <Provider store={store}>
        <StockChart id="AAPL" />
        );
      </Provider>,
    );
    expect(toJson(screen)).toMatchSnapshot();
  });

  it('should render StockCompare without crashing', () => {
    const screen = mount(
      <Provider store={store}>
        <StockCompare id="AAPL" />
        );
      </Provider>,
    );
    expect(toJson(screen)).toMatchSnapshot();
  });

  it('should render StockProjection without crashing', () => {
    const screen = mount(
      <Provider store={store}>
        <StockProjection id="AAPL" />
        );
      </Provider>,
    );
    expect(screen.contains(<h5>Projeção de ganhos</h5>)).toBe(true);
  });

  it('should render StockCompare without crashing', () => {
    const screen = mount(
      <Provider store={store}>
        <StockCompare id="AAPL" />
        );
      </Provider>,
    );
    expect(toJson(screen)).toMatchSnapshot();
  });

  it('should render Home portfolio items without crashing', () => {
    addToPortfolio({
      Symbol: 'GOOG',
      Name: 'Alphabet Inc',
      Currency: 'USD',
      Country: 'USA',
    });

    const screen = mount(
      <Provider store={store}>
        <Home id="AAPL" />
        );
      </Provider>,
    );
    screen.find('StockItem');
    expect(screen).toHaveLength(1);
  });
});

describe('test actions', () => {
  beforeAll(() => {
    addToPortfolio({
      Symbol: 'AAPL',
      Name: 'Apple Inc',
      Currency: 'USD',
      Country: 'USA',
    });
  });

  it('should remove a portfolio item', () => {
    console.log('length', store.getState().portfolio.length);
    removeFromPortfolio({
      Symbol: 'AAPL',
    });
    expect(store.getState().portfolio).toHaveLength(1);
  });
});
