import urllib.request
import zipfile
import os

print('Downloading JDK...')
urllib.request.urlretrieve('https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.10%2B7/OpenJDK17U-jdk_x64_windows_hotspot_17.0.10_7.zip', 'jdk.zip')
print('Extracting...')
with zipfile.ZipFile('jdk.zip', 'r') as zip_ref:
    zip_ref.extractall('jdk')
print('Done.')
