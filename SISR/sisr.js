/*
   Called from a click on an SID in the SISR roster
*/
function oasis(ev)
{
    // The regular front page of OASIS for the student
    // with notes from advisor meetings, etc.
    // var u = "https://oasis.ucdavis.edu/student/?studentId=";

    // The academic record tab.
    var u = "https://oasis.ucdavis.edu/student/courses.aspx?studentId="
    window.open( u + ev.target.innerHTML, "_blank");
}

    
var sel = document.evaluate("//td[position() = 2 and string-length(.) = 9]",  document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE);
   
    /*
        Add a click event handler for each Course cell in the table.
    */
console.log("got SIDs ");
var k;
while( (k = sel.iterateNext())) {
	k.addEventListener("click", oasis);
	console.log("added link for " + k.innerHTML);
    }

    




