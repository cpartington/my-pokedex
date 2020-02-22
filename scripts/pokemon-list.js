{
  var pokemon = pokemon_list

  console.log(pokemon)

  let table_html = "<table>"

  table_html += "<tr>"
  table_html += "<th></th>"
  table_html += "<th>Picture</th>"
  table_html += "<th>Name</th>"
  table_html += "<th>Caught</th>"
  table_html += "<th>More Info**</th>"
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
          pokemon_html += "<div class='pokemon-info-container'>"

          // Base stats
          pokemon_html += "<div class='pokemon-info-item'>"
          pokemon_html += "<p class='list-header-p'>Base Stats:</p>"
          pokemon_html += "<ul>"
          for (let stat of json.stats) {
            pokemon_html += `<li>${stat.stat.name}: ${stat.base_stat}</li>`
          }
          pokemon_html += "</ul>"
          pokemon_html += "</div>"
          
          // Type
          pokemon_html += "<div class='pokemon-info-item pokemon-type'>"
          pokemon_html += "<p>Type: "
          for (let type of json.types) {
            pokemon_html += `<img src="/images/types/${type.type.name}.gif"/> `
          }
          pokemon_html += "</p>"

          // Abilities
          pokemon_html += "<p class='list-header-p'>Abilities:</p>"
          pokemon_html += "<ul>"
          for (let ability of json.abilities) {
            pokemon_html += `<li>${ability.ability.name}`
            if (ability.is_hidden) pokemon_html += " <span class='note'>(hidden)</span>"
            pokemon_html += "</li>"
          }
          pokemon_html += "</ul>"
          pokemon_html += "</div>"

          // Shiny
          pokemon_html += "<div class='pokemon-info-item'>"
          if (json.sprites.front_female != null) first_form_header = "Male Form"
          else first_form_header = "Default Form"
          
          pokemon_html += `<p class="list-header-p">${first_form_header}:</p>`
          pokemon_html += `<img class="pokemon-sprite" src='${json.sprites.front_default}'/>`
          if (json.sprites.back_default != null)
            pokemon_html += `<img class="pokemon-sprite" src='${json.sprites.back_default}'/>`
          pokemon_html += `<img class="pokemon-sprite" src='${json.sprites.front_shiny}'/>`
          
          if (json.sprites.front_female != null) {
            pokemon_html += "<p class='list-header-p'>Female Form:</p>"
            pokemon_html += `<img class="pokemon-sprite" src='${json.sprites.front_female}'/>`
            pokemon_html += `<img class="pokemon-sprite" src='${json.sprites.back_female}'/>`
            pokemon_html += `<img class="pokemon-sprite" src='${json.sprites.front_shiny_female}'/>`
          }
          pokemon_html += "</div>"

          pokemon_html += "</div></td>"

          info_div.innerHTML = pokemon_html
          more_info.innerHTML = "-"
        })
    } else {
      info_div.innerHTML = ""
      more_info.innerHTML = "+"
    }
  })
}