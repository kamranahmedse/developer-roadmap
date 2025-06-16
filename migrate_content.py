#!/usr/bin/env python3

import json
import os
import sys

def migrate_content():
    """
    Migrate content from content folder to content-migrated folder using mapping file
    """
    
    # Read mapping file
    mapping_file = 'migration-mapping.json'
    content_dir = 'content'
    migrated_dir = 'content-migrated'
    
    try:
        with open(mapping_file, 'r') as f:
            mapping = json.load(f)
    except FileNotFoundError:
        print(f"Error: {mapping_file} not found")
        return False
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON in {mapping_file}")
        return False
    
    migrated_count = 0
    skipped_count = 0
    error_count = 0
    
    print(f"Starting migration of {len(mapping)} files...")
    
    for source_path, target_id in mapping.items():
        # Determine source file path
        if ':' in source_path:
            # Nested path like "clean-code-principles:be-consistent"
            parts = source_path.split(':')
            source_file = os.path.join(content_dir, *parts[:-1], f"{parts[-1]}.md")
        else:
            # Top level path like "clean-code-principles"
            source_file = os.path.join(content_dir, source_path, 'index.md')
        
        # Determine target file path
        target_filename = f"{source_path.split(':')[-1]}@{target_id}.md"
        target_file = os.path.join(migrated_dir, target_filename)
        
        # Check if target file is empty (needs migration)
        if os.path.exists(target_file) and os.path.getsize(target_file) > 0:
            print(f"⏭️  Skipped: {target_filename} (already migrated)")
            skipped_count += 1
            continue
        
        # Check if source file exists
        if not os.path.exists(source_file):
            print(f"❌ Error: Source file not found: {source_file}")
            error_count += 1
            continue
        
        try:
            # Read source content
            with open(source_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if not content.strip():
                print(f"⚠️  Warning: Source file is empty: {source_file}")
                continue
            
            # Write to target file
            with open(target_file, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f"✅ Migrated: {source_path} -> {target_filename}")
            migrated_count += 1
            
        except Exception as e:
            print(f"❌ Error migrating {source_path}: {str(e)}")
            error_count += 1
    
    print(f"\n📊 Migration Summary:")
    print(f"   ✅ Migrated: {migrated_count}")
    print(f"   ⏭️  Skipped: {skipped_count}")
    print(f"   ❌ Errors: {error_count}")
    print(f"   📁 Total: {len(mapping)}")
    
    return error_count == 0

if __name__ == "__main__":
    success = migrate_content()
    sys.exit(0 if success else 1) 