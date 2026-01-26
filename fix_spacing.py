
import os
import re

courses_dir = r"c:\Users\kiran\OneDrive\Desktop\algo\Algonex_Website\Algonex_Website\algonex-frontend\src\components\ExploreCourses"

# Updated logic: To fix the overlap, we need to ensure the container below the stats cards has enough top padding or margin.
# The current stats cards are absolute positioned at `top-[65vh]`.
# The content container below starts with `<div className="bg-[#CCF6FF] pt-32 pb-12">`.
# `pt-32` (8rem = 128px) might not be enough if `60vh` (hero) + half of stats card height overlaps.
# Let's increase the top padding of the content section to push the content down. 
# `pt-48` (12rem = 192px) or even `pt-56` is safer.

# Regex to find the content div start
# Look for <div className="bg-[#CCF6FF] pt-32 pb-12"> or similar
div_regex = re.compile(r'<div className="bg-\[#CCF6FF\] pt-\d+ pb-12">')

for filename in os.listdir(courses_dir):
    if filename.endswith(".jsx"):
        filepath = os.path.join(courses_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if the file matches our target structure
        match = div_regex.search(content)
        if match:
            # Replace pt-32 (or whatever number) with pt-48 to give more breathing room
            new_div_tag = '<div className="bg-[#CCF6FF] pt-48 pb-12">'
            new_content = content.replace(match.group(0), new_div_tag)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Fixed spacing in {filename}")
        else:
             print(f"Skipped {filename} (Content div not found)")
