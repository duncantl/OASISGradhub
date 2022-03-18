/*
  could be ctl00_studentbar_studentId or have two ct100. I've seen
  both in the same day! Not sure why.  Otherwises, we can use an
  XPath expression.
*/

   var node = document.getElementById('ctl00_studentbar_studentId');
   if(!node)
      node = document.getElementById('ctl00_ctl00_studentbar_studentId');

//   if(!node) 
//      document.body.innerHTML = "Failed to get studentID node";

 // The SID may have additional information such as directory confidential, etc.
 // So we get the SID as the first text node.
 // Then we take the entire contents of node and put them into the body of a <a> node

   var tmp = node.childNodes[0];
   var sid = tmp.textContent;  // node.innerHTML;
   var a = document.createElement('a');
   a.innerHTML = node.innerHTML;  // textContent = sid;
   a.href = "https://gradhub.ucdavis.edu/student/" + sid ;
   node.innerHTML = "";
   node.prepend(a); // appendChild(a);



// For the Academic Record page, select all the Columns by default.


/*
function sisr()
{
    alert("Hi from sisr");
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.send(someStuff);
}
*/

function sisr(ev)
{
    var form = document.forms['myform'];
    
    var tr = ev.target.parentNode.parentNode;

    var qtr = tr.children[2].children[0];
    console.log(qtr);
    form.elements['termCode'].value = qtr.innerHTML; 

    var ti = ev.target.title;
    var subj = ti.replace(/ .*/, ''); 
    var rx2 = /^[A-Z]+ ([0-9]+[A-Z]?) .*/;
    var num = rx2.exec(ti);
    console.log("subj: " + subj + " num " + num[1]);	     
    form.elements['subjCode'].value = subj;
    form.elements['course'].value = num[1];

    console.log(form);
    form.submit();
}



if(document.URL.match("courses.aspx")) {  

console.log("URL: "+document.URL);
    
   var sel = document.getElementById('ddColumns');
   
   for(var opt of sel.children) {
      opt.textContent = opt.textContent + " xxx";
      opt.selected = true;
   }

    //  add links to SISR for each course.
    // POST	https://sisr.ucdavis.edu/secure/reporting/reports/Report.cfm?reportName=StudentClassRoster
    //    SortOrder=&SortDirection=&termCode=202010&subjCode=ANT&course=210&section=&CRNumb=&RegistrationStatus=AllReg&RegistrationStatus=WL&format=screen

    var courses = document.getElementsByClassName("CourseName");
    console.log("got courses");
    for(var k of courses) {
	k.addEventListener("click", sisr);
	console.log("added link for " + k.innerHTML);
    }


/*
var formString = '<form name="myform" method="post" action="https://sisr.ucdavis.edu/secure/reporting/reports/Report.cfm?reportName=StudentClassRoster"  target="_blank">
<input type="hidden" name="termCode" value="">
<input type="hidden" name="subjCode" value="">
<input type="hidden" name="course" value="">
</form>';
*/
    var div = document.createElement('div');
    var f = document.createElement('FORM');
    f.name = 'myform';
    f.method = 'POST';
    f.action = "https://sisr.ucdavis.edu/secure/reporting/reports/Report.cfm?reportName=StudentClassRoster" ;
    f.target="_blank";


    for(var v of ['termCode', 'subjCode', 'course']) {
	var el = document.createElement('INPUT');
	el.type = "HIDDEN";
	el.name = v;
	el.value = "";
	f.appendChild(el);
    }
    
    
    div.appendChild(f);
    document.body.appendChild(div);

}


