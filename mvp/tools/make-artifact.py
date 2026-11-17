"""Build mvp/artifact.html from mvp/index.html for publishing as a claude.ai Artifact.

The Artifact host wraps the page in its own <!doctype>/<html>/<head>/<body>, so this
strips those wrappers and keeps the head contents (title, fonts, stylesheets) at the top.
Run from anywhere:  python3 -I mvp/tools/make-artifact.py
"""
import re
from pathlib import Path

root = Path(__file__).resolve().parent.parent
src = (root / "index.html").read_text()

head = re.search(r"<head>(.*?)</head>", src, re.S).group(1)
body = re.search(r"<body>(.*?)</body>", src, re.S).group(1)

# The host supplies charset + viewport; drop ours and add the side-gutter promise.
head = re.sub(r'\s*<meta charset="utf-8">', "", head)
head = re.sub(r'\s*<meta name="viewport"[^>]*>', "", head)
title = re.search(r"<title>.*?</title>", head).group(0)
head = head.replace(title, "")
top = f'{title}\n<meta name="claude:viewport-fit-sides" content="cover">'

out = f"{top}\n{head.strip()}\n\n{body.strip()}\n"
(root / "artifact.html").write_text(out)
print(f"wrote {root / 'artifact.html'}")
