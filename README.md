# Bobae Match

By Justin Wong

## What is BobaeMatch?

BobaeMatch is a dating application based on user's personal boba interests. It is a fullstack web application that allows users to find significant others or friends according to their boba tastes.

The matching algorithm starts off by finding users who like similar teas, if less than 5 users are matched we start moving on to addons, if there's still less than 5 then we move onto sugar levels, whether they like fruit teas and so forth.

## Technologies Used

BobaeMatch uses a backend built with Python, SQLAlchemy, and Flask. The front end uses React, Javascript, and Redux.

## Custom Courasel Code Snippet
BobaeMatch includes a custom courasel on the home page as I did not want to follow guides or code online but rather create the component myself. My version of the courasel uses setTimeouts and Rerenders to swap image components, and only uses 2 components for this process. These two components can iterate through any series of images and efficiently display them on the page.

![](https://github.com/Sirpeter89/MatchMyBoba/blob/main/customcourasel.PNG)

## Querying Algorithm Code Snippet
I relatively found working with the backend pretty interesting and learned a good amount about SQLAlchemy queries in this process. Working with the code was a fun learning experience and this was the main functionality of my program.

![](https://github.com/Sirpeter89/MatchMyBoba/blob/main/queryexample.PNG)

The heart of BobaeMatch resides in the query for matches, at the moment the querys are relatively simple as they query users by an interest and if there aren't enough users we go down the list to the next interest. This also includes whether the users are lactose intolerant, since that may be an ideal match, or if they like fruit teas.

## Future Plans and Interest
Creating BobaeMatch was an enticing yet difficult journey. Throughout the trials I learned a lot about managing the backend and data queries, yet at the same time styling was a big challenege but I was able to create my own courasel.
