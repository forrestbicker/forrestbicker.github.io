import os
import re

# open every html file in the blog directory and clean the html
clear_pattern = r'fr-view">(.+)`&lt;clear&gt;`'
img_pattern = r'<p><span style="font-size: 0.875rem;">`&lt;(.+?)&gt;`</span></p>'
for file in os.listdir('./blog'):
    filepath, contents = './blog/' + file, ''
    with open(filepath, 'r', encoding='utf-8') as f:
        contents = f.read()
        new_contents = re.sub(clear_pattern, r'fr-view">', contents)
        new_contents = re.sub(img_pattern, r'<\g<1>>', new_contents)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_contents)
        
# winning-the-citadel-data-open-championship.html -> Winning-The-Citadel-Data-Open (and change the file name)
# Forrest-Bicker.html -> ''
# /blog.html -> '' except for in .htaccess
# blog/blog.html file to blog/index.html
# resources.html -> resources
# Thanks to my teammates Milo Knell, Eric Zhang, Sahil Rane, and Alan Wu, along with our friend and mentor Tiger Che. Shout out to Laurie Luo, Larry Wang, and Luke Wang.