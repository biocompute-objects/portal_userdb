# BCO Portal Client (AKA Portal)

This directory contains the Portal application. It utilizes Redux Toolkit (React JS) and a Fromik. Below are a few genral rules for how the code is structured and maintained.

- All deployment specific modifications should be made in the `.env` file. This is also where the keys for other applications are kept. This file should be created by copying the `.env.example` and filling in the fields. 
- For the most part each page has it's own directory within the [components](client/src/components/) directory.
