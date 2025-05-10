#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Conventional commit types and their changelog sections
const COMMIT_TYPES = {
  feat: 'Added',
  fix: 'Fixed',
  docs: 'Documentation',
  style: 'Changed',
  refactor: 'Changed',
  perf: 'Changed',
  test: 'Changed',
  chore: 'Changed',
  revert: 'Removed',
  ci: 'Changed',
  build: 'Changed',
};

// Keywords for fallback categorization
const KEYWORDS = {
  Add: ['add', 'new', 'create', 'implement', 'introduce', 'support'],
  Fix: ['fix', 'bug', 'issue', 'error', 'resolve', 'correct', 'patch'],
  Change: ['update', 'change', 'modify', 'improve', 'enhance', 'refactor', 'optimize'],
  Remove: ['remove', 'delete', 'drop', 'deprecate'],
  Documentation: ['doc', 'readme', 'comment', 'documentation'],
};

function getLatestVersion() {
  try {
    const changelog = fs.readFileSync('CHANGELOG.md', 'utf8');
    const versionMatch = changelog.match(/## \[(\d+\.\d+\.\d+)\]/);
    const version = versionMatch ? versionMatch[1] : '0.1.0';
    console.log('Current version from changelog:', version);
    return version;
  } catch {
    console.log('No changelog found or error reading it, using default version 0.1.0');
    return '0.1.0';
  }
}

function hasVersionTag(version) {
  try {
    // List all tags and check if our version exists
    const tags = execSync('git tag', { encoding: 'utf8' }).split('\n');
    const hasTag = tags.includes(`v${version}`);
    console.log(`Version tag v${version} exists:`, hasTag);
    return hasTag;
  } catch {
    console.log('Error checking git tags, assuming no tags exist');
    return false;
  }
}

function getCommitsSinceLastVersion(version) {
  try {
    // First, let's check what commits we have
    console.log('Checking all commits in repository...');
    const allCommits = execSync(
      'git log --oneline',
      { encoding: 'utf8' }
    );
    console.log('All commits:', allCommits);

    if (hasVersionTag(version)) {
      // Get commits since the version tag
      console.log(`Getting commits since v${version}...`);
      try {
        const commits = execSync(
          `git log v${version}..HEAD --pretty=format:"%ad|%s|%b" --date=short`,
          { encoding: 'utf8' }
        );
        const commitList = commits.split('\n').filter(Boolean);
        
        if (commitList.length === 0) {
          console.log('No commits found since tag, getting all commits instead');
          const allCommits = execSync(
            'git log --pretty=format:"%ad|%s|%b" --date=short',
            { encoding: 'utf8' }
          );
          const allCommitList = allCommits.split('\n').filter(Boolean);
          console.log(`Found ${allCommitList.length} total commits`);
          return allCommitList;
        }
        
        console.log(`Found ${commitList.length} commits since v${version}`);
        return commitList;
      } catch {
        console.log('Error getting commits since tag, falling back to all commits');
        const commits = execSync(
          'git log --pretty=format:"%ad|%s|%b" --date=short',
          { encoding: 'utf8' }
        );
        const commitList = commits.split('\n').filter(Boolean);
        console.log(`Found ${commitList.length} total commits`);
        return commitList;
      }
    } else {
      // If no version tag exists, get all commits
      console.log('Getting all commits in repository...');
      const commits = execSync(
        'git log --pretty=format:"%ad|%s|%b" --date=short',
        { encoding: 'utf8' }
      );
      const commitList = commits.split('\n').filter(Boolean);
      console.log(`Found ${commitList.length} total commits`);
      return commitList;
    }
  } catch (error) {
    console.error('Error getting commits:', error);
    return [];
  }
}

function categorizeByKeywords(message) {
  const lowerMessage = message.toLowerCase();
  
  for (const [category, keywords] of Object.entries(KEYWORDS)) {
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      return category;
    }
  }
  
  return 'Change'; // Default category
}

function parseCommitMessage(commit) {
  const [date, message, body] = commit.split('|');
  
  // Try conventional commit format first
  const typeMatch = message.match(/^(\w+)(?:\(([\w-]+)\))?:\s*(.+)/);
  
  if (typeMatch) {
    const [, type, scope, description] = typeMatch;
    return {
      date,
      type,
      scope,
      description,
      body: body || '',
    };
  }
  
  // Fallback: categorize by keywords
  const category = categorizeByKeywords(message);
  return {
    date,
    type: category.toLowerCase(),
    scope: null,
    description: message,
    body: body || '',
  };
}

function categorizeCommits(commits) {
  const categories = {};
  
  commits.forEach(commit => {
    const parsed = parseCommitMessage(commit);
    if (!parsed) return;

    const category = COMMIT_TYPES[parsed.type] || categorizeByKeywords(parsed.description);
    if (!categories[category]) {
      categories[category] = [];
    }

    const entry = parsed.scope 
      ? `- **${parsed.scope}**: ${parsed.description} (${parsed.date})`
      : `- ${parsed.description} (${parsed.date})`;
    
    categories[category].push(entry);
  });

  return categories;
}

function generateChangelogEntry(version, categories) {
  const date = new Date().toISOString().split('T')[0];
  let entry = `\n## Version ${version}\n\n`;
  entry += `Date: ${date}\n\n`;

  Object.entries(categories).forEach(([category, items]) => {
    if (items.length > 0) {
      entry += `### ${category}\n\n`;
      items.forEach(item => {
        entry += `${item}\n`;
      });
      entry += '\n';
    }
  });

  return entry;
}

function updateChangelog(newEntry) {
  const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');
  const changelog = fs.readFileSync(changelogPath, 'utf8');
  
  // Insert new entry after the header
  const headerEnd = changelog.indexOf('## [');
  const newChangelog = 
    changelog.slice(0, headerEnd) + 
    newEntry + 
    changelog.slice(headerEnd);
  
  fs.writeFileSync(changelogPath, newChangelog);
}

function main() {
  console.log('Starting changelog generation...');
  
  const currentVersion = getLatestVersion();
  const commits = getCommitsSinceLastVersion(currentVersion);
  
  if (commits.length === 0) {
    console.log('No commits found in the repository');
    return;
  }

  console.log(`Processing ${commits.length} commits...`);
  const categories = categorizeCommits(commits);
  console.log('Categories found:', Object.keys(categories));
  
  const newEntry = generateChangelogEntry(currentVersion, categories);
  updateChangelog(newEntry);
  
  console.log('Changelog updated successfully!');
}

main(); 