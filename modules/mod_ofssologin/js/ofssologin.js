function of_search(){
  var of_search_type = document.getElementById("of_search_type").value;
  var of_search_word = document.getElementById("query").value;
  switch(of_search_type)
  {
    case "Content":
      location.href = "/index.php?option=com_search&Itemid=58&searchword="+of_search_word;
      break;
    case "People":
      location.href = "/index.php?option=com_comprofiler&task=usersList&Itemid=6&limitstart=0&search=&cb_keyword="+of_search_word;
      break;
    default:
      location.href = "/of/openfoundry/search?commit=search&query="+of_search_word;
      break;
  }
}
