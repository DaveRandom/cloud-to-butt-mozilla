(function() {

function walk(node) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
            if(node.parentElement.tagName.toLowerCase() != "script") {
                handleText(node);
            }
			break;
	}
}
    
function handleText(textNode) {
	var v = textNode.nodeValue;

  // Deal with the easy case
  v = v.replace(/\b(T|t)he (C|c)loud/g, function(match, p1, p2, offset, string) {
    // t - 7 = m
    // c - 1 = b
    var m = String.fromCharCode(p1.charCodeAt(0) - 7);
    var b = String.fromCharCode(p2.charCodeAt(0) - 1);
    return m + "y " + b + "utt";
  });

  // Deal with private clouds
  v = v.replace(/\b(P|p)rivate (C|c)loud/g, function(match, p1, p2, offset, string) {
    // c - 1 = b
    var b = String.fromCharCode(p2.charCodeAt(0) - 1);
    return b + "utt";
  });
  // Get the corner cases
  if(v.match(/cloud/i)) {
    // If we're not talking about weather
    if(v.match(/PaaS|SaaS|IaaS|computing|data|storage|cluster|distributed|server|hosting|provider|grid|enterprise|provision|apps|hardware|software|/i)) {
      v = v.replace(/(C|c)loud/gi, function(match, p1, offset, string) {
        // c - 1 = b
        var b = String.fromCharCode(p1.charCodeAt(0) - 1);
        return b + "utt";
      });
    }
  }
	textNode.nodeValue = v;
}

    function windowLoadHandler()
    {
        // Dear Mozilla: I hate you for making me do this.
        window.removeEventListener('load', windowLoadHandler);

        document.getElementById('appcontent').addEventListener('DOMContentLoaded', function(e) {
            walk(e.originalTarget.body);
        });
    }

    window.addEventListener('load', windowLoadHandler);
}());
