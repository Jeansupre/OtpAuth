# OtpAuth

![Node.js version](https://img.shields.io/badge/Node.js-24.4.1-green)

Project to implement passwordless authentication using TOTP codes, based in [RFC 6238](https://datatracker.ietf.org/doc/html/rfc6238) and [RFC 4226](https://datatracker.ietf.org/doc/html/rfc4226), integrated with Google Authenticator.

## Requirements

1. PostgreSQL database
2. Node.js and npm
3. Google Authenticator app on the user's mobile device

## Features

- OTP setup for users
- OTP generation and validation using TOTP

## Usage

1. Clone the repository
2. Install dependencies using `npm install`
3. Set up the PostgreSQL database and configure the connection in `config.js`
4. Start the server using `npm run dev`
5. Register a new user directly in the database
6. Do a request to <http://localhost:3000/auth/register> and scan the QR code with Google Authenticator to set up OTP
7. Do a request to <http://localhost:3000/auth/login> and log in using username and the OTP code from Google Authenticator
