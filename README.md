# ict2201-2019t1-team20

## Authors

* **IGN- realname**
* **Xueraxy - Chua Wei Ye**
* **Boonjin123 - Tok Boon Jin**
* **dotoxx - wei wei**
* **vernonljw - Lim Jun Wei, Vernon**
* **Matt4Realz - Tan Guan Hong**
* **plh0219 - Peh Li Hao**



## Introduction
MappySteps is a hybrid gamified application that supports both IOS and android devices that helps to enrich commute experience for users during their First Mile and Last Mile (FMLM) of their journey by providing multiple FMLM routes between 2 points on a map with an interesting reward system. The application allows for step-by-step navigation, ability to discover new routes and feedback about their experience in terms of safety, speed and enjoyment. Users who make of our application are able to earn points and use it to redeem attractive vouchers and rewards.

### Frameworks/Libraries
- Ionic 5 – Cross platform Mobile Application 
- Angular Typescript – a superset of JavaScript which provides advanced feature.
- Google map javascript API – Maps with customize attribute such map type, controls and others.

## How To Run
### Tabs in our Application
- Route
- Profile
- Route History
- Rewards

### Register / Login Page
Users will start at our main page, clicking on login will redirects user to the "Login Page"
Users there can create a new account if they do not have an account, if they do, they can login from there.
New users create an account by keying in these fields
- First Name (E.g. Matt)
- Last Name (E.g. Tan)
- Password - (P@ssw0rd1, usage of Upper Case, Special Character and Numbers)
- Confirm Password (Has to match the password entered above)
- Email (Has to be a valid email address as there will be a confirmation email issued)
- Mobile (E.g. 91234567)
- Age (Has to be between the age of 5 - 90)
- Gender (E.g. Male/Female)
- Commute Method (E.g. Walking)

After the creation the account, the user will then be able to login into the system. By default, the user is given 0 points and no reward tier. The points and reward tier is allocated by the system and requires no user inputs.

### Main Page (Route Page)
After a successful login by the user, they will then be at the routing screen page which will show the route. At this page, the user will be able to enter their "Start" point and their "End" points before clicking "Get Directions". 

Clicking on the "Get Directions" will give the User up to 3 routes (if the routes available is 3), upon selecting one, will remove the other 2 and it will result in the tracking of the User beginning. 

If the user has also successfully completed a route before, they can also load the saved route from the "Saved Route" button located at the top right hand corner of the application in purple.

If the user deviates from the path for too long, the User will receive a prompt that they have deviated from the path for too long. Users are advised to follow the given route from the app to prevent this from occuring. 

Upon the successful completion of the route, the User will receive a prompt that the route has been completed and that points have been credited based on the distance travelled. These points can be used by the user to claim rewards at the rewards tab.

The User's completed route will also be saved into their "Route History", which can be seen by clicking the route history tab.

### Profile Page
This page is only accessible after the user has successfully logged into the system. The profile tab is also located at the tabs bar at the bottom of the page. 

When the user clicks "Edit Profile" at this screen, the user can only change the following : 
- Commute Method
- Email Address
- Phone Number

The user can save any changes made by clicking the "Save Changes" Button. If the fields are incorrectly filled, the user will not be able to save any changes made until the relevant fields have been correctly filled.

### Route History Page
Users at this page are able to view their completed routes. Clicking any of these routes will prompt the user with a pop up to rate the following three (3) fields : 
- Route Safety
- Route Speed
- Enjoyment

The last field of "Comments" are optional.
All submitted feedback will be for developers to evaluate and improve for future versions of the project.

### Rewards Page
At this page, the users will be able to see their "Points" and their current "Tier". The rewards are classified into three (3) tiers :
- Bronze (1500 Points required to claim)
- Silver (3000 Points required to claim)
- Gold (4500 Points required to claim)

The User's tier are classified into three (3) tiers as well :
- Bronze (Lifetime steps minimum more than 0 points)
- Silver (Lifetime steps more than 3000 points)
- Gold (Lifetime steps more than 4500)

User's at the bronze tier will not be able to claim rewards at the Reward tier above their own. In example, a User in the "Bronze" tier will not be able to claim rewards that are in the "Gold" tier. 

Users at the higher tier will be able claim rewards at tiers below their own as well. In example, Users at "Gold" tier will be able to claim rewards that are in the "Bronze" tiers.

The Users will also be able to see the rewards that they have claimed as well. If the User does not have any rewards, the User will be prompted that there is no rewards to be displayed.

Lastly, the User must also have sufficient steps in order to claim the rewards. If a User does not have enough points, the User will be prompted that they do not have enough points to claim the reward. 

### Youtube Video
