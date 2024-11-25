
## Inspiration

On average, freshmen gain 7.5 pounds during their first year of college. Maintaining a healthy diet is crucial, often playing a more significant role in overall well-being than exercise. However, with busy schedules filled with classes and extracurricular activities, students frequently struggle to find time to focus on their nutrition. As a result, diet can become an afterthought, making it challenging for students to maintain healthy eating habits amidst their hectic routines.

## What it does

HungryHokies is a convenient and efficient web app designed to help students manage their nutrition. By simply snapping a picture of their food, students can instantly access detailed information about its calorie content and macronutrients. The app also automatically logs the meal, allowing users to easily track their daily intake and stay aligned with their personalized calorie goals. This process empowers students to make informed dietary choices, promoting healthier eating habits without the hassle of manual tracking.

## How we built it
We built this app by combining our react front-end with a FastAPI back end. Our react front end uses tailwind for responsive page styling and directly interfaces with the APIs provided with our backend. Our backend then connects to GPT vision for our food recognition engine and database to provide users with important metrics relating to their meals and personal health.  This works by using GPT vision to detect the foods present in an image, then we query the NutritionIX database to provide the information for each item. This information is then logged for the user using a MongoDB database. We also allow users to log information such as their weight and height data so they can track their personal nutrition goals. This allows us to use formulas such as the Mifflin-St Jeor Equation to provide recommendations and assist users in their journey.
## Challenges we ran into
We struggled the most with creating our own custom AI model. While we were able to train our own models, we quickly realized that this would not accurately account for many foods because the datasets we used mostly included western foods. It did not sit with us that it wouldn’t be able to pick up other cuisines, especially with the amount of diverse food in Blacksburg. Instead, we chose to use GPT vision for image recognition for its much more accurate and diverse detection abilities than we would be able to employ on our own in such a limited time.

## Accomplishments that we're proud of
We utilized ReactJS, Tailwind, and MongoDB technologies to provide an aesthetically pleasing, responsive, and uniquely Hokie web application so that every user feels compelled to use our product. We’re proud that we are helping Hokies make smarter choices about their food consumption in an easy and effective manner.

## What we learned

We learned from testing that this app can help people who have a hard time reading the small labels on foods. Which means this may help people with poor eyesight.
## What's next for HungryHokies
The next big thing for HungryHokies is to connect to apple health. This will allow us to provide much more data to the user. Specifically, how diet and exercise can help maintain or reach a person’s goal.

