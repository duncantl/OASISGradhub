/*
  could be ctl00_studentbar_studentId or have two ct100. I've seen
  both in the same day! Not sure why.  Otherwises, we can use an
  XPath expression.
*/

if(document.URL.match("courses.aspx")) {  

   var sel = document.getElementById('ddColumns');
   
   for(var opt of sel.childNodes) {
  //    console.log("opt: " + opt.value);
      opt.textContent = opt.textContent + " DTL";
      opt.selected = true;
   }
} else {
   var node = document.getElementById('ctl00_studentbar_studentId');
   if(!node)
      node = document.getElementById('ctl00_ctl00_studentbar_studentId');

   if(!node) 
      document.body.innerHTML = "Failed to get studentID node";


   var tmp = node.childNodes[0];
   var sid = tmp.textContent;  // node.innerHTML;
//   tmp.remove();   
   var a = document.createElement('a');
//   a.textContent = sid;
   a.innerHTML = node.innerHTML;  // textContent = sid;
   a.href = "https://gradhub.ucdavis.edu/student/" + sid;
   node.innerHTML = "";
   node.prepend(a); // appendChild(a);
} 



