FROM ruby:2.6.5-alpine

RUN gem install bundler:1.17.2

RUN apk add --no-cache --update build-base \
    postgresql-dev \
    tzdata \
    postgresql-client \
    git \
    && rm -f /var/cache/apk/*

ENV RAILS_ENV production
ENV RAILS_SERVE_STATIC_FILES true

RUN mkdir -p /app
WORKDIR /app

COPY Gemfile /app
COPY Gemfile.lock /app

RUN bundle config --global frozen 1 \
    && bundle install --path=vendor/bundle --without development test

COPY . /app

RUN chmod +x /app/bin/server
RUN mkdir -p tmp/pids
RUN mkdir -p tmp/cache

EXPOSE 3001
