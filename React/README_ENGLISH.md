# Background

A stock broker is developing a system to allow investors to make better decisions about their portfolio. A important feature is to verify an stock performance in five scenarios:

  - Current price;
  - Historic price;
  - Current price vs other stocks;
  - Gains projection with a specific date acquisition.
  
To accomplish that, the software company decided to develop WebAPP. Your mission is to develop this WebAPP.
   

# Technical Requirements

Your solution must have automated tests.

To obtain the stock information you may use Alpha Vantage (https://www.alphavantage.co). If you find libraries for that, you are allowed to use them.

The error handling will not be specified. The candidate may interfere in the error cases or duplicity, and handle them. The absense of this error handling will not disqualify the test; The presence of those will count extra points.

## Gain projections

The idea is to implement something simple, without taking in consideration dividends, administrative taxes or any other indexes that could affect the total amount. Assume that the investor has invested an amount of money on a stock some time in the past, and that he needs to know how much money he would have gain or lost.

# Test delivery procedures:

1. Fork this project on github;
2. Build your code on the fork;
3. Write a README explaining how to run your application and the tests. Give as much details as possible;
4. Open a pull request when you are done;

# Details

## WebAPP

The most important part of this challenge is that we understand how to handle components that build the current technics to build client-side development in terms of assets processing, responsibility segregation, minification, local storage, etc. Esthetics are not important.

Features:

- Add stocks to the portfolio;
- Check current stock  information (last price, date and time of last update);
- See historic stock price, allowing a data rage;
- Make a gains projection of a stock based on a past date of acquisition;

If you don't know how to organize this features, You may use Yahoo Finance to get inspiration or make a simple master-detail.


https://www.alphavantage.co
