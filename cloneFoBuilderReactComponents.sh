#!/bin/bash

# Prompt the user to enter the component name
read -p "Enter the component name you want to pull: " COMPONENT_NAME

# Define the URL of the repository
REPO_URL="https://gitlab.dengun.org/fobuilder/packages/reactcomponents/reactcomponents.git"

# Define the specific component directory within the repository
COMPONENT_DIR="$COMPONENT_NAME"

# Define the destination directory in your project
DEST_DIR="./src/app/components/$COMPONENT_NAME"

# Create a temporary directory for cloning the repository
TEMP_DIR=$(mktemp -d)

# Clone the repository to the temporary directory
git clone $REPO_URL $TEMP_DIR

# Check if the component directory exists in the repository
if [ ! -d "$TEMP_DIR/$COMPONENT_DIR" ]; then
  echo "Component $COMPONENT_NAME does not exist in the repository."
  rm -rf $TEMP_DIR
  exit 1
fi

# Copy the specific component directory to your project's destination directory
mkdir -p $DEST_DIR
cp -r $TEMP_DIR/$COMPONENT_DIR/* $DEST_DIR

# Remove the temporary directory
rm -rf $TEMP_DIR

echo "Component $COMPONENT_NAME has been copied to $DEST_DIR"