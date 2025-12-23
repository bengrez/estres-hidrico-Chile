"""
Placeholder script to fetch raw datasets.

Set the environment variable SOURCE_URL to point to a CSV/JSON endpoint. The
script will download the file into data/raw for later processing. This keeps the
workflow reproducible in CI without relying on manual downloads.
"""

import os
from pathlib import Path
import requests

RAW_DIR = Path(__file__).resolve().parents[1] / "data" / "raw"
RAW_DIR.mkdir(parents=True, exist_ok=True)


def fetch():
    url = os.getenv("SOURCE_URL")
    if not url:
        print("SOURCE_URL not set. Skipping download.")
        return

    dest = RAW_DIR / "source.json"
    resp = requests.get(url, timeout=30)
    resp.raise_for_status()
    dest.write_bytes(resp.content)
    print(f"Saved raw data to {dest}")


if __name__ == "__main__":
    fetch()
