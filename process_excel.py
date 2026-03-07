import pandas as pd
import json
import os

excel_path = 'Share pentagon_machines_products.xlsx'
json_path = 'src/data/inventory.json'

if not os.path.exists(excel_path):
    print(f"File not found: {excel_path}")
    exit(1)

df = pd.read_excel(excel_path)

try:
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
except FileNotFoundError:
    data = {"inventory": []}

inventory = data.get("inventory", [])
# Map by lower-case name for enrichment
inventory_map = {item['name'].lower(): item for item in inventory}

existing_ids = set()
for item in inventory:
    try:
        id_str = str(item['id']).replace('p-', '').replace('p_', '')
        if id_str.isdigit():
            existing_ids.add(int(id_str))
    except (ValueError, KeyError):
        pass

next_id = max(existing_ids) + 1 if existing_ids else len(inventory) + 1

added_count = 0
updated_count = 0

for _, row in df.iterrows():
    name = str(row.get('Name', 'Unknown')).strip()
    if name == 'nan' or name == 'Unknown' or name == '':
        continue
    
    category = str(row.get('Category', 'Industrial Machinery')).strip()
    if category == 'nan': category = 'Industrial Machinery'
    
    model = str(row.get('Model', 'N/A')).strip()
    if model == 'nan': model = 'N/A'

    price = 0
    price_val = row.get('Price (Rs)', 0)
    try:
        if pd.notna(price_val):
            clean_price = str(price_val).replace('Rs', '').replace('₹', '').replace(',', '').strip()
            if clean_price and clean_price.lower() != 'nan':
                price = int(float(clean_price))
    except ValueError:
        pass

    name_lower = name.lower()
    if name_lower in inventory_map:
        # Enrich existing
        item = inventory_map[name_lower]
        if price > 0:
            item['price'] = price
        if category != 'Industrial Machinery':
            item['category'] = category
        if model != 'N/A':
            item['model'] = model
        updated_count += 1
    else:
        # Add new
        new_product = {
            "id": f"p_{next_id}",
            "name": name,
            "category": category,
            "brand": 'Generic',
            "model": model,
            "price": price,
            "condition": 'New',
            "description": f"High quality {name} ready for immediate industrial deployment. Complete manual included.",
            "gst": "18%",
            "specs": {
                "Dimensions": "Standard"
            },
            "image": "/assets/products/placeholder.jpg"
        }
        inventory.append(new_product)
        inventory_map[name_lower] = new_product
        next_id += 1
        added_count += 1

data["inventory"] = inventory

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4)

print(f"Enrichment complete: Added {added_count}, Updated {updated_count}. Total is now {len(inventory)}.")
