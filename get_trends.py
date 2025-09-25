import urllib.request
import ssl

# SSL証明書の検証を無効にする（環境によっては必要）
ssl._create_default_https_context = ssl._create_unverified_context

url = "https://twittrend.jp/"
try:
    with urllib.request.urlopen(url) as response:
        html = response.read().decode("utf-8")
        print("Successfully fetched the content of twittrend.jp.")
        with open("twittrend_debug.html", "w", encoding="utf-8") as f:
            f.write(html)
except Exception as e:
    print(f"An error occurred: {e}")
