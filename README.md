# management-console-api-mock

## About

`faker` takes care of generating example data.

`faker.name.findName()` is used for client name.

`faker.company.companyName()` is used for button title.

`faker.lorem.paragraph()` is used for button description.

Application uses `express` web framework, `nginx` as a web server and `Passenger` as an app server.

## Prerequisites

### Access token
Access token must be included in `X-API-Key` header. 

If no token specified or token is expired `401` will be returned.

### Client ID
Client ID must be specified in URL. If no client found with specified ID `404` will be returned.

If client is found but he is banned `403` will be returned.

## `GET /clients/:clientID/buttons`
Returns console title and buttons in JSON format.

## `POST /clients/:clientID/events`
Logs user event. Requires JSON with `buttonID` in request body.

Returns nothing. If success `201` is returned, otherwise `422`.
