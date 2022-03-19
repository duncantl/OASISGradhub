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


/*
   Called from a click on a course title in the Academic Record page.
   We get the term, course code and number and submit that to a form
   that we also injected into the page when we loaded it.
*/
function sisr(ev)
{

    var klass = ev.target.getAttribute('class');    
    var form = document.forms['sisrForm'];
    
    var tr = ev.target.parentNode;
    if(klass != 'column-crn')
	tr = tr.parentNode;

    var qtr = tr.children[2].children[0];
    console.log("quarter: " + qtr);
    form.elements['termCode'].value = qtr.innerHTML; 


    console.log("class of target: " + klass);
    if(klass == 'column-crn') {
	console.log("CRN: " + ev.target.innerHTML.trim());	
	form.elements['CRNumb'].value = ev.target.innerHTML.trim();
    } else {
    
	var ti = ev.target.title;
	var subj = ti.replace(/ .*/, ''); 
	var rx2 = /^[A-Z]+ ([0-9]+[A-Z]?) .*/;
	var num = rx2.exec(ti);
//    console.log("subj: " + subj + " num " + num[1]);	     
	form.elements['subjCode'].value = subj;
	form.elements['course'].value = num[1];
    }
    
//    console.log(form);
    form.submit();
}



if(document.URL.match("courses.aspx")) {  

//console.log("URL: "+document.URL);
    
   var sel = document.getElementById('ddColumns');
   
   for(var opt of sel.children) {
      opt.textContent = opt.textContent + " xxx";
      opt.selected = true;
   }

    //  add links to SISR for each course.
    // POST	https://sisr.ucdavis.edu/secure/reporting/reports/Report.cfm?reportName=StudentClassRoster
    //    SortOrder=&SortDirection=&termCode=202010&subjCode=ANT&course=210&section=&CRNumb=&RegistrationStatus=AllReg&RegistrationStatus=WL&format=screen


    /*
        Add a click event handler for each Course cell in the table.
    */
    var courses = document.getElementsByClassName("CourseName");
    console.log("got courses");
    for(var k of courses) {
	k.addEventListener("click", sisr);
	console.log("added link for " + k.innerHTML);
    }

    var crn = document.getElementsByClassName("column-crn");
    for(var k of crn) {
	k.addEventListener("click", sisr);	
    }    


    

/*
    Build a form that we will use when a person clicks on a course title in the Academic Record page.
    The form will POST to SISR  with the body containing the three variables termCode, subjCode and course.
    The SISR page will open in another window.
*/
    var div = document.createElement('div');
    var f = document.createElement('FORM');
    f.name = 'sisrForm';
    f.method = 'POST';
    f.action = "https://sisr.ucdavis.edu/secure/reporting/reports/Report.cfm?reportName=StudentClassRoster" ;
    f.target="_blank";


    for(var v of ['termCode', 'subjCode', 'course', 'CRNumb']) {
	var el = document.createElement('INPUT');
	el.type = "HIDDEN";
	el.name = v;
	el.value = "";
	f.appendChild(el);
    }
    
    
    div.appendChild(f);
    document.body.appendChild(div);
}


