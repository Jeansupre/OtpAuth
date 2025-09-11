# OtpAuth

![Node.js version](https://img.shields.io/badge/Node.js-24.4.1-green)
[![Postman Collection](https://img.shields.io/badge/Postman-Collection-orange)](https://otp-auth.postman.co/workspace/Team-Workspace~ea11a8bd-8a06-4238-8b77-36ea8bb55e24/collection/48347840-487cfeb6-66bb-4a3b-8e47-0d14c6dfdb8d?action=share&creator=48347840)

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
3. Set up the PostgreSQL database and configure the connection in `src\infra\db\sequelize.ts`
4. Start the server using `npm run dev`
5. Register a new user directly in the database
6. Do a request to <http://localhost:3000/auth/register> and scan the QR code with Google Authenticator to set up OTP
7. Do a request to <http://localhost:3000/auth/login> and log in using username and the OTP code from Google Authenticator
