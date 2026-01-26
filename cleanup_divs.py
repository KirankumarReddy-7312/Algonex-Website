import os

directory = r'c:\Users\kiran\OneDrive\Desktop\algo\Algonex_Website\Algonex_Website\algonex-frontend\src\components\ExploreCourses'

# The goal is to ensure exactly 3 closing </div> tags after the stats section content.
# Our block has 3. Let's see if we can find </div> </div> </div> and any adjacent ones.

for filename in os.listdir(directory):
    if filename.endswith('.jsx'):
        path = os.path.join(directory, filename)
        with open(path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        new_lines = []
        i = 0
        while i < len(lines):
            line = lines[i]
            # Detect where our block ends
            if 'Resume & Interview ready' in line:
                # Add the closing tags we want
                new_lines.append(line)
                new_lines.append('              </span>\n')
                new_lines.append('            </div>\n')
                new_lines.append('          </div>\n')
                new_lines.append('        </div>\n')
                new_lines.append('      </div>\n')
                
                # Now skip all subsequent </div> until we hit something else
                i += 1
                while i < len(lines):
                    # Seek past original closing tags
                    if '</div>' in lines[i] or lines[i].strip() == '':
                        i += 1
                    else:
                        break
                continue
            else:
                new_lines.append(line)
            i += 1
            
        final_content = "".join(new_lines)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(final_content)
        print(f"Cleaned {filename}")
