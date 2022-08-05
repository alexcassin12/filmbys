# Summary

'Filmbys' is a website that allows users to view critics’ ratings of movies, as well as give their personal ratings and build their own ranked list of their favourite films. As a movie buff, I always found myself checking IMDb, Rotten Tomatoes and Metacritic to see how highly a movie is regarded, but could never find a site where all of those scores were available in the same place. So, I created Filmbys!

# How I Created the Site

I built Filmbys using HTML, CSS/SASS and JavaScript, with the latter being written using an MVC style architecture, making use of ES6 modules and classes. When the user searches for a movie, or selects a movie from a search list, an async function is called, which in turn makes an AJAX call to IMDb’s public web API using Fetch API. The returned promises are then handled (using async/await), the resulting JSON data converted to a JavaScript object, and then stored in the model. The controller will then in turn call the appropriate function in the view, where the data is then dynamically rendered.

After making a search, users are also able to give their own rating for the movie. This rating, along with the data about that movie, is then stored as an object in an array in the model, which is looped through, and each object’s data rendered to create the user’s movie list on the home page, in order of the inputted user rating. This array is also saved to the browser’s local storage when the page is closed, so the user’s movie list is available to them when coming back to the website at a later time.

# Problems and Solutions

Due to the majority of the content being dynamically rendered using JavaScript, trying to select HTML elements using ‘querySelector’ and other standard methods was difficult, as I would constantly run into reference errors. To get around this problem I had to do a lot of DOM traversing inside the view to select HTML elements, especially when adding event listeners, which I felt I developed my skills in quickly.

This was the first project I built where I ran into problems when it came to using the site on Apple devices using IOS. Despite the site working well on all the devices, IOS was insisting on adding its own stylings to many elements (e.g. buttons). To fix this, I went online to find if other people had had similar problems (surprise surprise, I’m not the first developer to have issues with IOS compatibility!). It didn’t take too long to find a web-kit fix for this problem, but it definitely gave me an introduction into the issues that can arise from other operating systems (this would come back when building my Forever Flora e-commerce site).

# What I Think Went Well

Overall I am very satisfied with how the site has turned out. I like the logo and graphics I created, as well as the layout for each of the sections, especially the single movie display, which I deliberately created using CSS Grid to develop my skills. I have also been using Filmbys frequently since deploying it, and have found the user experience to be enjoyable and it runs quickly and efficiently.

When it comes to the JavaScript, I am really happy with how the site functions, and I think using the MVC structure was a great way to keep the code clean, effective, and made it simple to update and troubleshoot. Furthermore I think I did a great job of storing and manipulating data on the site, as this is also done in an efficient manner.

# What I Think I Could Have Done Better

Looking back at the project, there are a few things I feel I could improve upon. As mentioned above, I had to rely on a lot of DOM traversing to select HTML elements inside the view. This was definitely beneficial to the development of my skills, but I do feel it could have been done in a cleaner, more efficient way in places.

I also feel I could have done a better job of optimising the site for mobile use. The problem I have found is, due to the wildly varying length of movie titles, when space becomes restricted due to a small viewport, layout and overflow problems can quickly arise. Fore example, the layout that may work when displaying ‘Shrek’ may well encounter problems when displaying ‘Pirates of the Caribbean - The Curse of the Black Pearl ’. I plan on revisiting this at some point to see if I can create a more dynamic layout for smaller viewport devices.
