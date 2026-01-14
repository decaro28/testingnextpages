# next_template Makefile (minimal + robust)

m ?= tweak

OUT_DIR  ?= $(HOME)/Desktop
OUT_NAME ?= $(notdir $(CURDIR))_context.txt

# Easy-to-extend exclusions (space-separated)
EXCLUDE_DIRS  ?= .git node_modules .next dist build coverage .turbo .vercel
EXCLUDE_FILES ?= package-lock.json pnpm-lock.yaml yarn.lock bun.lockb .DS_Store
EXCLUDE_GLOBS ?= *.log *.zip *.gz *.tar *.7z *.png *.jpg *.jpeg *.gif *.webp *.ico *.pdf *.woff *.woff2 *.ttf *.otf *.mp3 *.mp4 *.mov *.avi *.mkv

.PHONY: git download

git:
	@git add -A
	@git commit -m "$(m)" || true
	@git push

download:
	@OUT_DIR="$(OUT_DIR)" OUT_NAME="$(OUT_NAME)" \
	EXCLUDE_DIRS="$(EXCLUDE_DIRS)" EXCLUDE_FILES="$(EXCLUDE_FILES)" EXCLUDE_GLOBS="$(EXCLUDE_GLOBS)" \
	bash scripts/download_context.sh
