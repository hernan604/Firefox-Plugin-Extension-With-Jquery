var linkTargetFinder = function () {
	var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
	return {
      init : function () {
        gBrowser.addEventListener("load", function () {
          var autoRun = prefManager.getBoolPref("extensions.linktargetfinder.autorun");
          if (autoRun) {
            linkTargetFinder.run();
          }
        }, false);
      },
        
      run : function () {

      /* jquery begin - */

      var doc = content.document;

      jQuery.noConflict();
      $ = function(selector,context) {
          return new jQuery.fn.init(selector,context||example.doc);
      };
      $.fn = $.prototype = jQuery.fn;

      example = new function(){};
      example.log = function() {
          Firebug.Console.logFormatted(arguments,null,"log");
      };

      //doc.location.href
      // Check if already loaded
      if (doc.getElementById("plugin-example")) return;

      // Setup
      this.win = content.window;
      this.doc = content.document;

      // Hello World
      this.main = main = $('<div id="plugin-example">', content.document).appendTo(doc.body).html('Example Loaded!');
      main.css({
          background:'#FFF',color:'#000',position:'absolute',top:0,left:0,padding:8,z-index:999999999999
      });
      main.html(main.html() + ' - jQuery <b>' + $.fn.jquery + '</b>');
      /*jquery end*/


			var head = content.document.getElementsByTagName("head")[0],
				style = content.document.getElementById("link-target-finder-style"),
				allLinks = content.document.getElementsByTagName("a"),
				foundLinks = 0;
			
			if (!style) {
				style = content.document.createElement("link");
				style.id = "link-target-finder-style";
				style.type = "text/css";
				style.rel = "stylesheet";
				style.href = "chrome://linktargetfinder/skin/skin.css";
				head.appendChild(style);
			}	
						
			for (var i=0, il=allLinks.length; i<il; i++) {
				elm = allLinks[i];
				if (elm.getAttribute("target")) {
					elm.className += ((elm.className.length > 0)? " " : "") + "link-target-finder-selected";
					foundLinks++;
				}
			}
			if (foundLinks === 0) {
				alert("No links found with a target attribute");
			}
			else {
				alert("Found " + foundLinks + " links with a target attribute");
			}	
		}
	};
}();
window.addEventListener("load", linkTargetFinder.init, false);
