import re

with open('twittrend_debug.html', 'r', encoding='utf-8') as f:
    html = f.read()

trends = []
now_section_match = re.search(r'<div class="col-lg-3 col-md-6" id="now">(.+?)<!-- 1時間前 -->', html, re.DOTALL)
if now_section_match:
    now_section_html = now_section_match.group(1)
    trends += re.findall(r'<a href="[^"]+" target="_blank">([^<]+)</a>', now_section_html)

with open('トレンドネタ.txt', 'w', encoding='utf-8') as f:
    for trend in trends:
        f.write(trend + '\n')