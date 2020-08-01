#!/bin/bash

ls -lAh $1 | awk '{if(NR>1)print $9 " " $5}'
