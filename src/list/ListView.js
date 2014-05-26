
/* Additional view: list (by bruederli@kolabsys.com)
---------------------------------------------------------------------------------*/

fcViews.list = ListView;


function ListView(element, calendar) {
	var t = this;

	// exports
	t.render = render;
	t.select = dummy;
	t.unselect = dummy;
	t.reportSelection = dummy;
	t.getDaySegmentContainer = function(){ return body; };

	// imports
	View.call(t, element, calendar, 'list');
	ListEventRenderer.call(t);
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
	var body;
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
		t.title = formatDates(date, t.visEnd, opt('titleFormat'));
		
		updateOptions();

		if (!body) {
			buildSkeleton();
		} else {
			clearEvents();
		}
	}
	
	
	function updateOptions() {
		firstDay = opt('firstDay');
		nwe = opt('weekends') ? 0 : 1;
		tm = opt('theme') ? 'ui' : 'fc';
		colFormat = opt('columnFormat', 'day');
	}
	
	
	function buildSkeleton() {
		body = $('<div>').addClass('fc-list-content').appendTo(element);
	}
	
	function setHeight(height, dateChanged) {
	  if (!opt('listNoHeight'))
		  body.css('height', (height-1)+'px').css('overflow', 'auto');
	}

	function setWidth(width) {
		// nothing to be done here
	}
	
	function dummy() {
		// Stub.
	}

}
