#ReadMe

The game uses Qunit as its Unit Testing framework and it utilizes jQuery for DOM manipuilation.
To run test uncomment the test scripts (<script type="text/javascript" src="js/test.js"></script>, 
<script type="text/javascript" src="js/qunit.js"></script>), 
css <link rel="stylesheet" href="css/qunit.css"> and div (<div id="qunit"></div>, <div id="qunit-fixture"></div>)
and commenting <script type="text/javascript"> var play = new Connect(); play.init(); </script>
on the  index.html page.

The game by design always allows the red ball the chance to play first. I know this could be improved upon 
but I didn't want to spend more time on it.
