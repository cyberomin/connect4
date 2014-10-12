var play = new Connect();
play.init();

QUnit.test( "build table exist", function( assert ) {
	var table = "<table><tbody><tr class='row' id='0'><td width='80px' height='70px' id='1' data-row='0' data-column='0'></td><td width='80px' height='70px' id='2' data-row='0' data-column='1'></td><td width='80px' height='70px' id='3' data-row='0' data-column='2'></td><td width='80px' height='70px' id='4' data-row='0' data-column='3'></td><td width='80px' height='70px' id='5' data-row='0' data-column='4'></td><td width='80px' height='70px' id='6' data-row='0' data-column='5'></td><td width='80px' height='70px' id='7' data-row='0' data-column='6'></td></tr><tr class='row' id='1'><td width='80px' height='70px' id='8' data-row='1' data-column='0'></td><td width='80px' height='70px' id='9' data-row='1' data-column='1'></td><td width='80px' height='70px' id='10' data-row='1' data-column='2'></td><td width='80px' height='70px' id='11' data-row='1' data-column='3'></td><td width='80px' height='70px' id='12' data-row='1' data-column='4'></td><td width='80px' height='70px' id='13' data-row='1' data-column='5'></td><td width='80px' height='70px' id='14' data-row='1' data-column='6'></td></tr><tr class='row' id='2'><td width='80px' height='70px' id='15' data-row='2' data-column='0'></td><td width='80px' height='70px' id='16' data-row='2' data-column='1'></td><td width='80px' height='70px' id='17' data-row='2' data-column='2'></td><td width='80px' height='70px' id='18' data-row='2' data-column='3'></td><td width='80px' height='70px' id='19' data-row='2' data-column='4'></td><td width='80px' height='70px' id='20' data-row='2' data-column='5'></td><td width='80px' height='70px' id='21' data-row='2' data-column='6'></td></tr><tr class='row' id='3'><td width='80px' height='70px' id='22' data-row='3' data-column='0'></td><td width='80px' height='70px' id='23' data-row='3' data-column='1'></td><td width='80px' height='70px' id='24' data-row='3' data-column='2'></td><td width='80px' height='70px' id='25' data-row='3' data-column='3'></td><td width='80px' height='70px' id='26' data-row='3' data-column='4'></td><td width='80px' height='70px' id='27' data-row='3' data-column='5'></td><td width='80px' height='70px' id='28' data-row='3' data-column='6'></td></tr><tr class='row' id='4'><td width='80px' height='70px' id='29' data-row='4' data-column='0'></td><td width='80px' height='70px' id='30' data-row='4' data-column='1'></td><td width='80px' height='70px' id='31' data-row='4' data-column='2'></td><td width='80px' height='70px' id='32' data-row='4' data-column='3'></td><td width='80px' height='70px' id='33' data-row='4' data-column='4'></td><td width='80px' height='70px' id='34' data-row='4' data-column='5'></td><td width='80px' height='70px' id='35' data-row='4' data-column='6'></td></tr><tr class='row' id='5'><td width='80px' height='70px' id='36' data-row='5' data-column='0'></td><td width='80px' height='70px' id='37' data-row='5' data-column='1'></td><td width='80px' height='70px' id='38' data-row='5' data-column='2'></td><td width='80px' height='70px' id='39' data-row='5' data-column='3'></td><td width='80px' height='70px' id='40' data-row='5' data-column='4'></td><td width='80px' height='70px' id='41' data-row='5' data-column='5'></td><td width='80px' height='70px' id='42' data-row='5' data-column='6'></td></tr></tbody></table>";
	assert.equal(play.buildTable(), table ,"table and buildTable are the same" );
});

QUnit.test( "build table is a function", function( assert ) {
	assert.ok(typeof play.buildTable === "function" ,"buildTable is a function" );
});

QUnit.test( "msgBoxAlert is a function", function( assert ) {
	assert.ok(typeof play.msgBoxAlert === "function" ,"msgBoxAlert is a function" );
});


QUnit.test( "animate ball", function( assert ) {
	var data = {
		row : 5,
		column : 0 
	};
	var color  = "redBall";
	assert.ok(typeof play.animateBall === "function" ,"ball is animating" );
});