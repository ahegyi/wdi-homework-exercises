favorites = ["Celtuce", "Lettuce", "Peas", "Fava Beans", "Spigariello", "Chicories", "Taro", "Tokyo Turnips"];

function listFavorites(ary) {
  favorites = ""
  for(var i = 0; i < ary.length; i += 1) {
    favorites += "My " + ordinalize(i+1) + " favorite vegetable family is " + ary[i] + ".\n";
  }
  return favorites;
}

console.log(listFavorites(favorites));