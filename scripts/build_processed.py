"""
Transform raw downloads into processed datasets for the app.

In a real pipeline, this script would harmonize formats, join geometry files,
validate schemas, and export simplified GeoJSON/JSON into data/processed.
Here it loads any raw placeholder and prints hints to developers.
"""

from pathlib import Path
import json

RAW_DIR = Path(__file__).resolve().parents[1] / "data" / "raw"
PROCESSED_DIR = Path(__file__).resolve().parents[1] / "data" / "processed"


def main():
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
    raw_files = list(RAW_DIR.glob("*"))
    if not raw_files:
        print("No raw files found. Add datasets to data/raw or set SOURCE_URL.")
        return

    for raw_file in raw_files:
        print(f"Found raw file: {raw_file.name}")
        if raw_file.suffix in {'.json'}:
            content = json.loads(raw_file.read_text())
            sample = content[0] if isinstance(content, list) and content else content
            print(f"Sample record: {sample}")
        else:
            print("Processing for this format is not implemented in the stub.")

    print("Transformations are intentionally left minimal for the mock pipeline.")


if __name__ == "__main__":
    main()
