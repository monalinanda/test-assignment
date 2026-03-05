# AI Disclosure

I used ChatGPT and Copilot  to help me to understand Nestjs. It is new to me  and i had not work with it before . I mainly used AI to understand how the services and controller  structure work  and see the simple examples implementaion for fetching data from API .

## Prompt I used 
1. what is contoller and Providers in Nestjs ?
2. How does a Nestjs fetch data from an external API and return it through a controller ? 

This helped me understand the Controller and Providers(service) pattern and how to structure API calls properly.

## AI output 
The AI initially suggested placing the API call directly in the controller without error handling .

## Problems with this Output:

- Breaks NestJS best practices (all logic in only in controller)

- Harder to maintain

- No error handling

- API key hardcoded (insecure)


## How I Fixed It 

while implemeted code in my project and read nestjs documentation and understand difference between controller and service .
- Also asked AI :  If in controller we can fetch api then why need service ? 
- Then I understood we can fetch an API directly in the controller, but using a service is better for clean architecture, maintainability, and reusability.

## Fixes:

- Moved logic into a service .
- Makes controller simple and maintainable .
- Uses environment variables ( secure API key ) .
- Added error handling 



# Scalability Questuion 

## If this service reached got 10k requests/second, where would the first bottleneck in current code ?

1. API rate Limit :
    - TMDB allows about 40 requests per 10 seconds per API key .
    - If service tries to call TMDB 10,000 times per second, it will hit the limit almost instantly because 10,000 ≫ 40.   TMDB will respond with a 429 (Too Many Requests) error .
     - service doesn’t do any  caching, or optimization .It jsut directly calls api and returns response .

2. Chaching :
     - getGenres() , getPopularMovies() and searchMovies() fetch fresh data every time (every request hits TMDB).
     - Without in-memory ,Redis or database caching, repeated requests create unnecessary load on TMDB and the server .

3. Slow external API calls :
    - Every user waits for TMDB to respond .
    - When  service asks TMDB for data, TMDB takes some time to process the request and send back the response . (If lots of users make requests at the same time, this adds delay and can overload  server )






