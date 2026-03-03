const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

async function extractText() {
    const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.docx'));
    for (const f of files) {
        try {
            const result = await mammoth.extractRawText({ path: path.join(__dirname, f) });
            fs.writeFileSync(path.join(__dirname, f.replace('.docx', '.txt')), result.value);
            console.log(`Extracted: ${f}`);
        } catch (e) {
            console.error(`Error with ${f}`, e);
        }
    }
}
extractText();
