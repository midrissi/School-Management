/*
This software is allowed to use under GPL or you need to obtain Commercial or Enterise License
to use it in non-GPL project. Please contact sales@dhtmlx.com for details
*/
(function(){function h(b){var a=scheduler._props?scheduler._props[scheduler._mode]:null,e=scheduler.matrix?scheduler.matrix[scheduler._mode]:null,f=a||e;if(a)var g=f.map_to;if(e)g=f.y_property;f&&b&&(m=scheduler.getEvent(b)[g])}var m,c;scheduler.config.collision_limit=1;scheduler.attachEvent("onBeforeDrag",function(b){h(b);return!0});scheduler.attachEvent("onBeforeLightbox",function(b){var a=scheduler.getEvent(b);c=[a.start_date,a.end_date];h(b);return!0});scheduler.attachEvent("onEventChanged",function(b){if(!b)return!0;
var a=scheduler.getEvent(b);if(!scheduler.checkCollision(a)){if(!c)return!1;a.start_date=c[0];a.end_date=c[1];a._timed=this.is_one_day_event(a)}return!0});scheduler.attachEvent("onBeforeEventChanged",function(b){return scheduler.checkCollision(b)});scheduler.attachEvent("onEventAdded",function(b,a){var e=scheduler.checkCollision(a);e||scheduler.deleteEvent(b)});scheduler.attachEvent("onEventSave",function(b,a){a=scheduler._lame_clone(a);a.id=b;a.rec_type&&scheduler._roll_back_dates(a);return scheduler.checkCollision(a)});
scheduler.checkCollision=function(b){var a=[],e=scheduler.config.collision_limit;if(b.rec_type)for(var f=scheduler.getRecDates(b),g=0;g<f.length;g++)for(var c=scheduler.getEvents(f[g].start_date,f[g].end_date),i=0;i<c.length;i++)(c[i].event_pid||c[i].id)!=b.id&&a.push(c[i]);else for(var a=scheduler.getEvents(b.start_date,b.end_date),d=0;d<a.length;d++)if(a[d].id==b.id){a.splice(d,1);break}var h=scheduler._props?scheduler._props[scheduler._mode]:null,n=scheduler.matrix?scheduler.matrix[scheduler._mode]:
null,l=h||n;if(h)var j=l.map_to;if(n)j=l.y_property;var k=!0;if(l){for(var o=0,d=0;d<a.length;d++)a[d][j]==b[j]&&a[d].id!=b.id&&o++;o>=e&&(k=!1)}else a.length>=e&&(k=!1);if(!k){var p=!scheduler.callEvent("onEventCollision",[b,a]);p||(b[j]=m||b[j]);return p}return k}})();
