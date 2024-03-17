# Reservations App
Is an app that helps restaurant owners manage
their business better, by displaying upcoming reservations,
so that they can take action on them## Demo link:
Access demo link: https://reservations-pi.vercel.app/

## Table of Content:

- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Setup](#setup)
- [Approach](#approach)
- [Assumptions-Decisions](#assumptions-decisions)
- [Useful links](#useful-links)

## Screenshots
![wireframe drawio](https://github.com/Eltantawye/reservations/assets/26147983/017fb6b3-1f34-4447-a2dc-a8f5b057a3e0)

![image](https://github.com/Eltantawye/reservations/assets/26147983/8d98cd0c-b0b0-4c60-838c-d1a03524dced)

## Technologies
- TS
- React (contextAPI, Hooks) 
- MUI

## Setup
make sure that you have NodeJS installed
- Download or clone the repository
- Run `npm install`
- Run `npm start`
- You will be taken to the localhost page

## Approach
- Set up the project structure and install necessary dependencies.
- Created the base layout using MUI (Material-UI) components for consistent styling and responsive design.
- Implemented React Context API for managing the state of reservations, allowing easy access to reservation data throughout the application
- Built reusable components for sorting and filtering reservations, integrating them with the reservations context.
- Developed generic filter and sorting utilities to enhance data manipulation and mocking, providing flexibility for different use cases.
- Used vercel for deployment 

## Assumptions-Decisions
- Chose MUI as the UI library for its advantages such as pre-built components, theming support, and responsive design capabilities.
- Utilized React Context API for managing the state of reservations due to its simplicity and ability to avoid prop drilling. However, considering the potential complexity of the state management, planning to evaluate and potentially switch to Redux Toolkit in the future.
- Planned to incorporate React Router to enhance app arrangement and provide a seamless navigation experience for users.[future plan]
- Developed generic filter and sorting utilities to improve data manipulation and mocking, allowing for easy adaptation to different data structures and requirements.
- Incorporate Storybook as a development tool to create an isolated component development environment and showcase UI components in a visual and interactive manner. This will promote component reusability, facilitate collaboration between designers and developers, and ensure consistent UI implementation across the application.[future plan]
- Apply unit testing and integration testing as part of the development process. Unit tests will be created to verify the functionality of individual components, ensuring they work correctly in isolation. Integration tests will be implemented to test the interactions between different components and simulate user scenarios. These testing practices will enhance code quality, identify and fix issues early on, and maintain the stability and reliability of the application.[future plan]

## Useful links
- [How to use React Context effectively](https://kentcdodds.com/blog/how-to-use-react-context-effectively)
- [MUI Components](https://mui.com/material-ui/all-components/)
- [MUI Datepicker](https://mui.com/x/react-date-pickers/date-picker/)

