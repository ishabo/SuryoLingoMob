#!/bin/bash

listOfPossibleSecondParam=(dev prod)

for secondParam in "${listOfPossibleSecondParam[@]}"; do
    [[ $1 -eq "$secondParam" ]] && {
        echo "Copying .env.$1 to .env"
        cp ./.env.$1 ./.env
    }
done

exit 0
