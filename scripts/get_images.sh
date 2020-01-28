#!/bin/bash

files=(831.png wooloo.png 835.png yamper.png 037.png vulpix.png 077.png ponyta.png 242.png hattrem.png 349.png snom.png 231.png gastrodon.png 204.png sylveon.png 196.png eevee.png 191.png pumpkaboo.png 128.png cherubi.png 100.png wooper.png 092.png natu.png 090.png munna.png 055.png oddish.png)

url=https://www.serebii.net/swordshield/pokemon/
inc=0

while [ $inc -lt ${#files[@]} ]; do
  wget $url${files[$inc]} -O ${files[$inc+1]} -P ../images
  let inc+=2
done
