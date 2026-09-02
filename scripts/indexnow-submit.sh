#!/usr/bin/env bash
# Submit all sitemap URLs to IndexNow (Bing, Yandex, Seznam, Naver; Google is evaluating).
# Run AFTER the key file is live at https://agentiq.co.in/8ec279526a863e5a69e9e3ee33c7100d.txt
set -euo pipefail
KEY="8ec279526a863e5a69e9e3ee33c7100d"
HOST="agentiq.co.in"
KEYLOC="https://${HOST}/${KEY}.txt"
URLS=$(grep -oE '<loc>[^<]+</loc>' "$(dirname "$0")/../sitemap.xml" | sed 's|</\?loc>||g' | python3 -c 'import sys,json; print(json.dumps([l.strip() for l in sys.stdin if l.strip()]))')
BODY=$(python3 -c "import json,sys; print(json.dumps({'host':'${HOST}','key':'${KEY}','keyLocation':'${KEYLOC}','urlList':json.loads(sys.argv[1])}))" "$URLS")
echo "Submitting $(echo "$URLS" | python3 -c 'import sys,json;print(len(json.load(sys.stdin)))') URLs to IndexNow..."
curl -sS -X POST 'https://api.indexnow.org/indexnow' -H 'Content-Type: application/json; charset=utf-8' -d "$BODY" -w '\nHTTP %{http_code}\n'
