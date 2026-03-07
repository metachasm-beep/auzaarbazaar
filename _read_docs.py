import mammoth
import os

files = [
    "Auzaarbazaar V1 Launch Plan.docx",
    "AUZABAARBAZAAR UI KIT.docx",
    "Auzaarbazaar — Full UX Architecture.docx",
    "Auzaarbazaar business model.docx",
]

for f in files:
    path = os.path.join(".", f)
    if os.path.exists(path):
        try:
            with open(path, "rb") as docx_file:
                result = mammoth.extract_raw_text(docx_file)
                print(f"=== {f} ===")
                text = result.value.encode('ascii', errors='replace').decode('ascii')
                print(text[:4000])
                print()
        except Exception as e:
            print(f"Error reading {f}: {e}")
    else:
        print(f"Not found: {f}")
