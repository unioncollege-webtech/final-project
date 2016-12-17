Trumps - The Game
=================
Trumps is an incremental (clicking) game where you try to grow your Trump army. You must upgrade your Trump colonies and ultimately take over the world.

Each save has the following properties:

- playerID - Unique identifier
- trumps - # of current trumps
- maxTrumps - the maximum number of trumps one can acquire
- money - your current campaign funding

Possible future properties:

- areas - (TODO): progress for areas is saved with the player file and the appropriate buttons and areas are only shown once player has appropriately unlocked them
-- mine - see above
-- materials - see above
-- buildings - see above

Features
--------

- Users can bring Trumps to their side with a quick recruiting session
- Users can use their Trumps to increase their campaign funds
- Users can upgrade their Trump housing barracks to hold more Trumps
- Users can delete their save if they want to start over

Approach
--------
Trumps is an Express web application that uses Pug for templating and MongoDB to store and search for player data. Socket.IO is used for asynchronous transfer of data.

Routes
------
- / - The home or 'index' route. All features are on this route, due to Socket.IO ajax

Additional Features (TODO):
---------------------------
- Add things to the remaining areas in The Mines
- Add support for the other 4 locations (The Village, The City, The Whitehouse, The Situation Room)
- Support multiple users (either through a username/password system or another form of UUID system (IP address?)) as currently there is only one worldwide save (as fun as it would be to see how much the world would play this collectively)
