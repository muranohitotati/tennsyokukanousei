import re
import html

try:
    with open("C:\\GeminiCli\\TEST\\twittrend_debug.html", "r", encoding="utf-8") as f:
        html_content = f.read()

    matches = re.findall(r'<p class="trend">.*?<a.*?>(.*?)</a>', html_content)
    
    trends = [html.unescape(match) for match in matches]
    
    unique_trends = []
    for trend in trends:
        if trend not in unique_trends:
            unique_trends.append(trend)
    
    with open("C:\\GeminiCli\\TEST\\トレンドネタ.txt", "w", encoding="utf-8") as f:
        f.write("\n".join(unique_trends))
    
    print(f"Successfully extracted {len(unique_trends)} trends.")

except Exception as e:
    print(f"An error occurred: {e}")
