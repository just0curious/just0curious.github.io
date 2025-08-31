#!/usr/bin/env python3
import os
import sqlite3

def reset_database():
    db_files = ['people_api.db', 'me_api.db']
    for db_file in db_files:
        if os.path.exists(db_file):
            try:
                os.remove(db_file)
                print(f"✅ Removed old database: {db_file}")
            except Exception as e:
                print(f"❌ Failed to remove {db_file}: {e}")
    
    if os.path.exists('database'):
        try:
            import shutil
            shutil.rmtree('database')
            print("✅ Removed old database directory")
        except Exception as e:
            print(f"❌ Failed to remove database directory: {e}")
    
    print("\n🎯 Database reset completed!")
    print("📝 Now you can run 'python main.py' to start with a fresh database")

if __name__ == "__main__":
    reset_database()
