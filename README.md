# Web App for Construction Company Database Administration

## Table of Contents
1. [Project Overview](#Project Overview)
2. [Features](#Features)
3. [Citations](#Citations)

## Project Overview

The goal of this project was to design (1) a normalized database used by a fictional company for some business purpose and (2) a web app that provides a UI for the performance of CRUD operations on each table in that database. 

### Features

- DDL script to create MariaDB database, which includes some procedures and triggers used to maintain referential integrity. Comments on attributes are used to specify the type of form and value formatting provided for the attribute on the frontend UI.
- React-Tailwind web app with Express backend that dynamically generates the required backend routes and frontend components and routes based on the database it communicates with.

## Citations

This project uses a heavily modified version of the starter code provided by the CS340 React Starter App guide written by [Devin Daniels](https://github.com/devingdaniels) and [Zachary Maes](https://github.com/zacmaes) under the supervision of [Dr. Michael Curry](mailto:michael.curry@oregonstate.edu) and [Dr. Danielle Safonte](mailto:danielle.safonte@oregonstate.edu).

