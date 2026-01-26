import os

directory = r'c:\Users\kiran\OneDrive\Desktop\algo\Algonex_Website\Algonex_Website\algonex-frontend\src\components\ExploreCourses'
target_text = """              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all duration-300">
                View Curriculum
              </button>"""

files_modified = []

for filename in os.listdir(directory):
    if filename.endswith('.jsx'):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if target_text in content:
            new_content = content.replace(target_text, '')
            # Clean up potential extra empty lines or spaces if needed, but let's be careful
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            files_modified.append(filename)

print(f"Modified {len(files_modified)} files: {', '.join(files_modified)}")
