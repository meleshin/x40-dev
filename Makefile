GH_PAGES=../x40-gh-pages

deploy:
	rm -rf out/*
	docpad generate --env static
	rsync -ru --delete --force --exclude=.git out/ "${GH_PAGES}"
	cd "${GH_PAGES}"; git add .; git commit -a -m "deploy"; git push
clean:
	rm -rf out/* node_modules
conf:
	npm install