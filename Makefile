run:
	docpad run
deploy:
	docpad deploy-ghpages --env static
clean:
	rm -rf out/* node_modules
conf:
	npm install