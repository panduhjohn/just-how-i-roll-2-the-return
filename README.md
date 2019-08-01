# Just How I Roll - The Return

### Introduction

Remember [Just How I Roll](https://github.com/abbreviatedman/just-how-i-roll)? Well. Now we're going to return to that repo, [refactoring]() the code so that the randomness is all in one place, using functions, parameters, and return statements. This will allow us to fix any bugs and add any feature with a minimum of effort in the future.


### Setup

Let's look at the html, the project structure, and the code.

First off, note that the html is basically the same, but more so. We have new sections for d8, d4, and THREE d6s. We're not doing anything with them yet, but they're there!

For the project structure, remember that we have a ton of number and die images. The six-sided-die ("d6") images are in the `d6` directory, and the numbers are in (surprise) `numbers`.

The JavaScript might be different from what you're used to, since we're using _our_ solution as a jumping off point. But it should be, in our typical style, clear and explicit. The only difference from that jumping off point now is that we're adding DOM queries for the new roll buttons from our html, but not giving them functions yet. That will be (part of) your job!

The other thing you might notice, with your new function skills, is just how dang _repetitive_ it all is. The `querySelector` `onclick` code is all basically the same, and the `roll` functions are almost identical as well, excepting `rollDoubleD6`, which is the near-identical code _twice_.

So that's going to be our task!


### Step 1 - Get Rid Of The Duplicate Random Code

We're doing a lot of randomizing math where we get a number from 1 to x, and _literally_ the only code that changes is x. Instead of setting `roll` to be the result of a multi-step math process, let's change that code to be simply this:

```javascript
const roll = getRollWithMax(6);
```

Feel free to change the name of the function, but whatever you name it, let's write a function that will do just what it looks like: take in a parameter that's the maximum the roll should be, and return a random integer from 1 up to and including that number.

Once you've got that working (and you can use most of the code we've already got!), change the call in each `roll` function to use our new function. We just changed three lines of code to 1! And if we decide to make any changes, we can.

Note that you will have to make two calls in `rollDoubleD6`.

Check to see that everything still works!


### Step 2 - Extend Our App with D8 Rolls


So we've got our shorter functions now. Let's make a new one, and you can see how easy it is.

Write a new function called `rollD8`, and in it, use our new `getRoll` function to get a roll from 1 to 8. Then copy and paste the last three lines from `rollD12`, all that `newSrc` and `rollImage` stuff, and paste it in below.

(Make sure NOT to copy-paste from `rollD6`, as that uses a different set of images!)

The only change you'll need to make is the selector--in the `querySelector` code, change the string passed in from `'.d12-roll'` to `'.d8-roll'`, the html for which is already in there.

DON'T FORGET to go back up to the top and set the `onclick` to be set to your new function, not `undefined`!

Check your live server'd app to see if you can indeed roll your d8, and make sure it's hitting the 1 and the 8 and nothing beyond that range. If so, well done! You extended the app all the more easily because you first simplified the code.


### Step 3 - Simplify That `rollImage` Code

Remember when we copy-pasted that code and changed only one thing? That's a sure sign that we should instead be writing a function that takes in, as a parameter, the one thing that's changing. So let's do that!

Let's walk through our three lines:

1. Our `newSrc` declaration puts our `roll` variable in a template string.
2. Our `rollImage` declaration grabs the particular image to change on our DOM. This is the part that changes, as each roll function should be putting the image up on its respective part of the DOM.
3. The last line makes it happen: set the `rollImage`'s `src` attribute to be the string we put together based on the roll. This line doesn't change in any way.

So, let's write a new function (maybe `addImage`?) that takes in the roll we get and the selector of the image we want. That way it can make the string based on the roll, then grab the correct image on the DOM, then put it all together for us.

Note that this code will (currently!) ONLY work for the non-d6 rolls, as d6 rolls use a different set of images.

Once you have that function, use it in ALL of your non-D6 rolls functions to reduce each function from its original six lines to TWO. Wow!

HINT: don't forget what kind of parameter `document.querySelector` takes in!


### Step 4 - Make A D4 Roll

Now that our functions are so short, this should be super easy. You can do the same for the d4 that you did for the d8 (including setting the `onclick` at the top!), but ow your function will only need to be two frickin' lines. How cool is that?!


### Step 5 - Do The Same Thing For The D6 Image Adding

The d6 functions do the same thing with their image adding, except that the path to their images is different. Write a function that does what the original did, only with the path change.

And now use it in both existing d6 functions!


### Step 6 - Write A Function For The Triple D6 Rolls

Make sure you're using the functions you've got, only doing it three times. It should only be 6 lines of code total!


### Step 8 - Let's Simplify All Those Queries!

We have an awful lot of similar code with our many click listeners being added to all of our buttons. All that changes with each one is the selector and the function to add as an onclick. See if you can 