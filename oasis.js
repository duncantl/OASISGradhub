/*
  could be ctl00_studentbar_studentId or have two ct100. I've seen
  both in the same day! Not sure why.  Otherwises, we can use an
  XPath expression.
*/

   var node = document.getElementById('ctl00_studentbar_studentId');
   if(!node)
      node = document.getElementById('ctl00_ctl00_studentbar_studentId');

   if(!node) 
      document.body.innerHTML = "Failed to get studentID node";

 // The SID may have additional information such as directory confidential, etc.
 // So we get the SID as the first text node.
 // Then we take the entire contents of node and put them into the body of a <a> node

   var tmp = node.childNodes[0];
   var sid = tmp.textContent;  // node.innerHTML;
   var a = document.createElement('a');
   a.innerHTML = node.innerHTML;  // textContent = sid;
   a.href = "https://gradhub.ucdavis.edu/student/" + sid;
   node.innerHTML = "";
   node.prepend(a); // appendChild(a);



// For the Academic Record page, select all the Columns by default.

if(document.URL.match("courses.aspx")) {  

   var sel = document.getElementById('ddColumns');
   
   for(var opt of sel.children) {
      opt.textContent = opt.textContent;
      opt.selected = true;
   }
}


