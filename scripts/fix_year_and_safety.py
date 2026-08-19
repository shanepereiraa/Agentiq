import os
import glob
import re

base_dir = '/Users/shanepereira/Projects/agentiq'
all_files = sorted(
    glob.glob(os.path.join(base_dir, '*.html')) +
    glob.glob(os.path.join(base_dir, 'blog', '*.html')) +
    glob.glob(os.path.join(base_dir, 'tools', '*.html'))
)

# 1. Update scripts/unify_footers.py to include id="year"
with open(os.path.join(base_dir, 'scripts', 'unify_footers.py'), 'r', encoding='utf-8') as f:
    u_content = f.read()

u_content = u_content.replace(
    '<p class="text-xs text-gray-500">\n          © 2026 AgentIQ. All rights reserved.\n        </p>',
    '<p class="text-xs text-gray-500">\n          © <span id="year">2026</span> AgentIQ. All rights reserved.\n        </p>'
)
u_content = u_content.replace(
    '© 2026 AgentIQ. All rights reserved.',
    '© <span id="year">2026</span> AgentIQ. All rights reserved.'
)
with open(os.path.join(base_dir, 'scripts', 'unify_footers.py'), 'w', encoding='utf-8') as f:
    f.write(u_content)

# 2. Update all HTML files safely
year_script_patterns = [
    r"document\.getElementById\(['\"]year['\"]\)\.textContent\s*=\s*new Date\(\)\.getFullYear\(\);?",
    r"var yr\s*=\s*document\.getElementById\(['\"]year['\"]\);\s*if\s*\(yr\)\s*yr\.textContent\s*=\s*new Date\(\)\.getFullYear\(\);?",
]

for file_path in all_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Ensure footer has span id="year"
    if '© 2026 AgentIQ. All rights reserved.' in content:
        content = content.replace('© 2026 AgentIQ. All rights reserved.', '© <span id="year">2026</span> AgentIQ. All rights reserved.')
    elif '© 2025 AgentIQ. All rights reserved.' in content:
        content = content.replace('© 2025 AgentIQ. All rights reserved.', '© <span id="year">2026</span> AgentIQ. All rights reserved.')

    # Make getElementById('year') call completely null-safe
    for pat in year_script_patterns:
        content = re.sub(pat, "var yrEl = document.getElementById('year'); if (yrEl) yrEl.textContent = new Date().getFullYear();", content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Null-safe year handler and footer span updated across all HTML files.")
