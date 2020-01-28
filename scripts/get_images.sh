#!/bin/bash

files=(831.png wooloo.png 835.png yamper.png 037.png vulpix.png 077-g.png ponyta.png 857.png hattrem.png 872.png snom.png 423-e.png gastrodon.png 700.png sylveon.png 133.png eevee.png 710.png pumpkaboo.png 420.png cherubi.png 194.png wooper.png 177.png natu.png 517.png munna.png 043.png oddish.png)

url=https://www.serebii.net/swordshield/pokemon/
inc=0

while [ $inc -lt ${#files[@]} ]; do
  wget -q $url${files[$inc]} -O ${files[$inc+1]} -P ../images
  let inc+=2
done
