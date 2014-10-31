#####Connect 4

This is a connect4 game that can be played by two different people but on one screen. Think multi-player but
on the same screen.

The game by design always allows the red ball the chance to play first. I know this could be improved upon 
but I didn't want to spend more time on it.

Running Test Suites
===================

The game uses Qunit as its Unit Testing framework and it utilizes jQuery for DOM manipuilation.
To run test uncomment the test scripts and tag
```html
<script type="text/javascript" src="js/test.js"></script>
<script type="text/javascript" src="js/qunit.js"></script>

<link rel="stylesheet" href="css/qunit.css">
<div id="qunit"></div>, <div id="qunit-fixture"></div>
```

After uncommenting the above tag. You will need to comment out
```javascript
<script type="text/javascript"> 
	var play = new Connect(); 
	play.init(); 
</script>
```
All of these will need to be done in the index.html page.

Running the application
=======================

Running the application is simple, you can either run it from a localhost or just open the index.html file.
To run from a localhost, clone the directory into your web root /var/www. Launch a browser and go to
localhost/connect4