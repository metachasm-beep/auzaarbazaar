import pandas as pd
import json
import re

def clean(text):
    if not isinstance(text, str) and not isinstance(text, float):
        text = str(text)
    if not isinstance(text, str) or str(text).strip() in ('nan', 'NaN', ''):
        return ''
    text = re.sub(r'PENTAGON\s*', '', text, flags=re.IGNORECASE)
    return re.sub(r'\s+', ' ', text).strip()

def words(text):
    return set(re.findall(r'\b[a-z0-9]{2,}\b', text.lower()))

# Load FORFEATURES (ignore cols U,V,W = indices 20,21,22)
df = pd.read_excel('FORFEATURES.xlsx')
df = df.iloc[:, :20]   # keep only first 20 columns (A-T)
df.columns = ['Name','Category','Brand','Model','Price','GST','MOQ','Parts',
              'Service','Features','GrossWeight','ProductType','MaxTorque',
              'RPM','Dimensions','Voltage','StdAccessories','OptAccessories',
              'AllSpecs','Description']
df['CleanName'] = df['Name'].apply(clean)
df['Words']     = df['CleanName'].apply(words)

# Load current inventory
with open('src/data/inventory.json', encoding='utf-8') as f:
    data = json.load(f)
inventory = data['inventory']

def build_specs(row):
    specs = {}
    if clean(row.get('Model','')): specs['Model']          = clean(row['Model'])
    if clean(row.get('AllSpecs','')): 
        for part in str(row['AllSpecs']).split('|'):
            kv = part.strip()
            if ':' in kv:
                k, v = kv.split(':', 1)
                k = k.strip()[:40]
                v = clean(v.strip())[:120]
                if k and v:
                    specs[k] = v
    # Fallbacks from individual columns
    if clean(row.get('Dimensions','')): specs['Dimensions'] = clean(row['Dimensions'])
    if clean(row.get('RPM','')): specs['RPM']               = clean(row['RPM'])
    if clean(row.get('Voltage','')): specs['Voltage']       = clean(row['Voltage'])
    if clean(row.get('MaxTorque','')): specs['Max Torque']  = clean(row['MaxTorque'])
    if clean(row.get('GrossWeight','')): specs['Gross Weight'] = clean(row['GrossWeight'])
    if clean(row.get('StdAccessories','')): specs['Std Accessories'] = clean(row['StdAccessories'])[:200]
    specs['Status']   = 'Available'
    specs['Delivery'] = '24-48 Hours'
    specs['Support']  = 'Complete Post-Sale Support'
    return specs

matched = 0
for product in inventory:
    p_words = words(product['name'])
    best_idx, best_score = -1, 0.0
    for idx, row in df.iterrows():
        ex_words = row['Words']
        if not ex_words or not p_words:
            continue
        inter = len(p_words & ex_words)
        union = len(p_words | ex_words)
        score = inter / union if union else 0.0
        if score > best_score:
            best_score = score
            best_idx   = idx
    
    if best_idx != -1 and best_score >= 0.30:
        row = df.iloc[best_idx]
        matched += 1
        # Update name from Excel
        new_name = clean(row['CleanName'])
        if new_name:
            product['name'] = new_name
        # Update price if missing or 0
        if product['price'] == 0 and pd.notna(row['Price']):
            try: product['price'] = int(row['Price'])
            except: pass
        # Update category
        cat = clean(row.get('Category',''))
        if cat: product['category'] = cat
        # Update brand
        brand = clean(row.get('Brand',''))
        if brand: product['brand'] = brand
        # Update GST
        gst = row.get('GST','')
        if pd.notna(gst): product['gst'] = f"{int(gst)}%"
        # Update MOQ
        moq = clean(row.get('MOQ',''))
        if moq: product['moq'] = moq
        # Build rich specs
        product['specs'] = build_specs(row.to_dict())
        # Add description
        desc = clean(row.get('Description',''))
        if desc: product['description'] = desc[:500]
        # Add features
        feats = clean(row.get('Features',''))
        if feats: product['features'] = feats[:400]

with open('src/data/inventory.json', 'w', encoding='utf-8') as f:
    json.dump({'inventory': inventory}, f, indent=2, ensure_ascii=False)

print(f"Total: {len(inventory)} | Matched & enriched: {matched}")
