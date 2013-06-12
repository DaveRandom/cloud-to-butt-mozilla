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
                handleText(node);
                break;
        }
    }
    
    function preserveCapitalization(str, r)
    {
    	var split = str.split(' ');
    	var rsplit = r.split(' ');
    	
    	for(var i = 0; i < split.length; i++) {
    		rsplit[i] = split[i].toUpperCase() == split[i] ? rsplit[i].toUpperCase() :
    			split[i][0].toUpperCase() == split[i][0] ? rsplit[i][0].toUpperCase() + rsplit[i].slice(1) : rsplit[i];
    	}
    	
    	return rsplit.join(' ');
    }
    
    function handleText(textNode)
    {
        var v = textNode.nodeValue;
    
        v = v.replace(/\bthe cloud\b/gi, function(a) { return preserveCapitalization(a, "my butt"); });
        v = v.replace(/\bcloud\b/gi, function(a) { return preserveCapitalization(a, "butt") });
    
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
