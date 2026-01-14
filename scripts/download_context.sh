#!/usr/bin/env bash
set -euo pipefail
trap 'echo "ERROR line $LINENO: $BASH_COMMAND" >&2' ERR

OUT_DIR="${OUT_DIR:-$HOME/Desktop}"
OUT_NAME="${OUT_NAME:-$(basename "$(pwd)")_context.txt}"

EXCLUDE_DIRS="${EXCLUDE_DIRS:-.git node_modules .next dist build coverage .turbo .vercel}"
EXCLUDE_FILES="${EXCLUDE_FILES:-package-lock.json pnpm-lock.yaml yarn.lock bun.lockb .DS_Store}"
EXCLUDE_GLOBS="${EXCLUDE_GLOBS:-*.log *.zip *.gz *.tar *.7z *.png *.jpg *.jpeg *.gif *.webp *.ico *.pdf *.woff *.woff2 *.ttf *.otf *.mp3 *.mp4 *.mov *.avi *.mkv}"

out="$OUT_DIR/$OUT_NAME"

if [[ ! -d "$OUT_DIR" ]]; then
  echo "ERROR: OUT_DIR not found: $OUT_DIR"
  exit 1
fi

rm -f "$out"
: > "$out"

# Split space-separated strings into arrays
read -r -a EX_DIRS  <<< "$EXCLUDE_DIRS"
read -r -a EX_FILES <<< "$EXCLUDE_FILES"
read -r -a EX_GLOBS <<< "$EXCLUDE_GLOBS"

in_excluded_dir() {
  local rel="$1"
  for d in "${EX_DIRS[@]}"; do
    [[ "$rel" == "$d/"* ]] && return 0
  done
  return 1
}

is_excluded_file() {
  local rel="$1"
  local base="${rel##*/}"
  for f in "${EX_FILES[@]}"; do
    [[ "$base" == "$f" ]] && return 0
  done
  return 1
}

matches_excluded_glob() {
  local rel="$1"
  for g in "${EX_GLOBS[@]}"; do
    case "$rel" in
      $g) return 0 ;;
    esac
  done
  return 1
}

is_text_file() {
  local f="$1"
  [[ ! -s "$f" ]] && return 0
  LC_ALL=C grep -Iq . "$f"
}

mask_env() {
  awk '
    /^[[:space:]]*($|#)/ { print; next }
    {
      line=$0
      sub(/^[[:space:]]*export[[:space:]]+/, "", line)
      if (line ~ /^[A-Za-z_][A-Za-z0-9_]*=/) {
        pos=index(line,"=")
        key=substr(line,1,pos-1)
        val=substr(line,pos+1)
        q=substr(val,1,1)
        if (q=="\047" || q=="\"") print key "=" q "*****" q
        else print key "=*****"
      } else {
        print $0
      }
    }
  '
}

# Header
printf "### GENERAL USE INSTRUCTIONS FOR AI (ALWAYS FOLLOW THIS, DO NOT STRAY) ###\n" >> "$out"

# README
printf "\n" >> "$out"
if [[ -f "./README.md" ]]; then
  printf "===== README.md =====\n" >> "$out"
  LC_ALL=C sed 's/[^[:print:]\t]//g' "./README.md" >> "$out"
else
  printf "(README.md not found)\n" >> "$out"
fi

#
# NOTE: Avoid Bash 4+ `mapfile`/`readarray` for macOS compatibility (default Bash 3.2).

# Manifest
printf "\n### FILE MANIFEST (all files; exclusions applied) ###\n" >> "$out"
while IFS= read -r rel; do
  [[ -z "$rel" ]] && continue
  in_excluded_dir "$rel" && continue
  is_excluded_file "$rel" && continue

  route="${rel%%/*}"
  [[ "$route" == "$rel" ]] && route="(root)"
  printf "[route: %s] %s\n" "$route" "$rel" >> "$out"
done < <(find . -type f -print 2>/dev/null | sed 's|^\./||' | sort)

# Text content
printf "\n### TEXT CONTENT (exclusions applied; binaries skipped) ###\n" >> "$out"
while IFS= read -r rel; do
  [[ -z "$rel" ]] && continue
  [[ "$rel" == "README.md" ]] && continue
  in_excluded_dir "$rel" && continue
  is_excluded_file "$rel" && continue
  matches_excluded_glob "$rel" && continue

  f="./$rel"
  [[ -f "$f" ]] || continue
  is_text_file "$f" || continue

  route="${rel%%/*}"
  [[ "$route" == "$rel" ]] && route="(root)"
  base="${rel##*/}"

  printf "\n===== [route: %s] %s =====\n" "$route" "$rel" >> "$out"

  if [[ "$base" == .env* ]]; then
    mask_env < "$f" >> "$out"
  else
    LC_ALL=C sed 's/[^[:print:]\t]//g' "$f" >> "$out"
  fi
done < <(find . -type f -print 2>/dev/null | sed 's|^\./||' | sort)


echo "Wrote $out"
