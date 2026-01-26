import os
import re

directory = r'c:\Users\kiran\OneDrive\Desktop\algo\Algonex_Website\Algonex_Website\algonex-frontend\src\components\ExploreCourses'

new_stats_block = """      {/* Stats Cards */}
      <div className="absolute top-[65vh] left-1/2 transform -translate-x-1/2 z-10">
        <div className="relative">
          <div className="flex justify-center gap-0 px-4 relative z-10">
            <div className="bg-white px-6 py-6 text-center w-[200px] flex flex-col items-center shadow-lg border-r border-gray-200">
              <PeopleGroupIcon className="w-12 h-12 text-black mb-3" />
              <span className="text-xs text-gray-600 font-medium leading-tight">
                Certificate<br />of completion
              </span>
            </div>
            <div className="bg-white px-6 py-6 text-center w-[200px] flex flex-col items-center shadow-lg border-r border-gray-200">
              <PeopleGroupIcon className="w-12 h-12 text-black mb-3" />
              <span className="text-xs text-gray-600 font-medium leading-tight">
                140<br />downloadable resources
              </span>
            </div>
            <div className="bg-white px-6 py-6 text-center w-[200px] flex flex-col items-center shadow-lg border-r border-gray-200">
              <PeopleGroupIcon className="w-12 h-12 text-black mb-3" />
              <span className="text-xs text-gray-600 font-medium leading-tight">
                107<br />coding exercises
              </span>
            </div>
            <div className="bg-white px-6 py-6 text-center w-[200px] flex flex-col items-center shadow-lg">
              <PeopleGroupIcon className="w-12 h-12 text-black mb-3" />
              <span className="text-xs text-gray-600 font-medium leading-tight">
                20+ Projects<br />
                <span className="text-[10px]">Resume & Interview ready</span>
              </span>
            </div>
          </div>
        </div>
      </div>"""

# More flexible regex
# Matches from the start of the comment "Stat... Cards" to the end of the nested dives.
# We stop at the end of the div that follows the triple closing div pattern used in these components.
pattern = re.compile(r'\{\s*/\*\s*Stat(?:istic)?s Cards.*?\*/\s*\}\s*<div className="absolute top-\[.*?\] left-1/2 transform -translate-x-1/2 z-10">.*?</div>\s*</div>\s*</div>', re.DOTALL)

files_updated = 0

for filename in os.listdir(directory):
    if filename.endswith('.jsx'):
        path = os.path.join(directory, filename)
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        content_new = pattern.sub(new_stats_block, content)
            
        if content != content_new:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content_new)
            print(f"Updated {filename}")
            files_updated += 1
        else:
            # Try a second fallback if the first one fails
            # Search for the div specifically if comment is missing or different
            content_new = re.sub(r'(\s*)<div className="absolute top-\[.*?\] left-1/2 transform -translate-x-1/2 z-10">.*?</div>(\s*)</div>(\s*)</div>', r'\1' + new_stats_block, content, count=1, flags=re.DOTALL)
            if content != content_new:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content_new)
                print(f"Updated {filename} (via fallback)")
                files_updated += 1
            else:
                print(f"Could not update {filename}")

print(f"Total files updated: {files_updated}")
