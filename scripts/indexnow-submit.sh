#!/usr/bin/env bash
# Submit all sitemap URLs to IndexNow (Bing, Yandex, Seznam, Naver; Google is evaluating).
# Run AFTER the key file is live at https://agentiq.co.in/8ec279526a863e5a69e9e3ee33c7100d.txt
set -euo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
python3 -c '
import urllib.request, json, os, xml.etree.ElementTree as ET

sitemap_path = os.path.join("'"$DIR"'", "../sitemap.xml")
tree = ET.parse(sitemap_path)
root = tree.getroot()
urls = [elem.text.strip() for elem in root.findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}loc") if elem.text]

payload = {
    "host": "agentiq.co.in",
    "key": "8ec279526a863e5a69e9e3ee33c7100d",
    "keyLocation": "https://agentiq.co.in/8ec279526a863e5a69e9e3ee33c7100d.txt",
    "urlList": urls
}

print(f"Submitting {len(urls)} URLs to IndexNow...")
req = urllib.request.Request(
    "https://api.indexnow.org/indexnow",
    data=json.dumps(payload).encode("utf-8"),
    headers={"Content-Type": "application/json; charset=utf-8"}
)

try:
    with urllib.request.urlopen(req) as resp:
        print(f"IndexNow Response: HTTP {resp.status} (Accepted)")
except urllib.error.HTTPError as e:
    print(f"IndexNow HTTP Error {e.code}: {e.read().decode('utf-8')}")
'
