from pathlib import Path

import markdown
from flask import Flask, Response, render_template

PROJECT_ROOT = Path(__file__).resolve().parent.parent
CONTENT_DIR = PROJECT_ROOT / "content"

app = Flask(__name__)


def _render_methodology() -> str:
    source = (CONTENT_DIR / "methodology.md").read_text(encoding="utf-8")
    md = markdown.Markdown(
        extensions=["extra", "toc", "sane_lists"],
        extension_configs={"toc": {"permalink": False}},
    )
    return md.convert(source)


@app.get("/")
def index():
    return render_template("index.html")


@app.get("/methodology")
def methodology():
    body_html = _render_methodology()
    return render_template("methodology.html", body_html=body_html)


@app.get("/embed")
def embed():
    resp = Response(render_template("embed.html"))
    resp.headers["Content-Security-Policy"] = "frame-ancestors *"
    return resp


@app.get("/robots.txt")
def robots():
    body = (
        "User-agent: *\n"
        "Allow: /\n\n"
        "User-agent: GPTBot\nAllow: /\n\n"
        "User-agent: ChatGPT-User\nAllow: /\n\n"
        "User-agent: PerplexityBot\nAllow: /\n\n"
        "User-agent: ClaudeBot\nAllow: /\n\n"
        "User-agent: anthropic-ai\nAllow: /\n\n"
        "User-agent: Google-Extended\nAllow: /\n"
    )
    return Response(body, mimetype="text/plain")


if __name__ == "__main__":
    app.run(debug=True)
