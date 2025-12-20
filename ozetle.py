import os

# Hangi dosya uzantılarını alalım?
EXTENSIONS = {'.vue', '.ts', '.js', '.json', '.css', '.scss'}

# Hangi klasörleri GÖRMEZDEN gelelim? (Burası çok önemli, node_modules şişirmesin)
IGNORE_DIRS = {'node_modules', '.git', 'dist', '.vscode', '.idea'}

# Hangi dosyaları GÖRMEZDEN gelelim?
IGNORE_FILES = {'package-lock.json', 'yarn.lock'}

def merge_files(output_file='tum_proje_kodu.txt'):
    with open(output_file, 'w', encoding='utf-8') as outfile:
        # Bulunduğumuz dizinden başlayarak tüm dosyaları gez
        for root, dirs, files in os.walk("."):
            # Görmezden gelinecek klasörleri listeden çıkar
            dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
            
            for file in files:
                if file in IGNORE_FILES:
                    continue
                    
                # Dosya uzantısını kontrol et
                ext = os.path.splitext(file)[1]
                if ext in EXTENSIONS:
                    file_path = os.path.join(root, file)
                    
                    try:
                        # Dosya içeriğini oku
                        with open(file_path, 'r', encoding='utf-8') as infile:
                            content = infile.read()
                            
                            # Dosyanın nerede başladığını belirten bir başlık at
                            outfile.write(f"\n{'='*50}\n")
                            outfile.write(f"DOSYA YOLU: {file_path}\n")
                            outfile.write(f"{'='*50}\n\n")
                            
                            # İçeriği yaz
                            outfile.write(content)
                            outfile.write("\n")
                            print(f"Eklendi: {file_path}")
                            
                    except Exception as e:
                        print(f"Hata oluştu ({file_path}): {e}")

if __name__ == "__main__":
    print("Dosyalar birleştiriliyor...")
    merge_files()
    print("\nBitti! 'tum_proje_kodu.txt' dosyası oluşturuldu.")