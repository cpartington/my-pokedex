{
  var pokemon = pokemon_list

  console.log(pokemon)

  let table_html = "<table>"

  table_html += "<tr>"
  table_html += "<th>No.</th>"
  table_html += "<th>Picture</th>"
  table_html += "<th>Name</th>"
  table_html += "<th>Caught</th>"
  table_html += "<th>More Info</th>"
  table_html += "</tr>"

  for (let item of pokemon) {
    table_html += "<tr>"
    table_html += `<td>#${item.ss_id.toString().padStart(3, '0')}</td>`
    table_html += `<td><img class="pokemon-img" src="/images/${item.name.toLowerCase()}.png"/></td>`
    table_html += `<td>${item.name}</td>`
    table_html += `<td>${item.caught}</td>`
    if (!item.galarian) {
      table_html += `<td class="more-info-button" id="${item.name.toLowerCase()}">+</td>`
      table_html += "</tr>"
      table_html += `<tr id="${item.name.toLowerCase()}-info"></tr>`
    } else {
      table_html += "<td></td>"
      table_html += "</tr>"
    }
  }

  table_html += "</table>"
  document.getElementById("pokemon-table").innerHTML = table_html

  for (let item of pokemon) {
    if (!item.galarian) {
      addMoreInfoListener(item)
    }
  }
}

function addMoreInfoListener(item) {
  const pname = item.name
  more_info = document.getElementById(pname.toLowerCase())
  more_info.addEventListener("click", function(event) {
    event.preventDefault();

    let info_div = document.getElementById(pname.toLowerCase() + "-info")
    if (info_div.innerHTML === "") {
      const url = "https://pokeapi.co/api/v2/pokemon/" + item.id;
      fetch(url)
        .then(function(response) {
          return response.json();
        }).then(function(json) {
          let pokemon_html = "<td></td><td colspan='4'>"
          pokemon_html += "<div class='info-container'>"
          
          // Get type
          pokemon_html += "<p>Type: "
          for (let type of json.types) {
            pokemon_html += `<img class="pokemon-type" src="/images/types/${type.type.name}.gif"/> `
          }
          pokemon_html += "</p>"

          pokemon_html += "</div></td>"

          info_div.innerHTML = pokemon_html
          more_info.innerHTML = "-"
          console.log('more_info innerHTML: ' + more_info.innerHTML)
        })
    } else {
      info_div.innerHTML = ""
      more_info.innerHTML = "+"
    }
  })
}