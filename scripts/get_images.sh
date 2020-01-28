#!/bin/bash

files=(831.png wooloo.png 835.png yamper.png 037.png vulpix.png)
url=https://www.serebii.net/swordshield/pokemon/
inc=0

while [ $inc -lt 6 ]; do
  wget $url${files[$inc]} -O ../images/${files[$inc+1]}
  let inc+=2
done
