#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get the current version from package.json
function getCurrentVersion() {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  return packageJson.version;
}

// Parse version into parts
function parseVersion(version) {
  const [major, minor, patch] = version.split('.').map(Number);
  return { major, minor, patch };
}

// Format version parts back to string
function formatVersion(parts) {
  return `${parts.major}.${parts.minor}.${parts.patch}`;
}

// Get commits since last tag
function getCommitsSinceLastTag() {
  try {
    const commits = execSync('git log --pretty=format:"%s" $(git describe --tags --abbrev=0 2>/dev/null || git rev-list --max-parents=0 HEAD)..HEAD', { encoding: 'utf8' });
    return commits.split('\n').filter(Boolean);
  } catch {
    return [];
  }
}

// Determine version bump type based on commits
function determineBumpType(commits) {
  let hasBreaking = false;
  let hasFeature = false;
  let hasFix = false;

  commits.forEach(commit => {
    if (commit.includes('BREAKING CHANGE:') || commit.includes('!:')) {
      hasBreaking = true;
    } else if (commit.startsWith('feat:')) {
      hasFeature = true;
    } else if (commit.startsWith('fix:')) {
      hasFix = true;
    }
  });

  if (hasBreaking) return 'major';
  if (hasFeature) return 'minor';
  if (hasFix) return 'patch';
  return null;
}

// Bump version
function bumpVersion(version, type) {
  const parts = parseVersion(version);
  
  switch (type) {
    case 'major':
      parts.major++;
      parts.minor = 0;
      parts.patch = 0;
      break;
    case 'minor':
      parts.minor++;
      parts.patch = 0;
      break;
    case 'patch':
      parts.patch++;
      break;
    default:
      return version;
  }

  return formatVersion(parts);
}

// Update package.json
function updatePackageJson(newVersion) {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  packageJson.version = newVersion;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
}

function main() {
  const currentVersion = getCurrentVersion();
  console.log('Current version:', currentVersion);

  const commits = getCommitsSinceLastTag();
  console.log('Commits since last tag:', commits.length);

  const bumpType = determineBumpType(commits);
  if (!bumpType) {
    console.log('No version bump needed');
    return;
  }

  console.log('Bump type:', bumpType);
  const newVersion = bumpVersion(currentVersion, bumpType);
  console.log('New version:', newVersion);

  updatePackageJson(newVersion);
  console.log('Updated package.json with new version');
}

main(); 