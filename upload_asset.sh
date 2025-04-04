#!/bin/bash

# Script to upload assets to ICP canister
# Usage: ./upload_asset.sh <file_path> <asset_path> <content_type> <identity>
# Example: ./upload_asset.sh ./assets/index.html /index.html text/html mainnet-deploy

if [ "$#" -lt 3 ]; then
    echo "Usage: $0 <file_path> <asset_path> <content_type> [<identity>]"
    echo "Example: $0 ./assets/index.html /index.html text/html mainnet-deploy"
    exit 1
fi

FILE_PATH=$1
ASSET_PATH=$2
CONTENT_TYPE=$3
IDENTITY=${4:-mainnet-deploy}  # Default to mainnet-deploy if not specified
CANISTER_ID="c2pix-yaaaa-aaaah-ardha-cai"

# Check if file exists
if [ ! -f "$FILE_PATH" ]; then
    echo "Error: File $FILE_PATH not found!"
    exit 1
fi

# Read file content
CONTENT=$(cat "$FILE_PATH")

# Escape double quotes in content
ESCAPED_CONTENT=$(echo "$CONTENT" | sed 's/"/\\"/g')

# Execute the dfx command
echo "Uploading $FILE_PATH to $ASSET_PATH with content type $CONTENT_TYPE..."
dfx --identity "$IDENTITY" canister --network ic call "$CANISTER_ID" store "(record {
  key=\"$ASSET_PATH\"; 
  content_type=\"$CONTENT_TYPE\"; 
  content_encoding=\"identity\"; 
  content=blob \"$ESCAPED_CONTENT\";
})"

# Check if upload was successful
if [ $? -eq 0 ]; then
    echo "Successfully uploaded $FILE_PATH to $ASSET_PATH"
else
    echo "Failed to upload $FILE_PATH"
    exit 1
fi

# List assets to verify upload
echo "Listing assets in canister..."
dfx --identity "$IDENTITY" canister --network ic call "$CANISTER_ID" list '(record {})'

echo "Done!" 