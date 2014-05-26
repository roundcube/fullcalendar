
/* Additional view: table (by bruederli@kolabsys.com)
---------------------------------------------------------------------------------*/

fcViews.table = TableView;


function TableView(element, calendar) {
	var t = this;

	// exports
	t.render = render;
	t.select = dummy;
	t.unselect = dummy;
	t.getDaySegmentContainer = function(){ return table; };

	// imports
	View.call(t, element, calendar, 'table');
	TableEventRenderer.call(t);
	var opt = t.opt;
	var trigger = t.trigger;
  var clearEvents = t.clearEvents;
	var reportEventClear = t.reportEventClear;
	var formatDates = calendar.formatDates;
	var formatDate = calendar.formatDate;

	// overrides
	t.setWidth = setWidth;
	t.setHeight = setHeight;
	
	// locals
	var div;
	var table;
	var firstDay;
	var nwe;
	var tm;
	var colFormat;
	
	
	function render(date, delta) {
		if (delta) {
			addDays(date, opt('listPage') * delta);
		}
		t.start = t.visStart = cloneDate(date, true);
		t.end = addDays(cloneDate(t.start), opt('listPage'));
		t.visEnd = addDays(cloneDate(t.start), opt('listRange'));
		addMinutes(t.visEnd, -1);  // set end to 23:59
		t.title = (t.visEnd.getTime() - t.visStart.getTime() < DAY_MS) ? formatDate(date, opt('titleFormat')) : formatDates(date, t.visEnd, opt('titleFormat'));
		
		updateOptions();

		if (!table) {
			buildSkeleton();
		} else {
			clearEvents();
		}
	}
	
	
	function updateOptions() {
		firstDay = opt('firstDay');
		nwe = opt('weekends') ? 0 : 1;
		tm = opt('theme') ? 'ui' : 'fc';
		colFormat = opt('columnFormat');
	}
	
	
	function buildSkeleton() {
		var tableCols = opt('tableCols');
		var s =
			"<table class='fc-border-separate' style='width:100%' cellspacing='0'>" +
			"<colgroup>";
		for (var c=0; c < tableCols.length; c++) {
			s += "<col class='fc-event-" + tableCols[c] + "' />";
		}
		s += "</colgroup>" +
			"</table>";
		div = $('<div>').addClass('fc-list-content').appendTo(element);
		table = $(s).appendTo(div);
	}
	
	function setHeight(height, dateChanged) {
	  if (!opt('listNoHeight'))
		  div.css('height', (height-1)+'px').css('overflow', 'auto');
	}

	function setWidth(width) {
		// nothing to be done here
	}
	
	function dummy() {
		// Stub.
	}

}
