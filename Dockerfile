FROM ruby:2.7.2

RUN apt-get update && \
    apt-get install -y libtag1-dev nodejs yarn

WORKDIR /usr/src/app
COPY Gemfile Gemfile ./
COPY Gemfile.lock Gemfile.lock ./

RUN bundle install

COPY . .