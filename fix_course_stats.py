
import os

courses_dir = r"c:\Users\kiran\OneDrive\Desktop\algo\Algonex_Website\Algonex_Website\algonex-frontend\src\components\ExploreCourses"

stats_block = """
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
      </div>
"""

for filename in os.listdir(courses_dir):
    if filename.endswith(".jsx"):
        filepath = os.path.join(courses_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Simple logic: Replace the entire stats block if found, otherwise insert it.
        # But wait, identifying the block to replace is tricky without regex if it varies.
        # Let's target the exact structure if possible, or use a sentinel like "Stats Cards" comment.
        
        # We need to standardize this.
        # First, let's see if we can identify the insertion point.
        # It seems to be after the Hero section close div and before the Tab Navigation starts.
        
        # Strategy:
        # 1. Identify the Hero section closing tag </div> (it's the one before { /* Stats Cards */ } usually, or just before the stats block).
        # OR
        # 2. Look for the comment {/* Stats Cards */} and replace everything until the next major div starter or specific marker.
        
        if "{/* Stats Cards */}" in content:
            # OK, we have a marker. Let's try to find the end of this block.
            # The structure usually ends before <div className="bg-[#CCF6FF] pt-32 pb-12">
            
            start_marker = "{/* Stats Cards */}"
            end_marker = '<div className="bg-[#CCF6FF] pt-32 pb-12">'
            
            start_idx = content.find(start_marker)
            end_idx = content.find(end_marker)
            
            if start_idx != -1 and end_idx != -1:
                new_content = content[:start_idx] + "{/* Stats Cards */}" + stats_block + "\n\n" + content[end_idx:]
                
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filename}")
            else:
                print(f"Skipped {filename} (Markers not found correctly)")
        else:
             print(f"Skipped {filename} (Stats Cards comment not found)")

