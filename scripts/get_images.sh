#!/bin/bash

files=(831.png wooloo.png 835.png yamper.png 037.png vulpix.png 077-g.png ponyta.png 857.png hattrem.png 872.png snom.png 423-e.png gastrodon.png 700.png sylveon.png 133.png eevee.png 710.png pumpkaboo.png 420.png cherubi.png 194.png wooper.png 177.png natu.png 517.png munna.png 043.png oddish.png 771.png pyukumuku.png 537.png seismitoad.png 534.png conkeldurr.png 861.png grimmsnarl.png 860.png morgrem.png 464.png rhyperior.png 772.png typenull.png 569.png garbodor.png 356.png dusclops.png 660.png diggersby.png 885.png dreepy.png 704.png goomy.png 246.png larvitar.png)

url=https://www.serebii.net/swordshield/pokemon/
inc=0

while [ $inc -lt ${#files[@]} ]; do
  wget -q $url${files[$inc]} -O ../images/${files[$inc+1]}
  let inc+=2
done
