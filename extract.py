import zipfile
import glob
import xml.etree.ElementTree as ET

with open('extracted_schemas.txt', 'w', encoding='utf-8') as out_f:
    for doc in glob.glob('*.docx'):
        try:
            with zipfile.ZipFile(doc) as z:
                xml_content = z.read('word/document.xml')
                tree = ET.fromstring(xml_content)
                text = ''.join(tree.itertext())
                out_f.write(f'\n\n=== {doc} ===\n')
                out_f.write(text)
        except Exception as e:
            out_f.write(f'\n\n=== Error reading {doc}: {e} ===\n')
print("Extraction complete.")
