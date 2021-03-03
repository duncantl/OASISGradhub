// could be ctl00_studentbar_studentId or have two ct100. I've seen
// both in the same day! Not sure why.  Otherwises, we can use an
// XPath expression.

var node = document.getElementById('ctl00_ctl00_studentbar_studentId');
var sid = node.innerHTML;
var a = document.createElement('a');
a.textContent = sid;
node.innerHTML = "";
a.href = "https://gradhub.ucdavis.edu/student/" + sid;
node.appendChild(a);

