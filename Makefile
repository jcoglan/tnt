PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash

parsers := lib/parser/formula.js lib/parser/term.js

.PHONY: all clean test

all: $(parsers)

clean:
	rm -f $(parsers)

test: $(parsers)
	find spec -name '*_spec.js' | xargs jstest

lib/parser/%.js: lib/parser/%.peg
	canopy $< --lang js
