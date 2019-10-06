#!/bin/bash

NODE_MODULES=node_modules
RN_PATCHES=rn-patches

echo "===========> Patching RN packages"

for i in ${RN_PATCHES}/* ; do
  if [ -d "$i" ]; then
    BASENAME=$(basename $i)
    echo -e "Copying ${RN_PATCHES}/${BASENAME} to ${NODE_MODULES}/${BASENAME}"
  fi
done

cp -r ${RN_PATCHES}/* ${NODE_MODULES}/
echo "===========> Finished Patching RN Packages"
